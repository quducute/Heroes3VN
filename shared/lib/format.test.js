import { describe, expect, test } from "vitest";
import { formatBytes } from "./format.js";

describe("formatBytes", () => {
  test("0 và giá trị rỗng", () => {
    expect(formatBytes(0)).toBe("0 KB");
    expect(formatBytes(undefined)).toBe("0 KB");
    expect(formatBytes(null)).toBe("0 KB");
  });

  test("dưới 1 MB hiển thị KB làm tròn", () => {
    expect(formatBytes(1024)).toBe("1 KB");
    expect(formatBytes(1536)).toBe("2 KB");
    expect(formatBytes(1024 * 1024 - 1)).toBe("1024 KB");
  });

  test("từ 1 MB trở lên hiển thị MB một chữ số thập phân", () => {
    expect(formatBytes(1024 * 1024)).toBe("1.0 MB");
    expect(formatBytes(6.9 * 1024 * 1024)).toBe("6.9 MB");
    expect(formatBytes(1024 ** 3)).toBe("1024.0 MB");
  });
});
