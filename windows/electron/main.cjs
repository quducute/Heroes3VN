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

const PREFERRED_WIDTH = 1600;
const PREFERRED_HEIGHT = 900;
const MIN_WIDTH = 1280;
const MIN_HEIGHT = 720;

function getDefaultWindowSize() {
  const { width: workWidth, height: workHeight } =
    screen.getPrimaryDisplay().workAreaSize;
  const width = Math.max(MIN_WIDTH, Math.min(PREFERRED_WIDTH, workWidth));
  const height = Math.max(MIN_HEIGHT, Math.min(PREFERRED_HEIGHT, workHeight));
  return { width, height };
}

function createWindow() {
  const win = new BrowserWindow({
    ...getDefaultWindowSize(),
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

  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("http://") || url.startsWith("https://")) {
      shell.openExternal(url);
    }
    return { action: "deny" };
  });
  win.webContents.on("will-navigate", (event, url) => {
    if (url.startsWith("http://") || url.startsWith("https://")) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(__dirname, "..", "dist", "index.html"));
  }
}

app.whenReady().then(() => {
  allowCors();
  registerFetchProxy();
  createWindow();
});

app.on("window-all-closed", () => {
  app.quit();
});
