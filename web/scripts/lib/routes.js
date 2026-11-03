const PAGE_RE =
  /id: "([a-z]+)",\s*(?:path: "([^"]+)",\s*)?name: "([^"]+)",\s*subtitle: "([^"]+)"/g;

export function parsePages(text) {
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

export function uniquePages(sources) {
  return [
    ...new Map(sources.flatMap(parsePages).map((p) => [p.id, p])).values(),
  ];
}

export const escapeHtml = (s) =>
  s
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

export function withMeta(html, base, { title, description, url } = {}) {
  let out = html.replace(
    '<meta charset="UTF-8" />',
    `<meta charset="UTF-8" />\n    <base href="${base}" />`,
  );
  if (!title) return out;
  out = out
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/(property="og:title"\s+content=")[^"]*/, `$1${escapeHtml(title)}`)
    .replace(
      /((?:name="description"|property="og:description")\s+content=")[^"]*/g,
      `$1${escapeHtml(description)}`,
    )
    .replace(/(property="og:url"\s+content=")[^"]*/, `$1${url}`);
  return out.replace(
    "</title>",
    `</title>\n    <link rel="canonical" href="${url}" />`,
  );
}

export function pageMeta(site, page) {
  return {
    title: `Heroes 3 VN | ${page.name}`,
    description:
      page.summary ??
      `${page.name} (${page.subtitle}) - Heroes 3 VN by Gogetto.`,
    url: `${site}${page.path}/`,
  };
}

export const pageDirs = (page) => [
  ...new Set([page.path, page.path.toLowerCase(), page.id]),
];
