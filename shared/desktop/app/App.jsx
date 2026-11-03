import { useState, useRef, useCallback, useEffect } from "react";
import { versions } from "@shared/data/versions.js";
import { NavContext } from "@shared/desktop/components/ui.jsx";
import { APP_VERSION } from "./lib/version.js";
import { fetchLatestRelease, compareVersions } from "./lib/update.js";
import { EXTRA_PAGES } from "@shared/desktop/pages/index.js";
import { startupPage } from "./lib/routing.js";
import { UpdateModal } from "@shared/desktop/components/UpdateModal.jsx";
import { SettingsButton } from "@shared/desktop/components/SettingsButton.jsx";
import { Sidebar } from "@shared/desktop/components/Sidebar.jsx";
import { Home } from "@shared/desktop/pages/home.jsx";
import { ScrollButtons } from "@shared/desktop/components/ScrollButtons.jsx";
import { VersionPage } from "@shared/desktop/components/VersionPage.jsx";

async function latestUpdate() {
  const { version: latest, notes } = await fetchLatestRelease();
  return compareVersions(APP_VERSION, latest) < 0
    ? { status: "update", latest, notes }
    : { status: "latest", latest };
}

export default function App() {
  const [page, setPage] = useState(startupPage);
  const [update, setUpdate] = useState(null);
  const contentRef = useRef(null);
  const version =
    versions.find((v) => v.id === page) ||
    EXTRA_PAGES.find((p) => p.id === page) ||
    null;

  const checkUpdate = useCallback(async () => {
    setUpdate({ status: "checking" });
    try {
      setUpdate(await latestUpdate());
    } catch {
      setUpdate({ status: "error" });
    }
  }, []);

  useEffect(() => {
    latestUpdate()
      .then((next) => next.status === "update" && setUpdate(next))
      .catch(() => {});
  }, []);

  return (
    <NavContext.Provider value={setPage}>
      <div className="flex h-screen">
        <Sidebar
          page={page}
          setPage={setPage}
          footer={<SettingsButton onCheckUpdate={checkUpdate} />}
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
            <VersionPage version={version} />
          ) : (
            <Home setPage={setPage} />
          )}
        </main>
        <ScrollButtons scrollRef={contentRef} page={page} />
      </div>
    </NavContext.Provider>
  );
}
