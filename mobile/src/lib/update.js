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

function formatDate(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;
}

async function fetchGithubLatest(repo, label) {
  const res = await fetch(
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
  const res = await fetch("https://download.h3hota.com/upd/changelogs/eng.txt");
  if (!res.ok) throw new Error(`HotA changelog HTTP ${res.status}`);
  const text = await res.text();
  const m = /Version\s+([\d.]+)\s*\((\d{2}\.\d{2}\.\d{4})\)/.exec(text);
  if (!m) throw new Error("Không tìm thấy version trong changelog");
  return { label: "HotA mới nhất", version: m[1], date: m[2] };
}

async function fetchGogCompleteLatest() {
  const res = await fetch(
    "https://api.gog.com/products/1207658787?expand=downloads",
  );
  if (!res.ok) throw new Error(`GOG API HTTP ${res.status}`);
  const data = await res.json();
  const installer = (data.downloads?.installers || []).find(
    (i) => i.os === "windows",
  );
  if (!installer?.version) throw new Error("Không thấy version installer");
  return { label: "Complete", version: installer.version, date: null };
}

async function fetchHommHdLatest() {
  const res = await fetchWithTimeout(
    "https://drive.google.com/uc?export=download&id=1OeNFzNy-m9ZDxe4ikGEGVqMrfVN-Nwbz",
  );
  if (!res.ok) throw new Error(`HD changelog HTTP ${res.status}`);
  const text = await res.text();
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
  const res = await fetch(
    "https://rss.moddb.com/mods/heroes-chronicles-fully-compability-hdmod/downloads/feed/rss.xml",
  );
  if (!res.ok) throw new Error(`ModDB RSS HTTP ${res.status}`);
  const xml = await res.text();
  const items = xml.split(/<item>/i).slice(1);
  for (const item of items) {
    const title = (/<title>([\s\S]*?)<\/title>/i.exec(item)?.[1] || "")
      .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/i, "$1")
      .trim();
    if (!title.toUpperCase().includes("ENG")) continue;
    const m = /VERSION\s+([\d.]+)/i.exec(title);
    if (!m) continue;
    const pub = /<pubDate>([\s\S]*?)<\/pubDate>/i.exec(item)?.[1];
    return {
      label: "Chronicles HD mới nhất",
      version: m[1],
      date: pub ? formatDate(pub.trim()) : null,
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

const modCache = new Map();

export async function fetchModLatest(id) {
  const source = MOD_SOURCES[id];
  if (!source) return null;
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

export function compareVersions(a, b) {
  const pa = a.split(".").map(Number);
  const pb = b.split(".").map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const x = pa[i] || 0;
    const y = pb[i] || 0;
    if (x < y) return -1;
    if (x > y) return 1;
  }
  return 0;
}
