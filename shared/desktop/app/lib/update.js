import {
  createModLatest,
  createModSources,
  fetchPlainText,
} from "../../../lib/sources.js";

export {
  REPO_URL,
  LATEST_RELEASE_URL,
  fetchLatestRelease,
  compareVersions,
} from "../../../lib/sources.js";

const bridge = globalThis.window?.h3vn;

const fetchText = (url) =>
  bridge?.fetchText ? bridge.fetchText(url) : fetchPlainText(url);

export const { fetchModLatest, clearModCache } = createModLatest(
  createModSources(fetchText),
);
