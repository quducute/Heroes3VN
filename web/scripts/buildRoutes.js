import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { pageDirs, pageMeta, uniquePages, withMeta } from "./lib/routes.js";

const SRC_DIRS = ["../src/", "../../shared/data/", "../../shared/desktop/"].map(
  (d) => fileURLToPath(new URL(d, import.meta.url)),
);
const sources = SRC_DIRS.flatMap((dir) =>
  readdirSync(dir, { recursive: true })
    .filter((f) => /\.jsx?$/.test(f) && !/\.test\.jsx?$/.test(f))
    .sort((a, b) => a.localeCompare(b))
    .map((f) => readFileSync(`${dir}${f}`, "utf8")),
);
const dist = (p) => fileURLToPath(new URL(`../dist/${p}`, import.meta.url));

const html = readFileSync(dist("index.html"), "utf8");
const site = html.match(/property="og:url"\s+content="([^"]+)"/)[1];
const basePath = new URL(site).pathname;
const pages = uniquePages(sources);

function lastModified() {
  try {
    const args = ["log", "-1", "--format=%cs"];
    return execFileSync("git", args, { encoding: "utf8" }).trim(); // NOSONAR
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
}

for (const p of pages) {
  const page = withMeta(html, "../", pageMeta(site, p));
  for (const dir of pageDirs(p)) {
    mkdirSync(dist(dir), { recursive: true });
    writeFileSync(dist(`${dir}/index.html`), page);
  }
}
writeFileSync(dist("404.html"), withMeta(html, basePath));
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
