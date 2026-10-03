import { Paths } from "expo-file-system";
import { clearModCache } from "./update";

export function getCacheSize() {
  try {
    return Paths.cache.size ?? 0;
  } catch {
    return 0;
  }
}

export function clearCache() {
  const before = getCacheSize();
  for (const entry of Paths.cache.list()) {
    try {
      entry.delete();
    } catch {}
  }
  clearModCache();
  return Math.max(0, before - getCacheSize());
}

export function formatBytes(bytes) {
  if (!bytes) return "0 KB";
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
