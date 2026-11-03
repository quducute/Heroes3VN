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
const PAGE_ID_RE = /^[a-z]+$/;
const DEFAULT_SETTINGS = Object.freeze({
  windowSize: "1280x720",
  defaultPage: "home",
});

function isPageId(value) {
  return typeof value === "string" && PAGE_ID_RE.test(value);
}

function parseSettings(text) {
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
  const settings = { ...DEFAULT_SETTINGS };
  if (data && typeof data === "object" && !Array.isArray(data)) {
    if (WINDOW_SIZES.has(data.windowSize))
      settings.windowSize = data.windowSize;
    if (isPageId(data.defaultPage)) settings.defaultPage = data.defaultPage;
  }
  return settings;
}

function loadSettings(file) {
  try {
    return parseSettings(fs.readFileSync(file, "utf8"));
  } catch {
    return { ...DEFAULT_SETTINGS };
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
  DEFAULT_SETTINGS,
  isPageId,
  parseSettings,
  loadSettings,
  saveSettings,
  fitWindowSize,
};
