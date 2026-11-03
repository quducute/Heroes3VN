import { readFileSync } from "node:fs";
import { describe, expect, test } from "vitest";
import { SECRET, parseInline, parseSecret } from "./secret.js";

const SAMPLE = [
  "# Tiêu đề",
  "### Lời chào",
  "Đoạn một\ndòng hai.",
  "> [!TIP]\n> Mẹo **quan trọng**",
  "> Không ghi loại",
  "## Gợi ý A",
  "- Ý một\n- Ý hai",
  "## Gợi ý B",
  "Kết thúc.",
].join("\r\n\r\n");

const allBlocks = (doc) => [
  ...doc.intro,
  ...doc.hints.flatMap((hint) => hint.blocks),
];

const blockTexts = (block) => (block.items ? block.items : [block.text]);

describe("parseInline", () => {
  test("chữ thường giữ nguyên", () => {
    expect(parseInline("Xin chào")).toEqual([{ key: "0", text: "Xin chào" }]);
  });

  test("nhận chữ in đậm và in nghiêng", () => {
    expect(parseInline("A **đậm** và _nghiêng_.")).toEqual([
      { key: "0", text: "A " },
      { key: "2", text: "đậm", bold: true },
      { key: "9", text: " và " },
      { key: "13", text: "nghiêng", italic: true },
      { key: "22", text: "." },
    ]);
  });

  test("key là vị trí ký tự nên không trùng nhau", () => {
    const keys = parseInline("**a** b **a** b").map((s) => s.key);
    expect(new Set(keys).size).toBe(keys.length);
  });

  test("dấu ** không có nội dung thì để nguyên", () => {
    expect(parseInline("****")).toEqual([{ key: "0", text: "****" }]);
  });
});

describe("parseSecret", () => {
  const doc = parseSecret(SAMPLE);

  test("lấy tiêu đề và chia phần mở đầu với các gợi ý", () => {
    expect(doc.title).toBe("Tiêu đề");
    expect(doc.intro).toHaveLength(4);
    expect(doc.hints.map((h) => h.title)).toEqual(["Gợi ý A", "Gợi ý B"]);
  });

  test("nhận đúng từng loại block", () => {
    expect(doc.intro[0]).toMatchObject({ type: "heading", text: "Lời chào" });
    expect(doc.intro[1]).toMatchObject({
      type: "paragraph",
      text: "Đoạn một dòng hai.",
    });
    expect(doc.intro[2]).toMatchObject({
      type: "alert",
      kind: "TIP",
      text: "Mẹo **quan trọng**",
    });
    expect(doc.intro[3]).toMatchObject({
      type: "alert",
      kind: "NOTE",
      text: "Không ghi loại",
    });
    expect(doc.hints[0].blocks[0]).toMatchObject({
      type: "list",
      items: ["Ý một", "Ý hai"],
    });
    expect(doc.hints[1].blocks[0]).toMatchObject({
      type: "paragraph",
      text: "Kết thúc.",
    });
  });

  test("id của block và gợi ý không trùng", () => {
    const ids = [...allBlocks(doc), ...doc.hints].map((b) => b.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("secret.md", () => {
  const source = readFileSync(
    new URL("../../secret.md", import.meta.url),
    "utf8",
  );

  test("tiêu đề lấy từ dòng đầu và có đủ 3 gợi ý", () => {
    expect(SECRET.title).toBe("The Secret of Heroes 3 VN by Gogetto");
    expect(SECRET.hints).toHaveLength(3);
    for (const hint of SECRET.hints)
      expect(hint.blocks.length).toBeGreaterThan(0);
  });

  test("mỗi gợi ý mở đầu bằng một câu TIP in nghiêng", () => {
    for (const { blocks } of SECRET.hints) {
      expect(blocks[0]).toMatchObject({ type: "alert", kind: "TIP" });
      expect(parseInline(blocks[0].text)).toEqual([
        expect.objectContaining({ italic: true }),
      ]);
    }
  });

  test("không sót cú pháp markdown chưa được xử lý", () => {
    for (const block of allBlocks(SECRET)) {
      for (const text of blockTexts(block)) {
        expect(text).not.toMatch(/^(?:#|>|- )/);
        expect(text).not.toContain("[!");
        for (const seg of parseInline(text))
          expect(seg.text).not.toContain("**");
      }
    }
  });

  test("không mất đoạn nào so với file gốc", () => {
    const chunks = source
      .replaceAll("\r", "")
      .split(/\n{2,}/)
      .filter(Boolean);
    expect(1 + SECRET.hints.length + allBlocks(SECRET).length).toBe(
      chunks.length,
    );
  });
});
