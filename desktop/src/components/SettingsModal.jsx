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
} from "lucide-react";
import { Modal } from "@shared/desktop/components/ui.jsx";
import { APP_VERSION } from "../lib/version.js";
import { clearModCache } from "../lib/update.js";
import { PAGE_OPTIONS } from "@shared/desktop/pages/index.js";
import { PAGE_IDS } from "../lib/routing.js";
import { formatBytes } from "../lib/format.js";
import { btn, cx } from "@shared/desktop/lib/cls.js";

const ITEM = "px-3.5 py-3 border border-line rounded-lg bg-black/20";
const LABEL =
  "flex items-center gap-2 text-[14px] font-bold text-gold-bright mb-2.5";
const SELECT =
  "w-full h-9.5 px-2.5 font-[inherit] text-[13.5px] text-fg bg-panel2 border border-line rounded-md cursor-pointer focus:outline-none focus:border-gold [&_option:disabled]:text-muted";
const ROW_BTN = "font-[inherit] disabled:opacity-50 disabled:cursor-default";

const WINDOW_SIZE_OPTIONS = [
  {
    value: "1280x720",
    label: "1280 × 720 (HD, mặc định)",
    width: 1280,
    height: 720,
  },
  { value: "1366x768", label: "1366 × 768", width: 1366, height: 768 },
  { value: "1600x900", label: "1600 × 900 (HD+)", width: 1600, height: 900 },
  {
    value: "1920x1080",
    label: "1920 × 1080 (Full HD)",
    width: 1920,
    height: 1080,
  },
  { value: "maximized", label: "Phóng to toàn màn hình" },
];

export function SettingsModal({ onClose, onCheckUpdate }) {
  const bridge = window.h3vn;
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
      .catch(() => setError("Không đọc được cài đặt."));
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
      setError("Không lưu được kích thước cửa sổ.");
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
      setError("Không lưu được tab mặc định.");
    }
  };

  const onReset = async () => {
    try {
      const settings = await bridge.resetSettings();
      setWindowSize(settings.windowSize);
      setDefaultPage(settings.defaultPage);
      setSizeSaved(false);
      setPageSaved(false);
      setCacheStatus(null);
      setResetDone(true);
    } catch {
      setError("Không đặt lại được cài đặt.");
    }
  };

  const onClearCache = async () => {
    setResetDone(false);
    setCacheStatus("clearing");
    try {
      const freed = await bridge.clearCache();
      clearModCache();
      setCacheSize(0);
      setCacheStatus(`Đã xoá ${formatBytes(freed)} cache.`);
    } catch {
      setCacheStatus(null);
      setError("Không xoá được cache.");
    }
  };

  return (
    <Modal title="Settings" icon={<Settings size={18} />} onClose={onClose}>
      <div className="flex flex-col gap-3.5 w-100 max-w-full text-left">
        <div className={ITEM}>
          <div className={LABEL}>
            <RefreshCw size={15} /> Cập nhật tool
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-[13.5px] text-fg [&_b]:whitespace-nowrap">
              Phiên bản đang dùng: <b>v{APP_VERSION}</b>
            </span>
            <button
              type="button"
              className={btn(cx("min-w-41.25 px-4 py-2", ROW_BTN))}
              onClick={onCheckUpdate}
            >
              <RefreshCw size={14} /> Check update
            </button>
          </div>
          <div className="mt-2 text-[12.5px] leading-normal text-muted">
            Tool cũng tự kiểm tra bản mới mỗi lần mở.
          </div>
        </div>
        {bridge?.getSettings ? (
          <>
            <div className={ITEM}>
              <label className={LABEL} htmlFor="settings-window-size">
                <Monitor size={15} /> Kích thước cửa sổ mặc định
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
              <div className="mt-2 text-[12.5px] leading-normal text-muted">
                {sizeSaved ? (
                  <span className="inline-flex items-center gap-1.25 text-ok">
                    <Check size={13} /> Đã lưu và áp dụng ngay.
                  </span>
                ) : (
                  "Áp dụng ngay và được nhớ cho những lần mở tool sau."
                )}
              </div>
            </div>
            <div className={ITEM}>
              <label className={LABEL} htmlFor="settings-default-page">
                <House size={15} /> Tab mặc định khi mở tool
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
              <div className="mt-2 text-[12.5px] leading-normal text-muted">
                {pageSaved ? (
                  <span className="inline-flex items-center gap-1.25 text-ok">
                    <Check size={13} /> Đã lưu, áp dụng từ lần mở tool sau.
                  </span>
                ) : (
                  "Tab hiển thị đầu tiên mỗi lần mở tool."
                )}
              </div>
            </div>
            <div className={ITEM}>
              <div className={LABEL}>
                <SlidersHorizontal size={15} /> Cài đặt khác
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-[13.5px] text-fg [&_b]:whitespace-nowrap">
                  Cache:{" "}
                  <b>{cacheSize === null ? "..." : formatBytes(cacheSize)}</b>
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className={btn(cx("min-w-0 px-3 py-2", ROW_BTN))}
                    disabled={cacheStatus === "clearing"}
                    onClick={onClearCache}
                  >
                    <Trash2 size={14} /> Xoá cache
                  </button>
                  <button
                    type="button"
                    className={btn(cx("min-w-0 px-3 py-2", ROW_BTN))}
                    onClick={onReset}
                  >
                    <RotateCcw size={14} /> Đặt lại
                  </button>
                </div>
              </div>
              <div className="mt-2 text-[12.5px] leading-normal text-muted">
                {resetDone || (cacheStatus && cacheStatus !== "clearing") ? (
                  <span className="inline-flex items-center gap-1.25 text-ok">
                    <Check size={13} />{" "}
                    {resetDone
                      ? "Đã đặt lại cài đặt về mặc định."
                      : cacheStatus}
                  </span>
                ) : (
                  <>
                    Xoá cache khi tool hiển thị sai version.
                    <br />
                    Đặt lại: cửa sổ 1280 × 720, tab mặc định là Trang chủ.
                  </>
                )}
              </div>
            </div>
          </>
        ) : null}
        {error && <p className="text-[13px] text-error">{error}</p>}
      </div>
    </Modal>
  );
}
