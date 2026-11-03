import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  initialPrefs,
  loadPrefs,
  saveFontSize,
  savePins,
  subscribePrefs,
} from "@app/lib/prefs.js";
import {
  DEFAULT_FONT_SIZE,
  validFontSize as validFont,
} from "../../data/settings.js";
import {
  cleanPins,
  togglePin as toggle,
  unpinAll as unpin,
} from "../../lib/pins.js";

const PrefsContext = createContext({
  fontSize: DEFAULT_FONT_SIZE,
  pins: [],
  setFontSize: async () => {},
  resetFontSize: () => {},
  togglePin: () => {},
  unpinAll: () => {},
});

export const usePrefs = () => useContext(PrefsContext);

export function PrefsProvider({ initial, children }) {
  const [start] = useState(() => initial ?? initialPrefs());
  const [fontSize, setFont] = useState(() => validFont(start.fontSize));
  const [pins, setPins] = useState(() => cleanPins(start.pins));
  const loaded = Boolean(initial);

  useEffect(() => {
    const apply = (p) => {
      setFont(validFont(p.fontSize));
      setPins(cleanPins(p.pins));
    };
    let live = true;
    if (!loaded)
      loadPrefs()
        .then((p) => live && apply(p))
        .catch(() => {});
    const unsubscribe = subscribePrefs(apply);
    return () => {
      live = false;
      unsubscribe();
    };
  }, [loaded]);

  const value = useMemo(
    () => ({
      fontSize,
      pins,
      setFontSize: async (next) => {
        setFont(validFont(next));
        await saveFontSize(validFont(next));
      },
      resetFontSize: () => setFont(DEFAULT_FONT_SIZE),
      togglePin: (id) => {
        const next = toggle(pins, id);
        setPins(next);
        savePins(next).catch(() => {});
      },
      unpinAll: (prefix) => {
        const next = unpin(pins, prefix);
        setPins(next);
        savePins(next).catch(() => {});
      },
    }),
    [fontSize, pins],
  );

  return (
    <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>
  );
}
