import { File, Paths } from "expo-file-system";

export const DEFAULT_SETTINGS = { defaultPage: "home" };

const settingsFile = () => new File(Paths.document, "settings.json");

export function loadSettings() {
  try {
    const file = settingsFile();
    if (!file.exists) return { ...DEFAULT_SETTINGS };
    return { ...DEFAULT_SETTINGS, ...JSON.parse(file.textSync()) };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export function saveSettings(settings) {
  const file = settingsFile();
  if (!file.exists) file.create();
  file.write(JSON.stringify(settings));
  return settings;
}

export function resetSettings() {
  return saveSettings({ ...DEFAULT_SETTINGS });
}
