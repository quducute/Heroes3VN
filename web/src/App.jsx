import { useState, useRef, useCallback, useEffect } from "react";
import { Download, Menu } from "lucide-react";
import { NavContext } from "@shared/desktop/components/ui.jsx";
import { APP_VERSION } from "./lib/version.js";
import { LATEST_RELEASE_URL } from "./lib/update.js";
import brandLogo from "@shared/assets/images/logo.webp";
import { VN as VietnamFlag } from "country-flag-icons/react/3x2";
import { findPage } from "@shared/desktop/pages/index.js";
import { HOME_TITLE, pageFromPath, pathOf } from "./lib/routing.js";
import { Sidebar } from "@shared/desktop/components/Sidebar.jsx";
import { Home } from "@shared/desktop/pages/home.jsx";
import { ScrollButtons } from "@shared/desktop/components/ScrollButtons.jsx";
import { ShareButton } from "./components/ShareButton.jsx";
import { VersionPage } from "@shared/desktop/components/VersionPage.jsx";
import { cx, MAIN, SIDE_BTN } from "@shared/desktop/lib/cls.js";

export default function App() {
  const [page, setPage] = useState(pageFromPath);
  const [menuOpen, setMenuOpen] = useState(false);
  const contentRef = useRef(null);
  const go = useCallback((id) => {
    setPage(id);
    setMenuOpen(false);
    if (location.pathname !== pathOf(id)) {
      history.pushState(null, "", pathOf(id));
    }
  }, []);
  const version = findPage(page);

  useEffect(() => {
    const path = pathOf(pageFromPath());
    if (location.pathname !== path) {
      history.replaceState(null, "", path + location.search + location.hash);
    }
    const onPop = () => setPage(pageFromPath());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    document.title = version ? `Heroes 3 VN | ${version.name}` : HOME_TITLE;
  }, [version]);

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
      <div className="flex h-screen tablet:flex-col tablet:h-dvh">
        <header className="hidden tablet:flex items-center gap-3 shrink-0 h-13.5 px-3.5 bg-linear-180/srgb from-bar to-bg border-b-2 border-line">
          <div className="flex-1 flex items-center">
            <button
              type="button"
              className="flex items-center justify-center w-10 h-10 bg-transparent border border-line rounded-lg text-gold-bright cursor-pointer"
              aria-label="Mở menu"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={22} />
            </button>
          </div>
          <button
            type="button"
            className="flex p-0 bg-transparent border-none cursor-pointer"
            onClick={() => go("home")}
          >
            <img
              className="h-8.5 w-auto drop-shadow-[0_2px_6px_color-mix(in_srgb,goldenrod_35%,transparent)]"
              src={brandLogo}
              alt="Heroes 3 VN"
            />
          </button>
          <div className="flex-1 flex flex-col items-end gap-0.5">
            <VietnamFlag
              className="block w-6.5 rounded-xs shadow-[0_0_4px_color-mix(in_srgb,black_50%,transparent)]"
              title="Việt Nam"
            />
            <span className="text-[10px] font-semibold leading-none text-muted">
              v{APP_VERSION}
            </span>
          </div>
        </header>
        <button
          type="button"
          className={cx(
            "hidden",
            menuOpen &&
              "tablet:block fixed inset-0 z-55 p-0 bg-black/60 border-none",
          )}
          aria-label="Đóng menu"
          tabIndex={-1}
          onClick={() => setMenuOpen(false)}
        />
        <Sidebar
          page={page}
          setPage={go}
          menuOpen={menuOpen}
          footer={
            <a
              className={SIDE_BTN}
              href={LATEST_RELEASE_URL}
              target="_blank"
              rel="noreferrer"
            >
              <Download size={16} /> Tải app Heroes 3 VN
            </a>
          }
        />
        <main
          className={cx(MAIN, "tablet:min-h-0")}
          key={page}
          ref={contentRef}
        >
          {version ? (
            <VersionPage
              version={version}
              actions={<ShareButton name={version.name} />}
            />
          ) : (
            <Home setPage={go} />
          )}
        </main>
        <ScrollButtons scrollRef={contentRef} page={page} />
      </div>
    </NavContext.Provider>
  );
}
