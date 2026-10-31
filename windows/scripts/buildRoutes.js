import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const SRC_DIR = fileURLToPath(new URL("../src/", import.meta.url));
const sources = readdirSync(SRC_DIR, { recursive: true })
  .filter((f) => /\.jsx?$/.test(f))
  .sort((a, b) => a.localeCompare(b))
  .map((f) => readFileSync(`${SRC_DIR}${f}`, "utf8"));
const dist = (p) => fileURLToPath(new URL(`../dist/${p}`, import.meta.url));

const PAGE_RE =
  /id: "([a-z]+)",\s*(?:path: "([^"]+)",\s*)?name: "([^"]+)",\s*subtitle: "([^"]+)"/g;

function parsePages(text) {
  const found = [...text.matchAll(PAGE_RE)];
  return found.map((m, i) => {
    const block = text.slice(m.index, found[i + 1]?.index);
    const summary = block.match(/summary:\s*"([^"]+)"/)?.[1];
    return {
      id: m[1],
      path: m[2] ?? m[1],
      name: m[3],
      subtitle: m[4],
      summary,
    };
  });
}

const escape = (s) =>
  s
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const html = readFileSync(dist("index.html"), "utf8");
const site = html.match(/property="og:url"\s+content="([^"]+)"/)[1];
const basePath = new URL(site).pathname;
const pages = [
  ...new Map(sources.flatMap(parsePages).map((p) => [p.id, p])).values(),
];

function lastModified() {
  try {
    const args = ["log", "-1", "--format=%cs"];
    return execFileSync("git", args, { encoding: "utf8" }).trim(); // NOSONAR
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
}

function withMeta(base, { title, description, url }) {
  let out = html.replace(
    '<meta charset="UTF-8" />',
    `<meta charset="UTF-8" />\n    <base href="${base}" />`,
  );
  if (!title) return out;
  out = out
    .replace(/<title>[^<]*<\/title>/, `<title>${escape(title)}</title>`)
    .replace(/(property="og:title"\s+content=")[^"]*/, `$1${escape(title)}`)
    .replace(
      /((?:name="description"|property="og:description")\s+content=")[^"]*/g,
      `$1${escape(description)}`,
    )
    .replace(/(property="og:url"\s+content=")[^"]*/, `$1${url}`);
  return out.replace(
    "</title>",
    `</title>\n    <link rel="canonical" href="${url}" />`,
  );
}

for (const p of pages) {
  const page = withMeta("../", {
    title: `Heroes 3 VN | ${p.name}`,
    description:
      p.summary ?? `${p.name} (${p.subtitle}) - Heroes 3 VN by Gogetto.`,
    url: `${site}${p.path}/`,
  });
  for (const dir of new Set([p.path, p.path.toLowerCase(), p.id])) {
    mkdirSync(dist(dir), { recursive: true });
    writeFileSync(dist(`${dir}/index.html`), page);
  }
}
writeFileSync(dist("404.html"), withMeta(basePath, {}));
const lastmod = lastModified();
writeFileSync(
  dist("sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[
    site,
    ...pages.map((p) => `${site}${p.path}/`),
  ]
    .map((u) => `  <url><loc>${u}</loc><lastmod>${lastmod}</lastmod></url>`)
    .join("\n")}\n</urlset>\n`,
);
console.log(
  `Đã tạo ${pages.length} trang: ${pages.map((p) => p.path).join(", ")}`,
);
