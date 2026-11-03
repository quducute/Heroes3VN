import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { validFontSize } from "@shared/data/settings.js";
import {
  cleanPins,
  togglePin as toggle,
  unpinAll as unpin,
} from "@shared/lib/pins.js";
import {
  loadSettings,
  saveSettings,
  resetSettings,
  subscribeSettings,
} from "../lib/settings";

const fromSettings = (settings) => ({
  fontSize: validFontSize(settings.fontSize),
  pins: cleanPins(settings.pins),
});

function trySave(patch) {
  try {
    saveSettings({ ...loadSettings(), ...patch });
    return true;
  } catch {
    return false;
  }
}

const PrefsContext = createContext({
  fontSize: "medium",
  pins: [],
  setFontSize: () => false,
  togglePin: () => {},
  unpinAll: () => {},
  reset: () => resetSettings(),
});

export const usePrefs = () => useContext(PrefsContext);

export function PrefsProvider({ children }) {
  const [prefs, setPrefs] = useState(() => fromSettings(loadSettings()));

  useEffect(
    () => subscribeSettings((settings) => setPrefs(fromSettings(settings))),
    [],
  );

  const value = useMemo(
    () => ({
      ...prefs,
      setFontSize: (fontSize) => {
        const next = validFontSize(fontSize);
        setPrefs((p) => ({ ...p, fontSize: next }));
        return trySave({ fontSize: next });
      },
      togglePin: (id) => {
        const pins = toggle(prefs.pins, id);
        setPrefs((p) => ({ ...p, pins }));
        trySave({ pins });
      },
      unpinAll: (prefix) => {
        const pins = unpin(prefs.pins, prefix);
        setPrefs((p) => ({ ...p, pins }));
        trySave({ pins });
      },
      reset: () => {
        const settings = resetSettings();
        setPrefs(fromSettings(settings));
        return settings;
      },
    }),
    [prefs],
  );

  return (
    <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>
  );
}
