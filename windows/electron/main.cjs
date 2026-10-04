const {
  app,
  BrowserWindow,
  shell,
  Menu,
  session,
  ipcMain,
  net,
  screen,
} = require("electron");
const path = require("node:path");
const fs = require("node:fs");

const FETCH_ALLOWED_HOSTS = new Set([
  "drive.google.com",
  "drive.usercontent.google.com",
  "api.gog.com",
]);

function registerFetchProxy() {
  ipcMain.handle("h3vn:fetch-text", async (_event, url) => {
    const u = new URL(url);
    if (u.protocol !== "https:" || !FETCH_ALLOWED_HOSTS.has(u.hostname)) {
      throw new Error(`Host không được phép: ${u.hostname}`);
    }
    const res = await net.fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  });
}

function allowCors() {
  session.defaultSession.webRequest.onHeadersReceived(
    {
      urls: [
        "https://download.h3hota.com/*",
        "https://api.gog.com/*",
        "https://rss.moddb.com/*",
      ],
    },
    (details, callback) => {
      const headers = { ...details.responseHeaders };
      for (const key of Object.keys(headers)) {
        if (key.toLowerCase() === "access-control-allow-origin") {
          delete headers[key];
        }
      }
      headers["Access-Control-Allow-Origin"] = ["*"];
      callback({ responseHeaders: headers });
    },
  );
}

const MIN_WIDTH = 1280;
const MIN_HEIGHT = 720;

const WINDOW_SIZES = new Set([
  "1280x720",
  "1366x768",
  "1600x900",
  "1920x1080",
  "maximized",
]);
const DEFAULT_SETTINGS = { windowSize: "1280x720" };

function settingsPath() {
  return path.join(app.getPath("userData"), "settings.json");
}

function loadSettings() {
  try {
    const data = JSON.parse(fs.readFileSync(settingsPath(), "utf8"));
    const settings = { ...DEFAULT_SETTINGS, ...data };
    if (!WINDOW_SIZES.has(settings.windowSize)) {
      settings.windowSize = DEFAULT_SETTINGS.windowSize;
    }
    return settings;
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

function saveSettings(settings) {
  fs.mkdirSync(path.dirname(settingsPath()), { recursive: true });
  fs.writeFileSync(settingsPath(), JSON.stringify(settings, null, 2));
}

function getWindowSize(windowSize) {
  const { width: workWidth, height: workHeight } =
    screen.getPrimaryDisplay().workAreaSize;
  let [width, height] = [MIN_WIDTH, MIN_HEIGHT];
  const m = /^(\d+)x(\d+)$/.exec(windowSize);
  if (m) [width, height] = [Number(m[1]), Number(m[2])];
  return {
    width: Math.max(MIN_WIDTH, Math.min(width, workWidth)),
    height: Math.max(MIN_HEIGHT, Math.min(height, workHeight)),
  };
}

function applyWindowSize(win, windowSize) {
  if (windowSize === "maximized") {
    win.maximize();
    return;
  }
  if (win.isMaximized()) win.unmaximize();
  const { width, height } = getWindowSize(windowSize);
  win.setSize(width, height);
  win.center();
}

function registerSettings() {
  ipcMain.handle("h3vn:get-settings", () => {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    return { settings: loadSettings(), workArea: { width, height } };
  });
  ipcMain.handle("h3vn:set-window-size", (event, windowSize) => {
    if (!WINDOW_SIZES.has(windowSize)) {
      throw new Error(`Kích thước không hợp lệ: ${windowSize}`);
    }
    const settings = { ...loadSettings(), windowSize };
    saveSettings(settings);
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win) applyWindowSize(win, windowSize);
    return settings;
  });
  ipcMain.handle("h3vn:get-cache-size", () =>
    session.defaultSession.getCacheSize(),
  );
  ipcMain.handle("h3vn:clear-cache", async () => {
    const ses = session.defaultSession;
    const freed = await ses.getCacheSize();
    await ses.clearCache();
    await ses.clearCodeCaches({});
    await ses.clearStorageData({
      storages: ["cachestorage", "shadercache", "serviceworkers"],
    });
    return freed;
  });
}

function createWindow() {
  const { windowSize } = loadSettings();
  const win = new BrowserWindow({
    ...getWindowSize(windowSize),
    minWidth: MIN_WIDTH,
    minHeight: MIN_HEIGHT,
    center: true,
    backgroundColor: "#15120d",
    autoHideMenuBar: true,
    title: "Heroes 3 VN by Gogetto",
    icon: path.join(__dirname, "icon.ico"),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.cjs"),
    },
  });

  Menu.setApplicationMenu(null);
  if (windowSize === "maximized") win.maximize();

  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("http://") || url.startsWith("https://")) {
      shell.openExternal(url).catch(console.error);
    }
    return { action: "deny" };
  });
  win.webContents.on("will-navigate", (event, url) => {
    if (url.startsWith("http://") || url.startsWith("https://")) {
      event.preventDefault();
      shell.openExternal(url).catch(console.error);
    }
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL).catch(console.error);
  } else {
    win
      .loadFile(path.join(__dirname, "..", "dist", "index.html"))
      .catch(console.error);
  }
}

app
  .whenReady()
  .then(() => {
    allowCors();
    registerFetchProxy();
    registerSettings();
    createWindow();
  })
  .catch((err) => {
    console.error(err);
    app.quit();
  });

app.on("window-all-closed", () => {
  app.quit();
});
