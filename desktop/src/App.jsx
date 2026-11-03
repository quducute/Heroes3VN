import { useState, useRef, useCallback, useEffect } from "react";
import { ScrollText } from "lucide-react";
import { versions } from "@shared/data/versions.js";
import { CHANGELOG_URLS } from "@shared/data/links.js";
import { NavContext } from "@shared/desktop/components/ui.jsx";
import { APP_VERSION } from "./lib/version.js";
import { fetchLatestRelease, compareVersions } from "./lib/update.js";
import { ModLatest } from "@shared/desktop/components/ModLatest.jsx";
import { EXTRA_PAGES } from "@shared/desktop/pages/index.js";
import { startupPage } from "./lib/routing.js";
import { UpdateModal } from "./components/UpdateModal.jsx";
import { SettingsButton } from "./components/SettingsButton.jsx";
import { Sidebar } from "@shared/desktop/components/Sidebar.jsx";
import { Home } from "@shared/desktop/pages/home.jsx";
import { ScrollButtons } from "@shared/desktop/components/ScrollButtons.jsx";
import {
  MOD_LATEST,
  MOD_LATEST_PART,
  page as pageCls,
  PILL_BTN,
} from "@shared/desktop/lib/cls.js";

function PageIcon({ version }) {
  return (
    <img
      className="w-13 h-13 object-contain rounded-lg"
      src={version.icon}
      alt=""
    />
  );
}

export default function App() {
  const [page, setPage] = useState(startupPage);
  const [update, setUpdate] = useState(null);
  const contentRef = useRef(null);
  const version =
    versions.find((v) => v.id === page) ||
    EXTRA_PAGES.find((p) => p.id === page) ||
    null;

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
    fetchLatestRelease()
      .then(({ version: latest, notes }) => {
        if (compareVersions(APP_VERSION, latest) < 0) {
          setUpdate({ status: "update", latest, notes });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <NavContext.Provider value={setPage}>
      <div className="flex h-screen">
        <Sidebar
          page={page}
          setPage={setPage}
          footer={<SettingsButton onCheckUpdate={() => checkUpdate(true)} />}
        />
        {update && (
          <UpdateModal update={update} onClose={() => setUpdate(null)} />
        )}
        <main
          className="flex-1 overflow-y-auto bg-bg2 bg-[radial-gradient(1100px_500px_at_70%_-10%,color-mix(in_srgb,goldenrod_7%,transparent),transparent)]"
          key={page}
          ref={contentRef}
        >
          {version ? (
            <div
              className={`${pageCls(false)} [&>header+section]:mt-0`}
              style={{ "--accent": "goldenrod" }}
            >
              <header className="flex items-center flex-wrap gap-4 pb-4 mb-5 border-b-2 border-line">
                <div className="flex">
                  <PageIcon version={version} />
                </div>
                <div>
                  <h1 className="font-roman font-normal tracking-[1.5px] uppercase text-[32px] text-gold-bright">
                    {version.name}
                  </h1>
                  <div className="text-muted font-roman tracking-[1px]">
                    {version.subtitle}
                  </div>
                </div>
                <div className="ml-auto flex flex-wrap items-center justify-end gap-2 max-w-115">
                  {version.badge ? (
                    <div className={MOD_LATEST} title={version.badge.title}>
                      <span className={MOD_LATEST_PART}>
                        {version.badge.text}
                      </span>
                    </div>
                  ) : (
                    <ModLatest id={version.id} />
                  )}
                  {CHANGELOG_URLS[version.id] && (
                    <a
                      className={PILL_BTN}
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
            <Home setPage={setPage} />
          )}
        </main>
        <ScrollButtons scrollRef={contentRef} page={page} />
      </div>
    </NavContext.Provider>
  );
}
