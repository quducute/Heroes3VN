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
const { registerLinkHandlers } = require("./links.cjs");
const { fetchText } = require("./fetch.cjs");
const settingsStore = require("./settings.cjs");

const {
  MIN_WIDTH,
  MIN_HEIGHT,
  WINDOW_SIZES,
  FONT_SIZES,
  defaultSettings,
  isPageId,
  isPinList,
} = settingsStore;

function registerFetchProxy() {
  ipcMain.handle("h3vn:fetch-text", (_event, url) => fetchText(net, url));
}

function settingsPath() {
  return path.join(app.getPath("userData"), "settings.json");
}

function loadSettings() {
  return settingsStore.loadSettings(settingsPath());
}

function saveSettings(settings) {
  settingsStore.saveSettings(settingsPath(), settings);
}

function getWindowSize(windowSize) {
  return settingsStore.fitWindowSize(
    windowSize,
    screen.getPrimaryDisplay().workAreaSize,
  );
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
  ipcMain.handle("h3vn:set-default-page", (_event, defaultPage) => {
    if (!isPageId(defaultPage)) {
      throw new Error(`Tab không hợp lệ: ${defaultPage}`);
    }
    const settings = { ...loadSettings(), defaultPage };
    saveSettings(settings);
    return settings;
  });
  ipcMain.handle("h3vn:set-font-size", (_event, fontSize) => {
    if (!FONT_SIZES.has(fontSize)) {
      throw new Error(`Cỡ chữ không hợp lệ: ${fontSize}`);
    }
    const settings = { ...loadSettings(), fontSize };
    saveSettings(settings);
    return settings;
  });
  ipcMain.handle("h3vn:set-pins", (_event, pins) => {
    if (!isPinList(pins)) throw new Error("Danh sách ghim không hợp lệ");
    const settings = { ...loadSettings(), pins };
    saveSettings(settings);
    return settings;
  });
  ipcMain.handle("h3vn:reset-settings", (event) => {
    const settings = { ...defaultSettings(), pins: loadSettings().pins };
    saveSettings(settings);
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win) applyWindowSize(win, settings.windowSize);
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
  const { windowSize, defaultPage, fontSize } = loadSettings();
  const win = new BrowserWindow({
    ...getWindowSize(windowSize),
    minWidth: MIN_WIDTH,
    minHeight: MIN_HEIGHT,
    center: true,
    backgroundColor: "black",
    autoHideMenuBar: true,
    title: "Heroes 3 VN by Gogetto",
    icon: path.join(__dirname, "icon.ico"),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      preload: path.join(__dirname, "preload.cjs"),
    },
  });

  Menu.setApplicationMenu(null);
  if (windowSize === "maximized") win.maximize();

  registerLinkHandlers(win.webContents, shell);

  win
    .loadFile(path.join(__dirname, "..", "dist", "index.html"), {
      query: { page: defaultPage, font: fontSize },
    })
    .catch(console.error);
}

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on("second-instance", () => {
    const [win] = BrowserWindow.getAllWindows();
    if (!win) return;
    if (win.isMinimized()) win.restore();
    win.show();
    win.focus();
  });

  app
    .whenReady()
    .then(() => {
      registerFetchProxy();
      registerSettings();
      createWindow();
    })
    .catch((err) => {
      console.error(err);
      app.quit();
    });
}

app.on("window-all-closed", () => {
  app.quit();
});
