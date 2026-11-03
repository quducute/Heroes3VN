import { useState, useEffect } from "react";
import {
  Settings,
  RefreshCw,
  Monitor,
  Check,
  House,
  SlidersHorizontal,
  Trash2,
  RotateCcw,
  Type,
} from "lucide-react";
import { Modal } from "./ui.jsx";
import { usePrefs } from "./Prefs.jsx";
import { APP_VERSION } from "@app/lib/version.js";
import { clearModCache } from "@app/lib/update.js";
import { PAGE_OPTIONS } from "../pages/index.js";
import { PAGE_IDS } from "@app/lib/routing.js";
import { formatBytes } from "../../lib/format.js";
import { btn, cx } from "../lib/cls.js";
import { FONT_SIZES, SETTINGS as S } from "../../data/settings.js";

const ITEM = "px-3.5 py-3 border border-line rounded-lg bg-black/20";
const LABEL =
  "flex items-center gap-2 text-[14px] font-bold text-gold-bright mb-2.5";
const SELECT =
  "w-full h-9.5 px-2.5 text-[13.5px] text-fg bg-panel2 border border-line rounded-md cursor-pointer focus:outline-none focus:border-gold [&_option:disabled]:text-muted";
const ROW_BTN = "disabled:opacity-50 disabled:cursor-default";

const WINDOW_SIZE_OPTIONS = [
  { value: "1280x720", label: "1280 × 720 (HD, mặc định)" },
  { value: "1366x768", label: "1366 × 768" },
  { value: "1600x900", label: "1600 × 900 (HD+)" },
  { value: "1920x1080", label: "1920 × 1080 (Full HD)" },
  { value: "maximized", label: "Phóng to toàn màn hình" },
].map((o) => {
  const m = /^(\d+)x(\d+)$/.exec(o.value);
  return m ? { ...o, width: Number(m[1]), height: Number(m[2]) } : o;
});

function Status({ done, children }) {
  return (
    <div className="mt-2 text-[12.5px] leading-normal text-muted">
      {done ? (
        <span className="inline-flex items-center gap-1.25 text-ok">
          <Check size={13} /> {done}
        </span>
      ) : (
        children
      )}
    </div>
  );
}

export function SettingsModal({ onClose, onCheckUpdate }) {
  const bridge = window.h3vn;
  const desktop = Boolean(bridge?.getSettings);
  const prefs = usePrefs();
  const [fontSaved, setFontSaved] = useState(false);
  const [windowSize, setWindowSize] = useState(null);
  const [workArea, setWorkArea] = useState(null);
  const [sizeSaved, setSizeSaved] = useState(false);
  const [defaultPage, setDefaultPage] = useState(null);
  const [pageSaved, setPageSaved] = useState(false);
  const [resetDone, setResetDone] = useState(false);
  const [cacheSize, setCacheSize] = useState(null);
  const [cacheStatus, setCacheStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!bridge?.getSettings) return;
    bridge
      .getSettings()
      .then((res) => {
        setWindowSize(res.settings.windowSize);
        setDefaultPage(
          PAGE_IDS.has(res.settings.defaultPage)
            ? res.settings.defaultPage
            : "home",
        );
        setWorkArea(res.workArea);
      })
      .catch(() => setError(S.readError));
    bridge
      .getCacheSize()
      .then(setCacheSize)
      .catch(() => {});
  }, [bridge]);

  const onSizeChange = async (e) => {
    const { value } = e.target;
    setWindowSize(value);
    setSizeSaved(false);
    setResetDone(false);
    try {
      await bridge.setWindowSize(value);
      setSizeSaved(true);
    } catch {
      setError(S.windowSizeError);
    }
  };

  const onPageChange = async (e) => {
    const { value } = e.target;
    setDefaultPage(value);
    setPageSaved(false);
    setResetDone(false);
    try {
      await bridge.setDefaultPage(value);
      setPageSaved(true);
    } catch {
      setError(S.defaultPageError);
    }
  };

  const onFontChange = async (e) => {
    setFontSaved(false);
    setResetDone(false);
    try {
      await prefs.setFontSize(e.target.value);
      setFontSaved(true);
    } catch {
      setError(S.fontSizeError);
    }
  };

  const onReset = async () => {
    try {
      const settings = await bridge.resetSettings();
      setWindowSize(settings.windowSize);
      setDefaultPage(settings.defaultPage);
      prefs.resetFontSize();
      setSizeSaved(false);
      setPageSaved(false);
      setFontSaved(false);
      setCacheStatus(null);
      setResetDone(true);
    } catch {
      setError(S.resetError);
    }
  };

  const onClearCache = async () => {
    setResetDone(false);
    setCacheStatus("clearing");
    try {
      const freed = await bridge.clearCache();
      clearModCache();
      setCacheSize(0);
      setCacheStatus(S.cacheCleared(formatBytes(freed)));
    } catch {
      setCacheStatus(null);
      setError(S.cacheError);
    }
  };

  return (
    <Modal
      title={S.title}
      icon={<Settings size={18} />}
      onClose={onClose}
      wide={desktop}
    >
      <div
        className={
          desktop
            ? "grid grid-cols-2 gap-3.5"
            : "flex flex-col gap-3.5 w-100 max-w-full text-left"
        }
      >
        {onCheckUpdate && (
          <div className={ITEM}>
            <div className={LABEL}>
              <RefreshCw size={15} /> {S.updateTitle}
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-[13.5px] text-fg whitespace-nowrap">
                {S.currentVersion}
                <b>v{APP_VERSION}</b>
              </span>
              <button
                type="button"
                className={btn(cx("size-8.5 min-w-0 p-0", ROW_BTN))}
                title={S.checkUpdate}
                aria-label={S.checkUpdate}
                onClick={onCheckUpdate}
              >
                <RefreshCw size={16} />
              </button>
            </div>
            <Status>{S.autoCheck}</Status>
          </div>
        )}
        {desktop && (
          <>
            <div className={ITEM}>
              <label className={LABEL} htmlFor="settings-default-page">
                <House size={15} /> {S.defaultPageTitle}
              </label>
              <select
                id="settings-default-page"
                className={SELECT}
                value={defaultPage ?? ""}
                disabled={defaultPage === null}
                onChange={onPageChange}
              >
                {PAGE_OPTIONS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <Status done={pageSaved && S.defaultPageSaved}>
                {S.defaultPageHint}
              </Status>
            </div>
            <div className={ITEM}>
              <label className={LABEL} htmlFor="settings-window-size">
                <Monitor size={15} /> {S.windowSizeTitle}
              </label>
              <select
                id="settings-window-size"
                className={SELECT}
                value={windowSize ?? ""}
                disabled={windowSize === null}
                onChange={onSizeChange}
              >
                {WINDOW_SIZE_OPTIONS.map((o) => {
                  const tooBig =
                    workArea &&
                    o.width &&
                    (o.width > workArea.width || o.height > workArea.height);
                  return (
                    <option key={o.value} value={o.value} disabled={tooBig}>
                      {o.label}
                      {tooBig ? " - lớn hơn màn hình" : ""}
                    </option>
                  );
                })}
              </select>
              <Status done={sizeSaved && S.windowSizeSaved}>
                {S.windowSizeHint}
              </Status>
            </div>
          </>
        )}
        <div className={ITEM}>
          <label className={LABEL} htmlFor="settings-font-size">
            <Type size={15} /> {S.fontSizeTitle}
          </label>
          <select
            id="settings-font-size"
            className={SELECT}
            value={prefs.fontSize}
            onChange={onFontChange}
          >
            {FONT_SIZES.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
          <Status done={fontSaved && S.fontSizeSaved}>{S.fontSizeHint}</Status>
        </div>
        {desktop && (
          <div className={cx(ITEM, "col-span-full")}>
            <div className={LABEL}>
              <SlidersHorizontal size={15} /> {S.otherTitle}
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-[13.5px] text-fg [&_b]:whitespace-nowrap">
                {S.cache}
                <b>{cacheSize === null ? "..." : formatBytes(cacheSize)}</b>
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  className={btn(cx("min-w-0 px-3 py-2", ROW_BTN))}
                  disabled={cacheStatus === "clearing"}
                  onClick={onClearCache}
                >
                  <Trash2 size={14} /> {S.clearCache}
                </button>
                <button
                  type="button"
                  className={btn(cx("min-w-0 px-3 py-2", ROW_BTN))}
                  onClick={onReset}
                >
                  <RotateCcw size={14} /> {S.reset}
                </button>
              </div>
            </div>
            <Status
              done={
                resetDone
                  ? S.resetDone
                  : cacheStatus !== "clearing" && cacheStatus
              }
            >
              {S.cacheHint}
              <br />
              {S.resetHint}
            </Status>
          </div>
        )}
        {error && (
          <p className="col-span-full text-[13px] text-error">{error}</p>
        )}
      </div>
    </Modal>
  );
}
