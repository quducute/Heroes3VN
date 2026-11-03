const KEY = "h3vn-prefs";

function read() {
  try {
    const data = JSON.parse(localStorage.getItem(KEY));
    return data && typeof data === "object" && !Array.isArray(data) ? data : {};
  } catch {
    return {};
  }
}

function write(patch) {
  localStorage.setItem(KEY, JSON.stringify({ ...read(), ...patch }));
}

export function initialPrefs() {
  const { fontSize, pins } = read();
  return { fontSize, pins };
}

export const loadPrefs = async () => initialPrefs();

export const saveFontSize = async (fontSize) => write({ fontSize });

export const savePins = async (pins) => write({ pins });

export function subscribePrefs(onChange) {
  const handler = (e) => {
    if (e.key === KEY || e.key === null) onChange(initialPrefs());
  };
  addEventListener("storage", handler);
  return () => removeEventListener("storage", handler);
}
