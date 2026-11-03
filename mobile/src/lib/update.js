import { createModLatest, createModSources } from "@shared/lib/sources.js";

export {
  LATEST_RELEASE_URL,
  fetchLatestRelease,
  compareVersions,
} from "@shared/lib/sources.js";

export const { fetchModLatest, clearModCache } =
  createModLatest(createModSources());
