import { describe, expect, test } from "vitest";
import { sectionAnchor, sectionUrl, slugify } from "./anchor.js";

const WEB = "https://quducute.github.io/Heroes3VN/";

describe("slugify", () => {
  test("bỏ dấu, chữ thường, nối bằng gạch ngang", () => {
    expect(slugify("Hướng dẫn cài qua Heroes Launcher (Windows)")).toBe(
      "huong-dan-cai-qua-heroes-launcher-windows",
    );
    expect(slugify("Đặt mua")).toBe("dat-mua");
    expect(slugify("Mẹo: Bật chức năng mời tướng trong Tavern")).toBe(
      "meo-bat-chuc-nang-moi-tuong-trong-tavern",
    );
  });

  test("bỏ gạch ngang thừa ở đầu và cuối", () => {
    expect(slugify("  (ERA bản cũ)  ")).toBe("era-ban-cu");
  });
});

describe("sectionUrl", () => {
  test("ghép trang và mục", () => {
    expect(sectionUrl(WEB, "HotA", "viet-hoa")).toBe(`${WEB}HotA/#viet-hoa`);
  });

  test("trang chủ không có path", () => {
    expect(sectionUrl(WEB, "", "gioi-thieu")).toBe(`${WEB}#gioi-thieu`);
  });
});

describe("sectionAnchor", () => {
  test("ưu tiên id, không có thì tạo từ tiêu đề", () => {
    expect(sectionAnchor("Trang GitHub của Heroes 3 VN", "github")).toBe(
      "github",
    );
    expect(sectionAnchor("Đặt mua")).toBe("dat-mua");
  });

  test("tiêu đề không phải chuỗi và không có id thì không có anchor", () => {
    expect(sectionAnchor(null)).toBeUndefined();
  });
});
