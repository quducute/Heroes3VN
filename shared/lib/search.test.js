import { describe, expect, test } from "vitest";
import { createElement as h } from "react";
import { FAQ_ITEMS } from "../data/faq.jsx";
import {
  filterCheats,
  filterFaq,
  filterKeybinds,
  matches,
  normalize,
  textOf,
} from "./search.js";

describe("normalize", () => {
  test("bỏ dấu tiếng Việt và viết thường", () => {
    expect(normalize("Vàng")).toBe("vang");
    expect(normalize("Thắng ngay lập tức")).toBe("thang ngay lap tuc");
    expect(normalize("Đào tìm Grail")).toBe("dao tim grail");
  });

  test("cắt khoảng trắng hai đầu", () => {
    expect(normalize("  F5  ")).toBe("f5");
  });

  test("chịu được null, undefined và số", () => {
    expect(normalize(null)).toBe("");
    expect(normalize(undefined)).toBe("");
    expect(normalize(42)).toBe("42");
  });
});

describe("matches", () => {
  test("query rỗng khớp mọi thứ", () => {
    expect(matches("", "abc")).toBe(true);
    expect(matches("   ", "abc")).toBe(true);
  });

  test("gõ không dấu vẫn tìm được chữ có dấu", () => {
    expect(matches("vang", "Nhận 100.000 vàng")).toBe(true);
    expect(matches("dao", "Đào tìm Grail")).toBe(true);
  });

  test("nhiều từ phải khớp đủ, không cần đúng thứ tự", () => {
    expect(matches("tuc thang", "Thắng ngay lập tức")).toBe(true);
    expect(matches("thang thua", "Thắng ngay lập tức")).toBe(false);
  });

  test("tìm trên nhiều trường và cả mảng", () => {
    expect(matches("ctrl", "Ctrl + S", "Save")).toBe(true);
    expect(matches("save", ["Ctrl + S", "Save game"])).toBe(true);
  });
});

describe("filterCheats", () => {
  const rows = [
    {
      complete: "nwczion",
      wog: "wogminastirith",
      vcmi: "vcmibuild",
      effect: "Xây toàn bộ công trình",
    },
    {
      complete: { code: "nwcarchitect", note: "chỉ HotA" },
      wog: null,
      vcmi: "vcmigrail",
      effect: "Nhận Grail",
    },
    { complete: null, wog: null, vcmi: "vcmiskill", effect: "Tăng chỉ số" },
  ];
  const codes = (q) => filterCheats(rows, q).map((r) => r.effect);

  test("tìm theo mã ở cả 3 cột", () => {
    expect(codes("nwczion")).toEqual(["Xây toàn bộ công trình"]);
    expect(codes("wogminas")).toEqual(["Xây toàn bộ công trình"]);
    expect(codes("vcmiskill")).toEqual(["Tăng chỉ số"]);
  });

  test("tìm được mã và ghi chú dạng object", () => {
    expect(codes("nwcarchitect")).toEqual(["Nhận Grail"]);
    expect(codes("hota")).toEqual(["Nhận Grail"]);
  });

  test("tìm theo tác dụng, không dấu", () => {
    expect(codes("xay")).toEqual(["Xây toàn bộ công trình"]);
  });

  test("query rỗng trả về đủ, không khớp trả về rỗng", () => {
    expect(filterCheats(rows, "")).toHaveLength(3);
    expect(filterCheats(rows, "khongcoma")).toEqual([]);
  });
});

describe("filterKeybinds", () => {
  const groups = [
    {
      section: "Màn hình phiêu lưu",
      rows: [
        ["S", "Save game"],
        ["L", "Load game"],
      ],
    },
    {
      section: "Màn hình chiến đấu",
      rows: [
        ["A", "Tự động đánh"],
        ["F6", "Bật/tắt lưới ô"],
      ],
    },
  ];

  test("khớp tên section thì giữ nguyên cả nhóm", () => {
    const result = filterKeybinds(groups, "chien dau");
    expect(result).toHaveLength(1);
    expect(result[0].rows).toHaveLength(2);
  });

  test("lọc từng dòng theo phím hoặc chức năng", () => {
    expect(filterKeybinds(groups, "save")).toEqual([
      { section: "Màn hình phiêu lưu", rows: [["S", "Save game"]] },
    ]);
    expect(filterKeybinds(groups, "f6")[0].rows).toEqual([
      ["F6", "Bật/tắt lưới ô"],
    ]);
  });

  test("bỏ nhóm không còn dòng nào", () => {
    expect(filterKeybinds(groups, "khongco")).toEqual([]);
  });

  test("không sửa dữ liệu gốc", () => {
    filterKeybinds(groups, "save");
    expect(groups[0].rows).toHaveLength(2);
  });
});

describe("textOf", () => {
  test("lấy chữ trong JSX lồng nhau", () => {
    const node = h(
      "p",
      null,
      "Cài ",
      h("b", null, "HD Patch"),
      [" cho ", h("i", null, "HotA")],
      7,
    );
    expect(normalize(textOf(node))).toBe("cai  hd patch  cho  hota 7");
  });

  test("bỏ qua null, undefined và boolean", () => {
    expect(textOf(h("p", null, null, false, true, undefined))).toBe("   ");
    expect(textOf(null)).toBe("");
  });
});

describe("filterFaq", () => {
  const items = [
    {
      q: "Windows 7 có chơi được không?",
      a: h("p", null, "Nên dùng Windows 10"),
    },
    {
      q: "Lỗi thiếu file",
      a: h("p", null, "Cài ", h("b", null, "Visual C++")),
    },
  ];

  test("query rỗng giữ nguyên danh sách", () => {
    expect(filterFaq(items, "")).toEqual(items);
  });

  test("tìm theo câu hỏi, không cần dấu", () => {
    expect(filterFaq(items, "choi duoc")).toEqual([items[0]]);
  });

  test("tìm theo nội dung câu trả lời", () => {
    expect(filterFaq(items, "visual c++")).toEqual([items[1]]);
  });

  test("không khớp thì trả về rỗng", () => {
    expect(filterFaq(items, "vcmi")).toEqual([]);
  });

  test("tìm được trong FAQ thật", () => {
    const shown = filterFaq(FAQ_ITEMS, "msvcp140");
    expect(shown.length).toBeGreaterThan(0);
    expect(shown[0].q).toMatch(/DLL/);
  });
});
