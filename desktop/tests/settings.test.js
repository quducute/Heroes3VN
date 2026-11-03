import { createRequire } from "node:module";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, test } from "vitest";

const require = createRequire(import.meta.url);
const {
  DEFAULT_SETTINGS,
  WINDOW_SIZES,
  FONT_SIZES,
  MAX_PINS,
  isPageId,
  isPinList,
  parseSettings,
  loadSettings,
  saveSettings,
  fitWindowSize,
} = require("../electron/settings.cjs");

const FULL_HD = { width: 1920, height: 1040 };
const dirs = [];
const tempFile = () => {
  const dir = mkdtempSync(join(tmpdir(), "h3vn-settings-"));
  dirs.push(dir);
  return join(dir, "sub", "settings.json");
};

afterEach(() => {
  for (const dir of dirs.splice(0))
    rmSync(dir, { recursive: true, force: true });
});

describe("isPageId", () => {
  test("chỉ nhận chữ thường a-z", () => {
    for (const id of ["home", "hota", "boardgame"])
      expect(isPageId(id)).toBe(true);
    for (const id of [
      "",
      "HotA",
      "hota1",
      "ho-ta",
      "../x",
      null,
      123,
      ["home"],
    ])
      expect(isPageId(id)).toBe(false);
  });
});

describe("parseSettings", () => {
  test("giữ giá trị hợp lệ", () => {
    for (const windowSize of WINDOW_SIZES)
      expect(
        parseSettings(JSON.stringify({ windowSize, defaultPage: "faq" })),
      ).toEqual({ ...DEFAULT_SETTINGS, windowSize, defaultPage: "faq" });
    for (const fontSize of FONT_SIZES)
      expect(parseSettings(JSON.stringify({ fontSize })).fontSize).toBe(
        fontSize,
      );
  });

  test("lọc danh sách ghim: bỏ giá trị sai, trùng và giới hạn số lượng", () => {
    const pins = ["cheat:A", "cheat:A", 1, "", null, "key:B|C"];
    expect(parseSettings(JSON.stringify({ pins })).pins).toEqual([
      "cheat:A",
      "key:B|C",
    ]);
    const many = Array.from({ length: MAX_PINS + 5 }, (_, i) => `p${i}`);
    const kept = parseSettings(JSON.stringify({ pins: many })).pins;
    expect(kept).toHaveLength(MAX_PINS);
    expect(kept.at(-1)).toBe(`p${MAX_PINS + 4}`);
    for (const bad of ["cheat:A", 5, { a: 1 }])
      expect(parseSettings(JSON.stringify({ pins: bad })).pins).toEqual([]);
  });

  test("cỡ chữ sai thì về mặc định", () => {
    for (const fontSize of ["huge", "", 1, null])
      expect(parseSettings(JSON.stringify({ fontSize })).fontSize).toBe(
        "medium",
      );
  });

  test("thay giá trị sai bằng mặc định, giữ giá trị đúng còn lại", () => {
    expect(
      parseSettings(
        JSON.stringify({ windowSize: "800x600", defaultPage: "era" }),
      ),
    ).toEqual({ ...DEFAULT_SETTINGS, defaultPage: "era" });
    expect(
      parseSettings(JSON.stringify({ windowSize: "1600x900", defaultPage: 1 })),
    ).toEqual({ ...DEFAULT_SETTINGS, windowSize: "1600x900" });
  });

  test("file hỏng hoặc không phải object thì về mặc định", () => {
    for (const text of ["", "{", "null", "5", '"home"', "[1,2]", "{}"])
      expect(parseSettings(text)).toEqual(DEFAULT_SETTINGS);
  });

  test("bỏ các key lạ", () => {
    expect(
      parseSettings(JSON.stringify({ defaultPage: "vcmi", evil: true })),
    ).toEqual({ ...DEFAULT_SETTINGS, defaultPage: "vcmi" });
  });
});

describe("loadSettings / saveSettings", () => {
  test("chưa có file thì trả về mặc định", () => {
    expect(loadSettings(tempFile())).toEqual(DEFAULT_SETTINGS);
  });

  test("lưu rồi đọc lại ra đúng cài đặt, tự tạo thư mục", () => {
    const file = tempFile();
    const settings = {
      windowSize: "maximized",
      defaultPage: "cheat",
      fontSize: "large",
      pins: ["cheat:A", "key:B|C"],
    };
    saveSettings(file, settings);
    expect(JSON.parse(readFileSync(file, "utf8"))).toEqual(settings);
    expect(loadSettings(file)).toEqual(settings);
  });

  test("file bị sửa hỏng thì về mặc định", () => {
    const file = tempFile();
    saveSettings(file, DEFAULT_SETTINGS);
    writeFileSync(file, "{ windowSize: 1920x1080");
    expect(loadSettings(file)).toEqual(DEFAULT_SETTINGS);
  });

  test("trả về object mới, không dùng chung object mặc định", () => {
    const settings = loadSettings(tempFile());
    settings.defaultPage = "faq";
    settings.pins.push("cheat:A");
    expect(DEFAULT_SETTINGS.defaultPage).toBe("home");
    expect(DEFAULT_SETTINGS.pins).toEqual([]);
  });
});

describe("isPinList", () => {
  test("chỉ nhận mảng chuỗi không trùng, không quá giới hạn", () => {
    expect(isPinList([])).toBe(true);
    expect(isPinList(["cheat:A", "key:B|C"])).toBe(true);
    for (const bad of [
      null,
      "cheat:A",
      ["a", "a"],
      ["a", 1],
      [""],
      ["x".repeat(301)],
      Array.from({ length: MAX_PINS + 1 }, (_, i) => `p${i}`),
    ])
      expect(isPinList(bad)).toBe(false);
  });
});

describe("fitWindowSize", () => {
  test("giữ kích thước khi vừa màn hình", () => {
    expect(fitWindowSize("1600x900", FULL_HD)).toEqual({
      width: 1600,
      height: 900,
    });
  });

  test("không vượt quá vùng làm việc của màn hình", () => {
    expect(fitWindowSize("1920x1080", FULL_HD)).toEqual({
      width: 1920,
      height: 1040,
    });
  });

  test("không nhỏ hơn 1280x720 kể cả màn hình nhỏ", () => {
    expect(fitWindowSize("1366x768", { width: 1024, height: 600 })).toEqual({
      width: 1280,
      height: 720,
    });
  });

  test("giá trị lạ hoặc maximized thì dùng 1280x720", () => {
    for (const size of ["maximized", "abc", "", "1600x", undefined])
      expect(fitWindowSize(size, FULL_HD)).toEqual({
        width: 1280,
        height: 720,
      });
  });
});
