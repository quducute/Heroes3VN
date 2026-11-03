const bridge = () => window.h3vn;

export function initialPrefs() {
  const fontSize = new URLSearchParams(location.search).get("font");
  return { fontSize, pins: [] };
}

export async function loadPrefs() {
  const { settings } = await bridge().getSettings();
  return { fontSize: settings.fontSize, pins: settings.pins };
}

export const saveFontSize = (fontSize) => bridge().setFontSize(fontSize);

export const savePins = (pins) => bridge().setPins(pins);

export const subscribePrefs = () => () => {};
