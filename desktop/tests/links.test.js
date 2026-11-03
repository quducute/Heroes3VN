import { createRequire } from "node:module";
import { describe, expect, test, vi } from "vitest";

const require = createRequire(import.meta.url);
const {
  isExternalUrl,
  registerLinkHandlers,
} = require("../electron/links.cjs");

function setup() {
  const shell = { openExternal: vi.fn(() => Promise.resolve()) };
  const handlers = {};
  const webContents = {
    setWindowOpenHandler: (fn) => (handlers.open = fn),
    on: (name, fn) => (handlers[name] = fn),
  };
  registerLinkHandlers(webContents, shell);
  const navigate = (url) => {
    const event = { url, preventDefault: vi.fn() };
    handlers["will-navigate"](event);
    return event.preventDefault;
  };
  return { openExternal: shell.openExternal, open: handlers.open, navigate };
}

describe("isExternalUrl", () => {
  test.each([
    "https://github.com/quducute/Heroes3VN",
    "http://example.com",
    "HTTPS://EXAMPLE.COM",
  ])("chấp nhận %s", (url) => {
    expect(isExternalUrl(url)).toBe(true);
  });

  test.each([
    "file:///C:/Windows/System32/cmd.exe",
    "javascript:alert(1)",
    "mailto:a@b.c",
    "ms-settings:",
    "",
    "github.com",
  ])("từ chối %j", (url) => {
    expect(isExternalUrl(url)).toBe(false);
  });
});

describe("link mở tab mới (target=_blank, window.open)", () => {
  test("mở trình duyệt ngoài và chặn cửa sổ Electron", () => {
    const { openExternal, open } = setup();
    const url = "https://discord.gg/XM2EWmYF3u";
    expect(open({ url })).toEqual({ action: "deny" });
    expect(openExternal).toHaveBeenCalledExactlyOnceWith(url);
  });

  test("không mở scheme nguy hiểm nhưng vẫn chặn cửa sổ", () => {
    const { openExternal, open } = setup();
    expect(open({ url: "file:///C:/x.exe" })).toEqual({ action: "deny" });
    expect(openExternal).not.toHaveBeenCalled();
  });
});

describe("điều hướng trong cửa sổ (will-navigate)", () => {
  test("luôn chặn điều hướng và mở link http(s) ra ngoài", () => {
    const { openExternal, navigate } = setup();
    const url = "https://www.youtube.com/@Heroes3VN";
    expect(navigate(url)).toHaveBeenCalled();
    expect(openExternal).toHaveBeenCalledExactlyOnceWith(url);
  });

  test("chặn điều hướng sang file:// mà không mở gì", () => {
    const { openExternal, navigate } = setup();
    expect(navigate("file:///C:/Windows/notepad.exe")).toHaveBeenCalled();
    expect(openExternal).not.toHaveBeenCalled();
  });
});
