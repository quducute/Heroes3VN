(() => {
  const invoke = (cmd, args) => window.__TAURI_INTERNALS__.invoke(cmd, args);
  Object.defineProperty(window, "h3vn", {
    value: Object.freeze({
      fetchText: (url) => invoke("fetch_text", { url }),
      getSettings: () => invoke("get_settings"),
      setWindowSize: (size) => invoke("set_window_size", { size }),
      setDefaultPage: (page) => invoke("set_default_page", { page }),
      resetSettings: () => invoke("reset_settings"),
      getCacheSize: () => invoke("get_cache_size"),
      clearCache: () => invoke("clear_cache"),
    }),
  });
})();
