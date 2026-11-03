import { describe, expect, test, vi } from "vitest";
import { versions } from "@shared/data/versions.js";
import { EXTRA_PAGES } from "@shared/desktop/pages/index.js";
import { PAGE_IDS, startupPage } from "./routing.js";

const openWith = (search) => {
  vi.stubGlobal("location", { search });
  return startupPage();
};

describe("startupPage", () => {
  test("PAGE_IDS gồm mọi trang phiên bản và trang phụ", () => {
    const ids = [...versions, ...EXTRA_PAGES].map((p) => p.id);
    expect([...PAGE_IDS].sort()).toEqual(ids.sort());
    expect(PAGE_IDS.has("home")).toBe(false);
  });

  test("mở đúng trang được truyền qua ?page=", () => {
    for (const id of PAGE_IDS) expect(openWith(`?page=${id}`)).toBe(id);
  });

  test("không có hoặc sai ?page= thì về Trang chủ", () => {
    for (const search of ["", "?page=", "?page=abc", "?page=HOTA", "?x=hota"])
      expect(openWith(search)).toBe("home");
  });
});
