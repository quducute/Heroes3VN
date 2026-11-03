import { describe, expect, test, vi } from "vitest";
import {
  cleanReleaseNotes,
  compareVersions,
  createModLatest,
  createModSources,
  formatDate,
  parseChronicles,
  parseEraCore,
  parseGog,
  parseHd,
  parseHota,
  parseTag,
  SOURCE_URLS,
} from "./sources.js";

describe("compareVersions", () => {
  test("so theo số, không theo chữ", () => {
    expect(compareVersions("2026.11.11", "2026.1.1")).toBe(1);
    expect(compareVersions("2026.1.1", "2026.11.11")).toBe(-1);
    expect(compareVersions("1.10.0", "1.9.9")).toBe(1);
  });

  test("bằng nhau", () => {
    expect(compareVersions("2026.11.11", "2026.11.11")).toBe(0);
    expect(compareVersions("1.2", "1.2.0")).toBe(0);
  });

  test("bỏ qua tiền tố v và khoảng trắng", () => {
    expect(compareVersions("v2026.11.11", "2026.11.11")).toBe(0);
    expect(compareVersions(" V1.2.3 ", "1.2.3")).toBe(0);
  });

  test("bỏ qua hậu tố -beta, +build", () => {
    expect(compareVersions("1.2.3-beta", "1.2.3")).toBe(0);
    expect(compareVersions("1.2.3+45", "1.2.4")).toBe(-1);
  });

  test("độ dài khác nhau", () => {
    expect(compareVersions("1.2.1", "1.2")).toBe(1);
    expect(compareVersions("1", "1.0.1")).toBe(-1);
  });
});

describe("parseTag", () => {
  test("bỏ tiền tố v và khoảng trắng", () => {
    expect(parseTag({ tag_name: " v2026.11.13 " })).toBe("2026.11.13");
  });

  test("báo lỗi khi thiếu tag", () => {
    expect(() => parseTag({})).toThrow();
    expect(() => parseTag(null)).toThrow();
  });
});

describe("formatDate", () => {
  test("định dạng dd.mm.yyyy", () => {
    expect(formatDate("2026-10-29")).toBe("29.10.2026");
  });

  test("ngày không hợp lệ trả về null", () => {
    expect(formatDate("abc")).toBeNull();
  });
});

describe("cleanReleaseNotes", () => {
  test("bỏ cú pháp markdown và HTML", () => {
    const md =
      "## Thay đổi\r\n\r\n\r\n\r\n> **Mới**: [link](https://x.y) `code` ~~cũ~~ _nghiêng_<br>";
    expect(cleanReleaseNotes(md)).toBe("Thay đổi\n\nMới: link code cũ nghiêng");
  });

  test("giữ nguyên dấu gạch dưới trong từ", () => {
    expect(cleanReleaseNotes("snake_case_name")).toBe("snake_case_name");
  });
});

describe("parseEraCore", () => {
  test("lấy version era.dll đầu tiên", () => {
    const md = [
      "# Changelog",
      "- fixed map",
      "- ## era.dll core updated to version 3.9.31:",
      "- era.dll 3.9.30",
    ].join("\n");
    expect(parseEraCore(md)).toBe("3.9.31");
  });

  test("không có version era.dll thì trả về null", () => {
    expect(parseEraCore("- era.dll được sửa\n- 1.2.3")).toBeNull();
  });
});

describe("parseHota", () => {
  test("lấy version và ngày mới nhất", () => {
    const text = [
      "﻿[!] — Important Information.",
      "[+] — Innovations.",
      "",
      "Version 1.8.1 (25.08.2026)",
      "Version 1.8.0 (01.07.2026)",
    ].join("\r\n");
    expect(parseHota(text)).toEqual({
      label: "HotA mới nhất",
      version: "1.8.1",
      date: "25.08.2026",
    });
  });

  test("báo lỗi khi đổi định dạng", () => {
    expect(() => parseHota("v1.8.1 - 25/08/2026")).toThrow();
  });
});

describe("parseGog", () => {
  test("lấy version bộ cài Windows", () => {
    const json = JSON.stringify({
      downloads: {
        installers: [
          { os: "mac", version: "1.0" },
          { os: "windows", version: "4.0 (gog-3)" },
        ],
      },
    });
    expect(parseGog(json)).toEqual({
      label: "Complete",
      version: "4.0 (gog-3)",
      date: null,
    });
  });

  test("báo lỗi khi không có bộ cài Windows", () => {
    expect(() => parseGog('{"downloads":{"installers":[]}}')).toThrow();
    expect(() => parseGog("<html>")).toThrow();
  });
});

describe("parseHd", () => {
  test("lấy dòng đầu tiên", () => {
    const text = [
      "5.8 R25 -> 5.8 R26 (2026-10-29)",
      "5.8 R24 -> 5.8 R25 (2026-10-28)",
    ].join("\n");
    expect(parseHd(text)).toEqual({
      label: "HoMM3 HD",
      version: "5.8 R26",
      date: "29.10.2026",
    });
  });

  test("báo lỗi khi Drive trả về trang HTML", () => {
    expect(() =>
      parseHd("<!DOCTYPE html><title>Google Drive</title>"),
    ).toThrow();
  });
});

const rssItem = (title, pubDate) =>
  [
    "\t<item>",
    `\t\t<title>${title}</title>`,
    `\t\t<pubDate>${pubDate}</pubDate>`,
    `\t\t<media:content><media:title type="plain">${title}</media:title></media:content>`,
    "\t</item>",
  ].join("\n");

describe("parseChronicles", () => {
  test("bỏ qua bản không phải ENG, lấy bản ENG mới nhất", () => {
    const items = [
      rssItem("ES RELEASE VERSION 2.6.4!", "Sat, 07 Nov 2026 16:47:12 +0000"),
      rssItem(
        "<![CDATA[ENG RELEASE VERSION 2.6.3!]]>",
        "Mon, 02 Nov 2026 10:00:00 +0000",
      ),
      rssItem("ENG RELEASE VERSION 2.6.2", "Sun, 01 Nov 2026 10:00:00 +0000"),
    ];
    const xml = `<rss><channel><title>ModDB</title>${items.join("\n")}</channel></rss>`;
    expect(parseChronicles(xml)).toEqual({
      label: "Chronicles HD mới nhất",
      version: "2.6.3",
      date: "02.11.2026",
    });
  });

  test("báo lỗi khi không có bản ENG", () => {
    expect(() =>
      parseChronicles(rssItem("PL RELEASE VERSION 2.6.4", "")),
    ).toThrow();
  });
});

describe("createModSources", () => {
  const fixtures = {
    [SOURCE_URLS.hota]: "Version 1.8.1 (25.08.2026)",
    [SOURCE_URLS.gog]:
      '{"downloads":{"installers":[{"os":"windows","version":"4.0"}]}}',
    [SOURCE_URLS.hd]: "5.8 R25 -> 5.8 R26 (2026-10-29)",
    [SOURCE_URLS.chronicles]: rssItem("ENG RELEASE VERSION 2.6.3", ""),
  };
  const fetchText = (url) =>
    url in fixtures
      ? Promise.resolve(fixtures[url])
      : Promise.reject(new Error(`HTTP 404 ${url}`));

  test("dùng hàm tải được truyền vào", async () => {
    const sources = createModSources(fetchText);
    expect((await sources.hota()).version).toBe("1.8.1");
    expect((await sources.chronicles()).version).toBe("2.6.3");
    expect((await sources.complete()).map((i) => i.version)).toEqual([
      "4.0",
      "5.8 R26",
    ]);
  });

  test("complete vẫn trả về khi một nguồn lỗi", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const sources = createModSources((url) =>
      url === SOURCE_URLS.hd
        ? Promise.reject(new Error("HTTP 500"))
        : fetchText(url),
    );
    expect(await sources.complete()).toEqual([
      { label: "Complete", version: "4.0", date: null },
    ]);
    expect(console.warn).toHaveBeenCalledOnce();
  });

  test("complete báo lỗi khi mọi nguồn đều lỗi", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const sources = createModSources(() =>
      Promise.reject(new Error("offline")),
    );
    await expect(sources.complete()).rejects.toThrow();
  });
});

describe("createModLatest", () => {
  test("cache kết quả và bỏ cache khi lỗi", async () => {
    const ok = vi.fn().mockResolvedValue({ version: "1" });
    const bad = vi
      .fn()
      .mockRejectedValueOnce(new Error("offline"))
      .mockResolvedValue({ version: "2" });
    const { fetchModLatest, clearModCache } = createModLatest({ ok, bad });

    expect(await fetchModLatest("none")).toBeNull();
    await fetchModLatest("ok");
    await fetchModLatest("ok");
    expect(ok).toHaveBeenCalledOnce();

    await expect(fetchModLatest("bad")).rejects.toThrow("offline");
    expect(await fetchModLatest("bad")).toEqual({ version: "2" });

    clearModCache();
    await fetchModLatest("ok");
    expect(ok).toHaveBeenCalledTimes(2);
  });
});
