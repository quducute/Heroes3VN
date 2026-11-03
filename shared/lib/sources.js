export const REPO_URL = "https://github.com/quducute/Heroes3VN";
export const LATEST_RELEASE_URL = `${REPO_URL}/releases/latest`;

const GITHUB_API = "https://api.github.com/repos";
const GITHUB_HEADERS = { Accept: "application/vnd.github+json" };

export const SOURCE_URLS = {
  eraChangelog:
    "https://raw.githubusercontent.com/ERA-Projects/era-project-eng/main/CHANGELOG.md",
  hota: "https://download.h3hota.com/upd/changelogs/eng.txt",
  gog: "https://api.gog.com/products/1207658787?expand=downloads",
  hd: "https://drive.google.com/uc?export=download&id=1OeNFzNy-m9ZDxe4ikGEGVqMrfVN-Nwbz",
  chronicles:
    "https://rss.moddb.com/mods/heroes-chronicles-fully-compability-hdmod/downloads/feed/rss.xml",
};

export async function fetchWithTimeout(url, opts = {}, ms = 10000) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, { ...opts, signal: ctrl.signal });
  } finally {
    clearTimeout(timer);
  }
}

export async function fetchPlainText(url) {
  const res = await fetchWithTimeout(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

export function formatDate(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;
}

export function cleanReleaseNotes(md) {
  return md
    .replaceAll("\r", "")
    .replace(/<[^<>]+>/g, "")
    .replace(/^#{1,6}\s*/gm, "")
    .replace(/^>\s?/gm, "")
    .replace(/\[([^[\]]+)\]\([^()]+\)/g, "$1")
    .replace(/(\*{1,3})([^*\n]+)\1/g, "$2")
    .replace(/(?<!\w)(_{1,3})([^_\n]+)\1(?!\w)/g, "$2")
    .replace(/~~([^~\n]+)~~/g, "$1")
    .replace(/`([^`\n]+)`/g, "$1")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function versionParts(v) {
  return v
    .trim()
    .replace(/^v/i, "")
    .split(/[-+\s]/)[0]
    .split(".")
    .map((n) => Number.parseInt(n, 10) || 0);
}

export function compareVersions(a, b) {
  const pa = versionParts(a);
  const pb = versionParts(b);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const x = pa[i] || 0;
    const y = pb[i] || 0;
    if (x < y) return -1;
    if (x > y) return 1;
  }
  return 0;
}

export function parseTag(data) {
  const tag = (data?.tag_name || "").trim().replace(/^v/i, "");
  if (!tag) throw new Error("Release không có tag_name");
  return tag;
}

export function parseEraCore(md) {
  for (const line of md.split("\n")) {
    if (!/era\.dll/i.test(line)) continue;
    const m = /\b(\d+\.\d+\.\d+)\b/.exec(line);
    if (m) return m[1];
  }
  return null;
}

export function parseHota(text) {
  const m = /Version\s+([\d.]+)\s*\((\d{2}\.\d{2}\.\d{4})\)/.exec(text);
  if (!m) throw new Error("Không tìm thấy version trong changelog");
  return { label: "HotA mới nhất", version: m[1], date: m[2] };
}

export function parseGog(text) {
  const data = JSON.parse(text);
  const installer = (data.downloads?.installers || []).find(
    (i) => i.os === "windows",
  );
  if (!installer?.version) throw new Error("Không thấy version installer");
  return { label: "Complete", version: installer.version, date: null };
}

export function parseHd(text) {
  const m = /->\s*([\d.]+\s*R\d+)\s*\((\d{4}-\d{2}-\d{2})\)/.exec(text);
  if (!m) throw new Error("Không tìm thấy version trong changelog HD");
  return { label: "HoMM3 HD", version: m[1], date: formatDate(m[2]) };
}

function xmlTag(item, name) {
  const m = new RegExp(String.raw`<${name}>([\s\S]*?)</${name}>`, "i").exec(
    item,
  );
  return m
    ? m[1]
        .trim()
        .replace(/^<!\[CDATA\[|\]\]>$/g, "")
        .trim()
    : "";
}

export function parseChronicles(xml) {
  for (const [item] of xml.matchAll(/<item>[\s\S]*?<\/item>/gi)) {
    const title = xmlTag(item, "title");
    if (!title.toUpperCase().includes("ENG")) continue;
    const m = /VERSION\s+([\d.]*\d)/i.exec(title);
    if (!m) continue;
    const pub = xmlTag(item, "pubDate");
    return {
      label: "Chronicles HD mới nhất",
      version: m[1],
      date: pub ? formatDate(pub) : null,
    };
  }
  throw new Error("Không tìm thấy bản ENG trong RSS");
}

async function fetchGithubRelease(repo) {
  const res = await fetchWithTimeout(`${GITHUB_API}/${repo}/releases/latest`, {
    headers: GITHUB_HEADERS,
  });
  if (!res.ok) throw new Error(`GitHub API HTTP ${res.status}`);
  return res.json();
}

export async function fetchLatestRelease() {
  const data = await fetchGithubRelease("quducute/Heroes3VN");
  return { version: parseTag(data), notes: cleanReleaseNotes(data.body || "") };
}

async function fetchGithubLatest(repo, label) {
  const data = await fetchGithubRelease(repo);
  return {
    label,
    version: parseTag(data),
    date: formatDate(data.published_at),
  };
}

async function fetchEraLatest() {
  const [release, core] = await Promise.all([
    fetchGithubLatest("ERA-Projects/era-project-eng", "ERA mới nhất"),
    fetchPlainText(SOURCE_URLS.eraChangelog)
      .then(parseEraCore)
      .catch(() => null),
  ]);
  return {
    ...release,
    version: core ? `${core} Build ${release.version}` : release.version,
  };
}

async function settleAll(name, tasks) {
  const results = await Promise.allSettled(tasks);
  for (const r of results) {
    if (r.status === "rejected") {
      console.warn(`${name}: ${r.reason?.message || r.reason}`);
    }
  }
  const items = results
    .filter((r) => r.status === "fulfilled")
    .map((r) => r.value);
  if (items.length === 0) throw new Error("Không lấy được version nào");
  return items;
}

export function createModSources(fetchText = fetchPlainText) {
  return {
    complete: () =>
      settleAll("complete", [
        fetchText(SOURCE_URLS.gog).then(parseGog),
        fetchText(SOURCE_URLS.hd).then(parseHd),
      ]),
    hota: () => fetchText(SOURCE_URLS.hota).then(parseHota),
    era: fetchEraLatest,
    vcmi: () => fetchGithubLatest("vcmi/vcmi", "VCMI mới nhất"),
    chronicles: () => fetchText(SOURCE_URLS.chronicles).then(parseChronicles),
  };
}

export function createModLatest(sources) {
  const cache = new Map();
  return {
    async fetchModLatest(id) {
      const source = sources[id];
      if (!source) return null;
      if (!cache.has(id)) {
        cache.set(
          id,
          source().catch((err) => {
            cache.delete(id);
            throw err;
          }),
        );
      }
      return cache.get(id);
    },
    clearModCache() {
      cache.clear();
    },
  };
}
