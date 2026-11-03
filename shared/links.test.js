import { readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, test } from "vitest";

const ROOT = import.meta.dirname;
const REPO = join(ROOT, "..");
const SOURCE_DIRS = [
  ROOT,
  join(REPO, "web", "src"),
  join(REPO, "mobile", "src"),
];

function sourceFiles(dir) {
  return readdirSync(dir, { withFileTypes: true, recursive: true })
    .filter(
      (e) =>
        e.isFile() && /\.(js|jsx)$/.test(e.name) && !/\.test\./.test(e.name),
    )
    .map((e) => join(e.parentPath, e.name));
}

const files = SOURCE_DIRS.flatMap(sourceFiles).map((path) => ({
  name: relative(REPO, path).replaceAll("\\", "/"),
  lines: readFileSync(path, "utf8").split("\n"),
}));

const URL_RE = /["'`](https?:\/\/[^"'`\s]+)["'`]/g;

const urls = files.flatMap(({ name, lines }) =>
  lines.flatMap((line, i) =>
    [...line.matchAll(URL_RE)]
      .filter(([, url]) => !url.includes("${"))
      .map(([, url]) => ({ url, where: `${name}:${i + 1}`, line })),
  ),
);

describe("URL trong code", () => {
  test("tìm thấy link để kiểm tra", () => {
    expect(urls.length).toBeGreaterThan(20);
  });

  test("mọi link đều là URL hợp lệ", () => {
    for (const { url, where } of urls) {
      expect(() => new URL(url), where).not.toThrow();
    }
  });

  test("link http:// phải được đánh dấu NOSONAR (cố ý dùng)", () => {
    for (const { url, where, line } of urls) {
      if (url.startsWith("http://")) expect(line, where).toContain("NOSONAR");
    }
  });
});

describe("link mở tab mới", () => {
  const blanks = files.flatMap(({ name, lines }) => {
    const text = lines.join("\n");
    return [...text.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)].map((m) => ({
      tag: m[0],
      where: `${name}:${text.slice(0, m.index).split("\n").length}`,
    }));
  });

  test("tìm thấy thẻ <a target=_blank>", () => {
    expect(blanks.length).toBeGreaterThan(5);
  });

  test('mọi <a target="_blank"> đều có rel="noreferrer"', () => {
    for (const { tag, where } of blanks) {
      expect(tag, where).toMatch(/rel="[^"]*noreferrer[^"]*"/);
    }
  });

  test("window.open luôn có noopener", () => {
    for (const { name, lines } of files) {
      lines.forEach((line, i) => {
        if (/window\.open\(/.test(line)) {
          expect(line, `${name}:${i + 1}`).toMatch(/noopener/);
        }
      });
    }
  });
});
