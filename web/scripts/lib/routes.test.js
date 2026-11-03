import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, test } from "vitest";
import { versions } from "@shared/data/versions.js";
import { EXTRA_PAGES } from "@shared/desktop/pages/index.js";
import {
  escapeHtml,
  pageDirs,
  pageMeta,
  parsePages,
  uniquePages,
  withMeta,
} from "./routes.js";

const SITE = "https://quducute.github.io/Heroes3VN/";
const HTML = `<head>
    <meta charset="UTF-8" />
    <title>Heroes 3 VN by Gogetto</title>
    <meta name="description" content="Mô tả gốc" />
    <meta property="og:title" content="Heroes 3 VN by Gogetto" />
    <meta property="og:description" content="Mô tả gốc" />
    <meta property="og:url" content="${SITE}" />
</head>`;

const readSources = () =>
  ["../../src/", "../../../shared/data/", "../../../shared/desktop/"]
    .map((d) => fileURLToPath(new URL(d, import.meta.url)))
    .flatMap((dir) =>
      readdirSync(dir, { recursive: true })
        .filter((f) => /\.jsx?$/.test(f) && !/\.test\.jsx?$/.test(f))
        .map((f) => readFileSync(`${dir}${f}`, "utf8")),
    );

describe("trang tĩnh lấy từ mã nguồn", () => {
  const found = uniquePages(readSources());
  const real = [...versions, ...EXTRA_PAGES];

  test("tìm đủ mọi trang, không thừa không thiếu", () => {
    expect(found.map((p) => p.id).sort()).toEqual(real.map((p) => p.id).sort());
  });

  test("đường dẫn, tên và subtitle khớp với dữ liệu thật", () => {
    for (const p of real) {
      expect(found.find((f) => f.id === p.id)).toMatchObject({
        path: p.path ?? p.id,
        name: p.name,
        subtitle: p.subtitle,
      });
    }
  });

  test("mô tả lấy đúng summary của trang có summary", () => {
    for (const p of real.filter((r) => typeof r.summary === "string"))
      expect(found.find((f) => f.id === p.id).summary).toBe(p.summary);
  });
});

describe("parsePages", () => {
  test("path không bắt buộc, summary gắn đúng trang", () => {
    const text = `
      { id: "hota", path: "HotA", name: "Horn of the Abyss", subtitle: "HotA", summary: "Mô tả HotA" },
      { id: "faq", name: "Câu hỏi thường gặp", subtitle: "FAQ" },`;
    expect(parsePages(text)).toEqual([
      {
        id: "hota",
        path: "HotA",
        name: "Horn of the Abyss",
        subtitle: "HotA",
        summary: "Mô tả HotA",
      },
      {
        id: "faq",
        path: "faq",
        name: "Câu hỏi thường gặp",
        subtitle: "FAQ",
        summary: undefined,
      },
    ]);
  });

  test("không có trang thì trả về mảng rỗng", () => {
    expect(parsePages('const x = { id: "abc" };')).toEqual([]);
  });

  test("uniquePages gộp trang trùng id", () => {
    const page = 'id: "faq", name: "FAQ", subtitle: "Hỏi đáp"';
    expect(uniquePages([page, page])).toHaveLength(1);
  });
});

describe("thẻ meta", () => {
  test('escapeHtml thoát & " < >', () => {
    expect(escapeHtml('A & B "C" <D>')).toBe(
      "A &amp; B &quot;C&quot; &lt;D&gt;",
    );
  });

  test("404.html chỉ thêm thẻ base", () => {
    const out = withMeta(HTML, "/Heroes3VN/");
    expect(out).toContain('<base href="/Heroes3VN/" />');
    expect(out.replace('\n    <base href="/Heroes3VN/" />', "")).toBe(HTML);
  });

  test("trang con thay tiêu đề, mô tả, URL và thêm canonical", () => {
    const meta = pageMeta(SITE, {
      path: "HotA",
      name: "Horn <of> the Abyss",
      subtitle: "HotA",
      summary: 'Bản "HotA" & mod',
    });
    const out = withMeta(HTML, "../", meta);
    expect(out).toContain('<base href="../" />');
    expect(out).toContain(
      "<title>Heroes 3 VN | Horn &lt;of&gt; the Abyss</title>",
    );
    expect(out).toContain(
      'property="og:title" content="Heroes 3 VN | Horn &lt;of&gt; the Abyss"',
    );
    expect(out.match(/Bản &quot;HotA&quot; &amp; mod/g)).toHaveLength(2);
    expect(out).toContain(`property="og:url" content="${SITE}HotA/"`);
    expect(out).toContain(`<link rel="canonical" href="${SITE}HotA/" />`);
    expect(out).not.toContain("Mô tả gốc");
  });

  test("không có summary thì tự tạo mô tả từ tên và subtitle", () => {
    expect(
      pageMeta(SITE, { path: "faq", name: "Câu hỏi", subtitle: "FAQ" })
        .description,
    ).toBe("Câu hỏi (FAQ) - Heroes 3 VN by Gogetto.");
  });

  test("tạo thư mục cho cả đường dẫn gốc, chữ thường và id", () => {
    expect(pageDirs({ id: "hota", path: "HotA" })).toEqual(["HotA", "hota"]);
    expect(pageDirs({ id: "faq", path: "faq" })).toEqual(["faq"]);
  });
});
