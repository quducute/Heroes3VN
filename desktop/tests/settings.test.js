import { createRequire } from "node:module";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, test } from "vitest";

const require = createRequire(import.meta.url);
const {
  DEFAULT_SETTINGS,
  WINDOW_SIZES,
  isPageId,
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
      ).toEqual({ windowSize, defaultPage: "faq" });
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
    const settings = { windowSize: "maximized", defaultPage: "cheat" };
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
    expect(DEFAULT_SETTINGS.defaultPage).toBe("home");
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
