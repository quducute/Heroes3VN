import { describe, expect, test } from "vitest";
import { CHEATS } from "./cheats.js";
import { KEYBINDS_BASE, KEYBINDS_HD } from "./keybinds.js";
import { PAGES } from "./pages.jsx";
import { versions } from "./versions.js";

const PAGE_ID_RE = /^[a-z]+$/;

const cheatCode = (v) => (typeof v === "string" ? v : v?.code);

describe("CHEATS", () => {
  test("mỗi dòng có tác dụng và ít nhất một mã", () => {
    for (const row of CHEATS) {
      expect(row.effect?.trim(), JSON.stringify(row)).toBeTruthy();
      const codes = [row.complete, row.wog, row.vcmi].map(cheatCode);
      expect(codes.some(Boolean), row.effect).toBe(true);
    }
  });

  test("mã cheat viết thường, không có khoảng trắng", () => {
    for (const row of CHEATS) {
      for (const code of [row.complete, row.wog, row.vcmi].map(cheatCode)) {
        if (code) expect(code, row.effect).toMatch(/^[a-z0-9]+$/);
      }
    }
  });

  test("không trùng mã trong cùng một cột", () => {
    for (const col of ["complete", "wog", "vcmi"]) {
      const codes = CHEATS.map((r) => cheatCode(r[col])).filter(Boolean);
      expect(codes.length, col).toBe(new Set(codes).size);
    }
  });
});

describe.each([
  ["KEYBINDS_BASE", KEYBINDS_BASE],
  ["KEYBINDS_HD", KEYBINDS_HD],
])("%s", (_, groups) => {
  test("section có tên và có ít nhất một dòng", () => {
    for (const g of groups) {
      expect(g.section?.trim()).toBeTruthy();
      expect(g.rows.length, g.section).toBeGreaterThan(0);
    }
  });

  test("mỗi dòng gồm đúng [phím, chức năng] không rỗng", () => {
    for (const g of groups) {
      for (const row of g.rows) {
        expect(row, g.section).toHaveLength(2);
        expect(row[0].trim(), g.section).toBeTruthy();
        expect(row[1].trim(), row[0]).toBeTruthy();
      }
    }
  });

  test("không trùng phím trong cùng một section", () => {
    for (const g of groups) {
      const keys = g.rows.map(([k]) => k);
      expect(keys.length, g.section).toBe(new Set(keys).size);
    }
  });
});

describe("page id", () => {
  const ids = [
    "home",
    ...versions.map((v) => v.id),
    ...Object.values(PAGES).map((p) => p.id),
  ];

  test("không trùng", () => {
    expect(ids).toHaveLength(new Set(ids).size);
  });

  test("chỉ gồm chữ thường a-z để khớp kiểm tra của Electron và Rust", () => {
    for (const id of ids) expect(id).toMatch(PAGE_ID_RE);
  });
});
