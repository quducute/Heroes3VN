import { Paths } from "expo-file-system";
import { clearModCache } from "./update";

export function getCacheSize() {
  try {
    return Paths.cache.size ?? 0;
  } catch {
    return 0;
  }
}

function tryDelete(entry) {
  try {
    entry.delete();
    return true;
  } catch {
    return false;
  }
}

export function clearCache() {
  const before = getCacheSize();
  for (const entry of Paths.cache.list()) tryDelete(entry);
  clearModCache();
  return Math.max(0, before - getCacheSize());
}
