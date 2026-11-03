const bridge = () => window.h3vn;

export function initialPrefs() {
  const fontSize = new URLSearchParams(location.search).get("font");
  return { fontSize, pins: [], steps: [] };
}

export async function loadPrefs() {
  const { settings } = await bridge().getSettings();
  return {
    fontSize: settings.fontSize,
    pins: settings.pins,
    steps: settings.steps,
  };
}

export const saveFontSize = (fontSize) => bridge().setFontSize(fontSize);

export const savePins = (pins) => bridge().setPins(pins);

export const saveSteps = (steps) => bridge().setSteps(steps);

export const subscribePrefs = () => () => {};
