import {
  createModLatest,
  createModSources,
  fetchWithTimeout,
} from "../../../shared/lib/sources.js";

export { LATEST_RELEASE_URL } from "../../../shared/lib/sources.js";

const MOD_SOURCES = createModSources();
const WEB_SOURCES = new Set(["era", "vcmi"]);
const live = createModLatest(MOD_SOURCES);
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

export async function fetchModLatest(id) {
  if (!MOD_SOURCES[id]) return null;
  const cached = (await loadWebVersions())[id];
  if (cached) return cached;
  if (!WEB_SOURCES.has(id)) return null;
  return live.fetchModLatest(id);
}
