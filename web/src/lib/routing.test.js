import { describe, expect, test, vi } from "vitest";
import { versions } from "@shared/data/versions.js";
import { EXTRA_PAGES } from "@shared/desktop/pages/index.js";
import { BASE_PATH, pageFromPath, pathOf } from "./routing.js";

const PAGES = [...versions, ...EXTRA_PAGES];

const visit = (pathname) => {
  vi.stubGlobal("location", { pathname });
  return pageFromPath();
};

describe("pathOf", () => {
  test("Trang chủ và trang lạ trỏ về đường dẫn gốc", () => {
    expect(BASE_PATH.endsWith("/")).toBe(true);
    expect(pathOf("home")).toBe(BASE_PATH);
    expect(pathOf("abc")).toBe(BASE_PATH);
  });

  test("mỗi trang có đường dẫn riêng, kết thúc bằng /", () => {
    const paths = PAGES.map((p) => pathOf(p.id));
    for (const [i, p] of PAGES.entries())
      expect(paths[i]).toBe(`${BASE_PATH}${p.path ?? p.id}/`);
    expect(new Set(paths.map((p) => p.toLowerCase())).size).toBe(PAGES.length);
  });
});

describe("pageFromPath", () => {
  test("đường dẫn của trang nào thì mở đúng trang đó", () => {
    for (const p of PAGES) expect(visit(pathOf(p.id))).toBe(p.id);
  });

  test("không phân biệt hoa thường và dấu / ở cuối", () => {
    for (const p of PAGES) {
      const path = p.path ?? p.id;
      expect(visit(BASE_PATH + path.toUpperCase())).toBe(p.id);
      expect(visit(`${BASE_PATH}${path.toLowerCase()}//`)).toBe(p.id);
      expect(visit(BASE_PATH + p.id)).toBe(p.id);
    }
  });

  test("đường dẫn gốc hoặc lạ thì về Trang chủ", () => {
    for (const path of ["", "abc/", "hota/abc/", "index.html"])
      expect(visit(BASE_PATH + path)).toBe("home");
  });
});
