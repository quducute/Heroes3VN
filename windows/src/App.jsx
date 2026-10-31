import { useState, useRef, useCallback, useEffect } from "react";
import { Menu, ScrollText } from "lucide-react";
import { versions } from "./data/versions.js";
import { CHANGELOG_URLS } from "./data/links.js";
import { NavContext } from "./components/ui.jsx";
import { APP_VERSION } from "./lib/version.js";
import brandLogo from "./assets/images/logo.webp";
import { VN as VietnamFlag } from "country-flag-icons/react/3x2";
import { fetchLatestRelease, compareVersions } from "./lib/update.js";
import { IS_WEB } from "./lib/platform.js";
import { ModLatest } from "./components/ModLatest.jsx";
import { EXTRA_PAGES } from "./pages/index.js";
import {
  HOME_TITLE,
  pageFromPath,
  pathOf,
  startupPage,
} from "./lib/routing.js";
import { UpdateModal } from "./components/UpdateModal.jsx";
import { Sidebar } from "./components/Sidebar.jsx";
import { Home } from "./pages/home.jsx";
import { ScrollButtons } from "./components/ScrollButtons.jsx";

function PageIcon({ version }) {
  return <img src={version.icon} alt="" />;
}

export default function App() {
  const [page, setPage] = useState(() =>
    IS_WEB ? pageFromPath() : startupPage(),
  );
  const [update, setUpdate] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const contentRef = useRef(null);
  const go = useCallback((id) => {
    setPage(id);
    setMenuOpen(false);
    if (IS_WEB && location.pathname !== pathOf(id)) {
      history.pushState(null, "", pathOf(id));
    }
  }, []);
  const version =
    versions.find((v) => v.id === page) ||
    EXTRA_PAGES.find((p) => p.id === page) ||
    null;

  useEffect(() => {
    if (!IS_WEB) return;
    const path = pathOf(pageFromPath());
    if (location.pathname !== path) {
      history.replaceState(null, "", path + location.search + location.hash);
    }
    const onPop = () => setPage(pageFromPath());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (IS_WEB) {
      document.title = version ? `Heroes 3 VN | ${version.name}` : HOME_TITLE;
    }
  }, [version]);

  const checkUpdate = useCallback(async (manual) => {
    if (manual) setUpdate({ status: "checking" });
    try {
      const { version: latest, notes } = await fetchLatestRelease();
      if (compareVersions(APP_VERSION, latest) < 0) {
        setUpdate({ status: "update", latest, notes });
      } else if (manual) {
        setUpdate({ status: "latest", latest });
      }
    } catch {
      if (manual) setUpdate({ status: "error" });
    }
  }, []);

  useEffect(() => {
    if (IS_WEB) return;
    fetchLatestRelease()
      .then(({ version: latest, notes }) => {
        if (compareVersions(APP_VERSION, latest) < 0) {
          setUpdate({ status: "update", latest, notes });
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <NavContext.Provider value={go}>
      <div className={"layout" + (menuOpen ? " menu-open" : "")}>
        <header className="mobile-bar">
          <div className="mobile-bar-side">
            <button
              type="button"
              className="mobile-menu-btn"
              aria-label="Mở menu"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={22} />
            </button>
          </div>
          <button
            type="button"
            className="mobile-brand"
            onClick={() => go("home")}
          >
            <img src={brandLogo} alt="Heroes 3 VN" />
          </button>
          <div className="mobile-bar-side mobile-bar-right">
            <VietnamFlag className="mobile-flag" title="Việt Nam" />
            <span className="mobile-version">v{APP_VERSION}</span>
          </div>
        </header>
        <button
          type="button"
          className="sidebar-backdrop"
          aria-label="Đóng menu"
          tabIndex={-1}
          onClick={() => setMenuOpen(false)}
        />
        <Sidebar
          page={page}
          setPage={go}
          onCheckUpdate={() => checkUpdate(true)}
        />
        {update && (
          <UpdateModal update={update} onClose={() => setUpdate(null)} />
        )}
        <main className="content" key={page} ref={contentRef}>
          {version ? (
            <div className="page" style={{ "--accent": "var(--gold)" }}>
              <header className="page-header">
                <div className="page-icon">
                  <PageIcon version={version} />
                </div>
                <div>
                  <h1>{version.name}</h1>
                  <div className="page-sub">{version.subtitle}</div>
                </div>
                <div className="page-header-side">
                  {version.badge ? (
                    <div className="mod-latest" title={version.badge.title}>
                      <span className="mod-latest-part">
                        {version.badge.text}
                      </span>
                    </div>
                  ) : (
                    <ModLatest id={version.id} />
                  )}
                  {CHANGELOG_URLS[version.id] && (
                    <a
                      className="changelog-btn"
                      href={CHANGELOG_URLS[version.id]}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ScrollText size={14} /> Changelog
                    </a>
                  )}
                </div>
              </header>
              {version.content}
            </div>
          ) : (
            <Home setPage={go} />
          )}
        </main>
        <ScrollButtons scrollRef={contentRef} page={page} />
      </div>
    </NavContext.Provider>
  );
}
