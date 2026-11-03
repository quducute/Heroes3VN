import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  initialPrefs,
  loadPrefs,
  saveFontSize,
  savePins,
  saveSteps,
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
import { cleanSteps, clearSteps, toggleStep } from "../../lib/steps.js";

const PrefsContext = createContext({
  fontSize: DEFAULT_FONT_SIZE,
  pins: [],
  steps: [],
  setFontSize: async () => {},
  resetFontSize: () => {},
  togglePin: () => {},
  unpinAll: () => {},
  toggleStep: () => {},
  clearSteps: () => {},
});

export const usePrefs = () => useContext(PrefsContext);

function storeSteps(ref, setState, next) {
  ref.current = next;
  setState(next);
  saveSteps(next).catch(() => {});
}

export function PrefsProvider({ initial, children }) {
  const [start] = useState(() => initial ?? initialPrefs());
  const [fontSize, setFont] = useState(() => validFont(start.fontSize));
  const [pins, setPins] = useState(() => cleanPins(start.pins));
  const [steps, setSteps] = useState(() => cleanSteps(start.steps));
  const latestSteps = useRef(steps);
  const loaded = Boolean(initial);

  useEffect(() => {
    const apply = (p) => {
      setFont(validFont(p.fontSize));
      setPins(cleanPins(p.pins));
      latestSteps.current = cleanSteps(p.steps);
      setSteps(latestSteps.current);
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
      steps,
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
      toggleStep: (id) =>
        storeSteps(latestSteps, setSteps, toggleStep(latestSteps.current, id)),
      clearSteps: (ids) =>
        storeSteps(latestSteps, setSteps, clearSteps(latestSteps.current, ids)),
    }),
    [fontSize, pins, steps],
  );

  return (
    <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>
  );
}
