const fs = require("node:fs");
const path = require("node:path");

const MIN_WIDTH = 1280;
const MIN_HEIGHT = 720;

const WINDOW_SIZES = new Set([
  "1280x720",
  "1366x768",
  "1600x900",
  "1920x1080",
  "maximized",
]);
const FONT_SIZES = new Set(["small", "medium", "large"]);
const MAX_PINS = 200;
const MAX_PIN_LENGTH = 300;
const PAGE_ID_RE = /^[a-z]+$/;
const DEFAULT_SETTINGS = Object.freeze({
  windowSize: "1280x720",
  defaultPage: "home",
  fontSize: "medium",
  pins: Object.freeze([]),
});

function isPageId(value) {
  return typeof value === "string" && PAGE_ID_RE.test(value);
}

function isPin(value) {
  return (
    typeof value === "string" &&
    value.length > 0 &&
    value.length <= MAX_PIN_LENGTH
  );
}

function isPinList(value) {
  return (
    Array.isArray(value) &&
    value.length <= MAX_PINS &&
    value.every(isPin) &&
    new Set(value).size === value.length
  );
}

function cleanPins(value) {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.filter(isPin))].slice(-MAX_PINS);
}

function defaultSettings() {
  return { ...DEFAULT_SETTINGS, pins: [] };
}

function parseSettings(text) {
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    return defaultSettings();
  }
  const settings = defaultSettings();
  if (data && typeof data === "object" && !Array.isArray(data)) {
    if (WINDOW_SIZES.has(data.windowSize))
      settings.windowSize = data.windowSize;
    if (isPageId(data.defaultPage)) settings.defaultPage = data.defaultPage;
    if (FONT_SIZES.has(data.fontSize)) settings.fontSize = data.fontSize;
    settings.pins = cleanPins(data.pins);
  }
  return settings;
}

function loadSettings(file) {
  try {
    return parseSettings(fs.readFileSync(file, "utf8"));
  } catch {
    return defaultSettings();
  }
}

function saveSettings(file, settings) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(settings, null, 2));
}

function fitWindowSize(windowSize, workArea) {
  let [width, height] = [MIN_WIDTH, MIN_HEIGHT];
  const m = /^(\d+)x(\d+)$/.exec(windowSize);
  if (m) [width, height] = [Number(m[1]), Number(m[2])];
  return {
    width: Math.max(MIN_WIDTH, Math.min(width, workArea.width)),
    height: Math.max(MIN_HEIGHT, Math.min(height, workArea.height)),
  };
}

module.exports = {
  MIN_WIDTH,
  MIN_HEIGHT,
  WINDOW_SIZES,
  FONT_SIZES,
  MAX_PINS,
  DEFAULT_SETTINGS,
  defaultSettings,
  isPageId,
  isPinList,
  parseSettings,
  loadSettings,
  saveSettings,
  fitWindowSize,
};
