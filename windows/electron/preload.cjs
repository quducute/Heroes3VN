const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("h3vn", {
  fetchText: (url) => ipcRenderer.invoke("h3vn:fetch-text", url),
});
