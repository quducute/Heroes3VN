import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { validFontSize } from "@shared/data/settings.js";
import {
  cleanPins,
  togglePin as toggle,
  unpinAll as unpin,
} from "@shared/lib/pins.js";
import { cleanSteps, clearSteps, toggleStep } from "@shared/lib/steps.js";
import {
  loadSettings,
  saveSettings,
  resetSettings,
  subscribeSettings,
} from "../lib/settings";

const fromSettings = (settings) => ({
  fontSize: validFontSize(settings.fontSize),
  pins: cleanPins(settings.pins),
  steps: cleanSteps(settings.steps),
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
  steps: [],
  setFontSize: () => false,
  togglePin: () => {},
  unpinAll: () => {},
  toggleStep: () => {},
  clearSteps: () => {},
  reset: () => resetSettings(),
});

export const usePrefs = () => useContext(PrefsContext);

export function PrefsProvider({ children }) {
  const [prefs, setPrefs] = useState(() => fromSettings(loadSettings()));
  const latestSteps = useRef(prefs.steps);

  useEffect(
    () =>
      subscribeSettings((settings) => {
        const next = fromSettings(settings);
        latestSteps.current = next.steps;
        setPrefs(next);
      }),
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
      toggleStep: (id) => {
        const steps = toggleStep(latestSteps.current, id);
        latestSteps.current = steps;
        setPrefs((p) => ({ ...p, steps }));
        trySave({ steps });
      },
      clearSteps: (ids) => {
        const steps = clearSteps(latestSteps.current, ids);
        latestSteps.current = steps;
        setPrefs((p) => ({ ...p, steps }));
        trySave({ steps });
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
