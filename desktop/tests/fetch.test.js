import { EventEmitter } from "node:events";
import { createRequire } from "node:module";
import { describe, expect, test, vi } from "vitest";

const require = createRequire(import.meta.url);
const { isAllowedUrl, fetchText } = require("../electron/fetch.cjs");

const HOTA = "https://download.h3hota.com/upd/changelogs/eng.txt";
const DRIVE = "https://drive.google.com/uc?export=download&id=x";
const DRIVE_CONTENT = "https://drive.usercontent.google.com/download?id=x";

function fakeNet(script) {
  const requests = [];
  const net = {
    request: vi.fn((opts) => {
      const req = new EventEmitter();
      req.opts = opts;
      req.abort = vi.fn();
      req.followRedirect = vi.fn(() => script.next(req));
      req.end = () => queueMicrotask(() => script.start(req));
      requests.push(req);
      return req;
    }),
  };
  return { net, requests };
}

function respond(req, statusCode, body = "") {
  const res = new EventEmitter();
  res.statusCode = statusCode;
  req.emit("response", res);
  queueMicrotask(() => {
    res.emit("data", Buffer.from(body));
    res.emit("end");
  });
}

describe("isAllowedUrl", () => {
  test.each([HOTA, DRIVE, DRIVE_CONTENT, "https://rss.moddb.com/x"])(
    "cho phép %s",
    (url) => expect(isAllowedUrl(url)).toBe(true),
  );

  test.each([
    "http://download.h3hota.com/upd/changelogs/eng.txt",
    "https://evil.com/",
    "https://download.h3hota.com.evil.com/",
    "file:///C:/Windows/win.ini",
    "không phải url",
    undefined,
  ])("chặn %s", (url) => expect(isAllowedUrl(url)).toBe(false));
});

describe("fetchText", () => {
  test("chặn host lạ mà không gửi request", async () => {
    const { net } = fakeNet({});
    await expect(fetchText(net, "https://evil.com/")).rejects.toThrow(
      "evil.com",
    );
    expect(net.request).not.toHaveBeenCalled();
  });

  test("trả về nội dung khi HTTP 200", async () => {
    const { net, requests } = fakeNet({
      start: (req) => respond(req, 200, "Version 1.8.1"),
    });
    await expect(fetchText(net, HOTA)).resolves.toBe("Version 1.8.1");
    expect(requests[0].opts).toEqual({ url: HOTA, redirect: "manual" });
  });

  test("báo lỗi khi HTTP không thành công", async () => {
    const { net } = fakeNet({ start: (req) => respond(req, 404) });
    await expect(fetchText(net, HOTA)).rejects.toThrow("HTTP 404");
  });

  test("theo chuyển hướng sang host được phép", async () => {
    const { net, requests } = fakeNet({
      start: (req) => req.emit("redirect", 303, "GET", DRIVE_CONTENT),
      next: (req) => respond(req, 200, "5.8 R26"),
    });
    await expect(fetchText(net, DRIVE)).resolves.toBe("5.8 R26");
    expect(requests[0].followRedirect).toHaveBeenCalledOnce();
  });

  test("chặn chuyển hướng sang host lạ", async () => {
    const { net, requests } = fakeNet({
      start: (req) => req.emit("redirect", 302, "GET", "https://evil.com/x"),
    });
    await expect(fetchText(net, DRIVE)).rejects.toThrow("evil.com");
    expect(requests[0].followRedirect).not.toHaveBeenCalled();
    expect(requests[0].abort).toHaveBeenCalled();
  });

  test("dừng khi chuyển hướng quá nhiều lần", async () => {
    const loop = (req) => req.emit("redirect", 302, "GET", DRIVE);
    const { net } = fakeNet({ start: loop, next: loop });
    await expect(fetchText(net, DRIVE)).rejects.toThrow("quá nhiều");
  });

  test("hết thời gian chờ thì huỷ request", async () => {
    const { net, requests } = fakeNet({ start: () => {} });
    await expect(fetchText(net, HOTA, { timeout: 10 })).rejects.toThrow(
      "Hết thời gian chờ",
    );
    expect(requests[0].abort).toHaveBeenCalled();
  });

  test("báo lỗi mạng", async () => {
    const { net } = fakeNet({
      start: (req) => req.emit("error", new Error("net::ERR_INTERNET")),
    });
    await expect(fetchText(net, HOTA)).rejects.toThrow("ERR_INTERNET");
  });
});
