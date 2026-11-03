function isExternalUrl(url) {
  try {
    const { protocol } = new URL(url);
    return protocol === "http:" || protocol === "https:";
  } catch {
    return false;
  }
}

function openExternal(shell, url) {
  if (isExternalUrl(url)) shell.openExternal(url).catch(console.error);
}

function registerLinkHandlers(webContents, shell) {
  webContents.setWindowOpenHandler(({ url }) => {
    openExternal(shell, url);
    return { action: "deny" };
  });
  webContents.on("will-navigate", (event) => {
    event.preventDefault();
    openExternal(shell, event.url);
  });
}

module.exports = { isExternalUrl, registerLinkHandlers };
