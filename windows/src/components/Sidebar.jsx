import { useState } from "react";
import { Heart, Download, Settings } from "lucide-react";
import { versions } from "../data/versions.js";
import { APP_VERSION } from "../lib/version.js";
import brandLogo from "../assets/images/logo.webp";
import { VN as VietnamFlag } from "country-flag-icons/react/3x2";
import { LATEST_RELEASE_URL } from "../lib/update.js";
import { IS_WEB } from "../lib/platform.js";
import { upcomingPage } from "../pages/upcoming.jsx";
import { webPage } from "../pages/web.jsx";
import { seriesPage } from "../pages/series.jsx";
import { faqPage } from "../pages/faq.jsx";
import { cheatPage } from "../pages/cheat.jsx";
import { keybindsPage } from "../pages/keybinds.jsx";
import { boardgamePage } from "../pages/boardgame.jsx";
import { DonateModal } from "./DonateModal.jsx";
import { SettingsModal } from "./SettingsModal.jsx";

export function Sidebar({ page, setPage, onCheckUpdate }) {
  const [showDonate, setShowDonate] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  return (
    <aside className="sidebar">
      <button
        type="button"
        className={"brand" + (page === "home" ? " active" : "")}
        onClick={() => setPage("home")}
      >
        <img className="brand-logo" src={brandLogo} alt="Heroes 3 VN" />
        <span className="brand-meta">
          <VietnamFlag className="vn-flag" title="Việt Nam" />{" "}
          <span className="brand-version">v{APP_VERSION}</span>
        </span>
      </button>
      <nav>
        <div className="nav-group">Các phiên bản Heroes 3</div>
        {versions.map((v) => (
          <button
            key={v.id}
            type="button"
            className={"nav-item" + (page === v.id ? " active" : "")}
            style={{ "--accent": v.accent }}
            onClick={() => setPage(v.id)}
          >
            <span className="nav-icon">
              <img src={v.icon} alt="" />
            </span>
            <span>
              <span className="nav-name">{v.name}</span>
              <span className="nav-sub">{v.subtitle}</span>
            </span>
          </button>
        ))}
        <button
          type="button"
          className={"nav-item" + (page === upcomingPage.id ? " active" : "")}
          style={{ "--accent": upcomingPage.accent }}
          onClick={() => setPage(upcomingPage.id)}
        >
          <span className="nav-icon">
            <img src={upcomingPage.icon} alt="" />
          </span>
          <span>
            <span className="nav-name">{upcomingPage.name}</span>
            <span className="nav-sub">{upcomingPage.subtitle}</span>
          </span>
        </button>
        <div className="nav-group">Khác</div>
        <button
          type="button"
          className={"nav-item" + (page === webPage.id ? " active" : "")}
          style={{ "--accent": webPage.accent }}
          onClick={() => setPage(webPage.id)}
        >
          <span className="nav-icon">
            <img src={webPage.icon} alt="" />
          </span>
          <span>
            <span className="nav-name">{webPage.name}</span>
            <span className="nav-sub">{webPage.subtitle}</span>
          </span>
        </button>
        <button
          type="button"
          className={"nav-item" + (page === keybindsPage.id ? " active" : "")}
          style={{ "--accent": keybindsPage.accent }}
          onClick={() => setPage(keybindsPage.id)}
        >
          <span className="nav-icon">
            <img src={keybindsPage.icon} alt="" />
          </span>
          <span>
            <span className="nav-name">{keybindsPage.name}</span>
            <span className="nav-sub">{keybindsPage.subtitle}</span>
          </span>
        </button>
        <button
          type="button"
          className={"nav-item" + (page === cheatPage.id ? " active" : "")}
          style={{ "--accent": cheatPage.accent }}
          onClick={() => setPage(cheatPage.id)}
        >
          <span className="nav-icon">
            <img src={cheatPage.icon} alt="" />
          </span>
          <span>
            <span className="nav-name">{cheatPage.name}</span>
            <span className="nav-sub">{cheatPage.subtitle}</span>
          </span>
        </button>
        <button
          type="button"
          className={"nav-item" + (page === faqPage.id ? " active" : "")}
          style={{ "--accent": faqPage.accent }}
          onClick={() => setPage(faqPage.id)}
        >
          <span className="nav-icon">
            <img src={faqPage.icon} alt="" />
          </span>
          <span>
            <span className="nav-name">{faqPage.name}</span>
            <span className="nav-sub">{faqPage.subtitle}</span>
          </span>
        </button>
        <button
          type="button"
          className={"nav-item" + (page === seriesPage.id ? " active" : "")}
          style={{ "--accent": seriesPage.accent }}
          onClick={() => setPage(seriesPage.id)}
        >
          <span className="nav-icon">
            <img src={seriesPage.icon} alt="" />
          </span>
          <span>
            <span className="nav-name">{seriesPage.name}</span>
            <span className="nav-sub">{seriesPage.subtitle}</span>
          </span>
        </button>
        <button
          type="button"
          className={"nav-item" + (page === boardgamePage.id ? " active" : "")}
          style={{ "--accent": boardgamePage.accent }}
          onClick={() => setPage(boardgamePage.id)}
        >
          <span className="nav-icon">
            <img src={boardgamePage.icon} alt="" />
          </span>
          <span>
            <span className="nav-name">{boardgamePage.name}</span>
            <span className="nav-sub">{boardgamePage.subtitle}</span>
          </span>
        </button>
      </nav>
      <div className="sidebar-footer">
        <button
          type="button"
          className="side-btn"
          onClick={() => setShowDonate(true)}
        >
          <Heart size={16} /> Donate VietinBank
        </button>
        {IS_WEB ? (
          <a
            className="side-btn"
            href={LATEST_RELEASE_URL}
            target="_blank"
            rel="noreferrer"
          >
            <Download size={16} /> Tải app Heroes 3 VN
          </a>
        ) : (
          <button
            type="button"
            className="side-btn"
            onClick={() => setShowSettings(true)}
          >
            <Settings size={16} /> Settings
          </button>
        )}
      </div>
      {showDonate && <DonateModal onClose={() => setShowDonate(false)} />}
      {showSettings && (
        <SettingsModal
          onClose={() => setShowSettings(false)}
          onCheckUpdate={onCheckUpdate}
        />
      )}
    </aside>
  );
}
