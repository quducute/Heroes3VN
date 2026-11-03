export const DEFAULT_SETTINGS = Object.freeze({
  defaultPage: "home",
  fontSize: "medium",
  pins: Object.freeze([]),
});

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
  return saveSettings({ ...DEFAULT_SETTINGS, pins: loadSettings().pins });
}

export function subscribeSettings(onChange) {
  const handler = (e) => {
    if (e.key === KEY || e.key === null) onChange(loadSettings());
  };
  globalThis.addEventListener?.("storage", handler);
  return () => globalThis.removeEventListener?.("storage", handler);
}
