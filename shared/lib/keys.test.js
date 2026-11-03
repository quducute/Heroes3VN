import { describe, expect, test } from "vitest";
import { keyParts } from "./keys.js";

describe("keyParts", () => {
  test("tách phím và dấu nối", () => {
    expect(keyParts("Ctrl + Click / F10").map((p) => [p.text, p.sep])).toEqual([
      ["Ctrl", false],
      ["+", true],
      ["Click", false],
      ["/", true],
      ["F10", false],
    ]);
  });

  test("giữ nguyên phím có dấu / không cách", () => {
    expect(keyParts("Mũi tên lên/xuống")).toEqual([
      { key: "0-Mũi tên lên/xuống", text: "Mũi tên lên/xuống", sep: false },
    ]);
  });

  test("key là duy nhất kể cả khi phím lặp lại", () => {
    const keys = keyParts("Shift + Shift").map((p) => p.key);
    expect(new Set(keys).size).toBe(keys.length);
  });
});
