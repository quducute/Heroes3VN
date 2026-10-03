export const REPO_URL = "https://github.com/quducute/Heroes3VN";
export const RELEASES_URL = `${REPO_URL}/releases`;
export const LATEST_RELEASE_URL = `${REPO_URL}/releases/latest`;

const API_LATEST =
  "https://api.github.com/repos/quducute/Heroes3VN/releases/latest";

async function fetchWithTimeout(url, opts = {}, ms = 10000) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, { ...opts, signal: ctrl.signal });
  } finally {
    clearTimeout(timer);
  }
}

function cleanReleaseNotes(md) {
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

export async function fetchLatestRelease() {
  const res = await fetchWithTimeout(API_LATEST, {
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!res.ok) throw new Error(`GitHub API HTTP ${res.status}`);
  const data = await res.json();
  const tag = (data.tag_name || "").trim().replace(/^v/i, "");
  if (!tag) throw new Error("Release không có tag_name");
  return { version: tag, notes: cleanReleaseNotes(data.body || "") };
}

// App Electron có cầu nối h3vn (bỏ qua CORS); web và Node không có
const bridge = globalThis.window?.h3vn;
const IS_WEB = Boolean(globalThis.window) && !bridge;

async function fetchText(url) {
  if (bridge?.fetchText) return bridge.fetchText(url);
  const res = await fetchWithTimeout(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

function formatDate(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;
}

async function fetchGithubLatest(repo, label) {
  const res = await fetchWithTimeout(
    `https://api.github.com/repos/${repo}/releases/latest`,
    { headers: { Accept: "application/vnd.github+json" } },
  );
  if (!res.ok) throw new Error(`GitHub API HTTP ${res.status}`);
  const data = await res.json();
  const version = (data.tag_name || "").trim().replace(/^v/i, "");
  if (!version) throw new Error("Release không có tag_name");
  return { label, version, date: formatDate(data.published_at) };
}

async function fetchEraLatest() {
  const release = await fetchGithubLatest(
    "ERA-Projects/era-project-eng",
    "ERA mới nhất",
  );
  let modVersion = null;
  try {
    const res = await fetchWithTimeout(
      "https://raw.githubusercontent.com/ERA-Projects/era-project-eng/main/Mods/WoG/mod.json",
    );
    if (res.ok) {
      const data = await res.json();
      modVersion = data.mod_version || data.version || null;
    }
  } catch {}
  return {
    ...release,
    version: modVersion
      ? `${modVersion} Build ${release.version}`
      : release.version,
  };
}

async function fetchHotaLatest() {
  const res = await fetchWithTimeout(
    "https://download.h3hota.com/upd/changelogs/eng.txt",
  );
  if (!res.ok) throw new Error(`HotA changelog HTTP ${res.status}`);
  const text = await res.text();
  const m = /Version\s+([\d.]+)\s*\((\d{2}\.\d{2}\.\d{4})\)/.exec(text);
  if (!m) throw new Error("Không tìm thấy version trong changelog");
  return { label: "HotA mới nhất", version: m[1], date: m[2] };
}

async function fetchGogCompleteLatest() {
  const text = await fetchText(
    "https://api.gog.com/products/1207658787?expand=downloads",
  );
  const data = JSON.parse(text);
  const installer = (data.downloads?.installers || []).find(
    (i) => i.os === "windows",
  );
  if (!installer?.version) throw new Error("Không thấy version installer");
  return { label: "Complete", version: installer.version, date: null };
}

async function fetchHommHdLatest() {
  const text = await fetchText(
    "https://drive.google.com/uc?export=download&id=1OeNFzNy-m9ZDxe4ikGEGVqMrfVN-Nwbz",
  );
  const m = /->\s*([\d.]+\s*R\d+)\s*\((\d{4}-\d{2}-\d{2})\)/.exec(text);
  if (!m) throw new Error("Không tìm thấy version trong changelog HD");
  return { label: "HoMM3 HD", version: m[1], date: formatDate(m[2]) };
}

async function fetchCompleteLatest() {
  const results = await Promise.allSettled([
    fetchGogCompleteLatest(),
    fetchHommHdLatest(),
  ]);
  const items = results
    .filter((r) => r.status === "fulfilled")
    .map((r) => r.value);
  if (items.length === 0) throw new Error("Không lấy được version nào");
  return items;
}

async function fetchChroniclesHdLatest() {
  const res = await fetchWithTimeout(
    "https://rss.moddb.com/mods/heroes-chronicles-fully-compability-hdmod/downloads/feed/rss.xml",
  );
  if (!res.ok) throw new Error(`ModDB RSS HTTP ${res.status}`);
  const xml = await res.text();
  const tag = (item, name) => {
    const m = new RegExp(String.raw`<${name}>([\s\S]*?)</${name}>`).exec(item);
    return m ? m[1].replace(/^<!\[CDATA\[|\]\]>$/g, "").trim() : "";
  };
  for (const [item] of xml.matchAll(/<item>[\s\S]*?<\/item>/g)) {
    const title = tag(item, "title");
    if (!title.toUpperCase().includes("ENG")) continue;
    const m = /VERSION\s+([\d.]+)/i.exec(title);
    if (!m) continue;
    const pub = tag(item, "pubDate");
    return {
      label: "Chronicles HD mới nhất",
      version: m[1],
      date: pub ? formatDate(pub) : null,
    };
  }
  throw new Error("Không tìm thấy bản ENG trong RSS");
}

const MOD_SOURCES = {
  complete: fetchCompleteLatest,
  hota: fetchHotaLatest,
  era: fetchEraLatest,
  vcmi: () => fetchGithubLatest("vcmi/vcmi", "VCMI mới nhất"),
  chronicles: fetchChroniclesHdLatest,
};

// Bản web không gọi được các nguồn chặn CORS, nên đọc versions.json do
// GitHub Actions tạo sẵn; thiếu thì gọi trực tiếp các nguồn có CORS
const WEB_SOURCES = new Set(["era", "vcmi"]);
let webVersions = null;

function loadWebVersions() {
  webVersions ??= fetchWithTimeout("./versions.json", { cache: "no-cache" })
    .then((res) => (res.ok ? res.json() : {}))
    .then((data) => data.sources || {})
    .catch(() => ({}));
  return webVersions;
}

export async function fetchAllModLatest() {
  const ids = Object.keys(MOD_SOURCES);
  const results = await Promise.allSettled(ids.map((id) => MOD_SOURCES[id]()));
  const sources = {};
  results.forEach((r, i) => {
    if (r.status === "fulfilled") sources[ids[i]] = r.value;
    else console.warn(`${ids[i]}: ${r.reason?.message || r.reason}`);
  });
  return sources;
}

const modCache = new Map();

export async function fetchModLatest(id) {
  const source = MOD_SOURCES[id];
  if (!source) return null;
  if (IS_WEB) {
    const cached = (await loadWebVersions())[id];
    if (cached) return cached;
    if (!WEB_SOURCES.has(id)) return null;
  }
  if (!modCache.has(id)) {
    modCache.set(
      id,
      source().catch((err) => {
        modCache.delete(id);
        throw err;
      }),
    );
  }
  return modCache.get(id);
}

export function clearModCache() {
  modCache.clear();
  webVersions = null;
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
