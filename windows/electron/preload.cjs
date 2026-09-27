const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("h3vn", {
  fetchText: (url) => ipcRenderer.invoke("h3vn:fetch-text", url),
  getSettings: () => ipcRenderer.invoke("h3vn:get-settings"),
  setWindowSize: (size) => ipcRenderer.invoke("h3vn:set-window-size", size),
  getCacheSize: () => ipcRenderer.invoke("h3vn:get-cache-size"),
  clearCache: () => ipcRenderer.invoke("h3vn:clear-cache"),
});
