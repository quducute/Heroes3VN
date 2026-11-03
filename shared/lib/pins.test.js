import { describe, expect, test } from "vitest";
import {
  CHEAT_PIN,
  KEY_PIN,
  MAX_PINS,
  PINNED_SECTION,
  cheatPin,
  cleanPins,
  countPinned,
  keybindPin,
  pinFirst,
  pinKeybinds,
  togglePin,
  unpinAll,
} from "./pins.js";

const ROWS = [{ effect: "A" }, { effect: "B" }, { effect: "C" }];

const GROUPS = [
  {
    section: "Một",
    rows: [
      ["A", "Mở A"],
      ["B", "Mở B"],
    ],
  },
  { section: "Hai", rows: [["C", "Mở C"]] },
];

describe("togglePin", () => {
  test("thêm rồi bỏ ghim", () => {
    const once = togglePin([], "x");
    expect(once).toEqual(["x"]);
    expect(togglePin(once, "x")).toEqual([]);
  });

  test("giới hạn số mục ghim, bỏ mục cũ nhất", () => {
    const full = Array.from({ length: MAX_PINS }, (_, i) => `p${i}`);
    const next = togglePin(full, "new");
    expect(next).toHaveLength(MAX_PINS);
    expect(next.at(-1)).toBe("new");
    expect(next).not.toContain("p0");
  });
});

describe("cleanPins", () => {
  test("bỏ giá trị sai và trùng", () => {
    expect(cleanPins(["a", "a", 1, "", null, "x".repeat(301), "b"])).toEqual([
      "a",
      "b",
    ]);
    for (const bad of [null, "a", 5, { a: 1 }])
      expect(cleanPins(bad)).toEqual([]);
  });
});

describe("pinFirst", () => {
  test("đưa mục ghim lên đầu, giữ thứ tự gốc", () => {
    const pins = [cheatPin(ROWS[2]), cheatPin(ROWS[1])];
    expect(pinFirst(ROWS, cheatPin, pins).map((r) => r.effect)).toEqual([
      "B",
      "C",
      "A",
    ]);
  });

  test("không ghim gì thì giữ nguyên mảng", () => {
    expect(pinFirst(ROWS, cheatPin, [])).toBe(ROWS);
  });
});

describe("pinKeybinds", () => {
  test("gom phím đã ghim vào nhóm đầu, bỏ nhóm rỗng", () => {
    const pins = [keybindPin(["C", "Mở C"]), keybindPin(["A", "Mở A"])];
    expect(pinKeybinds(GROUPS, pins)).toEqual([
      {
        section: PINNED_SECTION,
        rows: [
          ["A", "Mở A"],
          ["C", "Mở C"],
        ],
      },
      { section: "Một", rows: [["B", "Mở B"]] },
    ]);
  });

  test("ghim không khớp thì giữ nguyên", () => {
    expect(pinKeybinds(GROUPS, ["key:Z|Không có"])).toBe(GROUPS);
    expect(pinKeybinds(GROUPS, [])).toBe(GROUPS);
  });
});

describe("unpinAll / countPinned", () => {
  const pins = [
    cheatPin(ROWS[0]),
    keybindPin(["A", "Mở A"]),
    cheatPin(ROWS[2]),
  ];

  test("chỉ bỏ ghim của đúng loại", () => {
    expect(unpinAll(pins, CHEAT_PIN)).toEqual([keybindPin(["A", "Mở A"])]);
    expect(unpinAll(pins, KEY_PIN)).toEqual([
      cheatPin(ROWS[0]),
      cheatPin(ROWS[2]),
    ]);
  });

  test("chỉ đếm mục còn tồn tại trên trang", () => {
    expect(countPinned(pins, ROWS.map(cheatPin))).toBe(2);
    expect(countPinned([...pins, "cheat:Đã bị xoá"], ROWS.map(cheatPin))).toBe(
      2,
    );
    expect(countPinned([], ROWS.map(cheatPin))).toBe(0);
  });
});
