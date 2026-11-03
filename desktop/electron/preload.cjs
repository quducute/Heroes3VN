const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("h3vn", {
  fetchText: (url) => ipcRenderer.invoke("h3vn:fetch-text", url),
  getSettings: () => ipcRenderer.invoke("h3vn:get-settings"),
  setWindowSize: (size) => ipcRenderer.invoke("h3vn:set-window-size", size),
  setDefaultPage: (page) => ipcRenderer.invoke("h3vn:set-default-page", page),
  setFontSize: (size) => ipcRenderer.invoke("h3vn:set-font-size", size),
  setPins: (pins) => ipcRenderer.invoke("h3vn:set-pins", pins),
  resetSettings: () => ipcRenderer.invoke("h3vn:reset-settings"),
  getCacheSize: () => ipcRenderer.invoke("h3vn:get-cache-size"),
  clearCache: () => ipcRenderer.invoke("h3vn:clear-cache"),
});
