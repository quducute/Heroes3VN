export const DEFAULT_SETTINGS = { defaultPage: "home" };

const KEY = "h3vn-settings";

export function loadSettings() {
  try {
    const raw = globalThis.localStorage?.getItem(KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export function saveSettings(settings) {
  globalThis.localStorage.setItem(KEY, JSON.stringify(settings));
  return settings;
}

export function resetSettings() {
  return saveSettings({ ...DEFAULT_SETTINGS });
}
