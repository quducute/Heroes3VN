import { RefreshCw, Download, ThumbsUp, ExternalLink } from "lucide-react";
import { Modal } from "@shared/desktop/components/ui.jsx";
import { APP_VERSION } from "../lib/version.js";
import { LATEST_RELEASE_URL, REPO_URL } from "../lib/update.js";
import { btn, btnGhost, cx } from "@shared/desktop/lib/cls.js";

const NOTE =
  "mt-3 text-[13.5px] text-muted [&_svg]:align-[-2px] [&_svg]:text-gold-bright";
const ROW =
  "flex items-center justify-between gap-3 px-3.5 py-2.25 border border-line rounded-lg bg-black/20";
const VALUE = "font-bold text-[15px]";
const ACTION = "min-w-32.5 px-4 py-2 font-[inherit]";

export function UpdateModal({ update, onClose }) {
  return (
    <Modal
      title="Kiểm tra cập nhật"
      icon={<RefreshCw size={18} />}
      onClose={onClose}
    >
      {update.status === "checking" && (
        <p className={NOTE}>Đang kiểm tra phiên bản mới nhất...</p>
      )}
      {update.status === "update" && (
        <>
          <div className="flex flex-col gap-2 mt-1">
            <div className={ROW}>
              <span className="text-muted text-[13px]">
                Phiên bản đang dùng
              </span>
              <span className={cx(VALUE, "text-fg")}>v{APP_VERSION}</span>
            </div>
            <div className={ROW}>
              <span className="text-muted text-[13px]">Phiên bản mới nhất</span>
              <span className={cx(VALUE, "text-gold-bright")}>
                v{update.latest}
              </span>
            </div>
          </div>
          {update.notes && (
            <div className="mt-3 px-3 py-2.5 text-left border border-line rounded-lg bg-black/25 max-h-50 overflow-y-auto">
              <div className="text-[13px] font-bold text-gold-bright mb-1.5">
                Thay đổi v{update.latest}:
              </div>
              <div className="whitespace-pre-wrap text-[12.5px] leading-[1.55] text-fg">
                {update.notes}
              </div>
            </div>
          )}
          <div className="flex justify-center gap-2.5 mt-4">
            <a
              className={btn(ACTION)}
              href={LATEST_RELEASE_URL}
              target="_blank"
              rel="noreferrer"
            >
              <Download size={14} /> Tải bản mới
            </a>
            <button
              type="button"
              className={btnGhost(ACTION)}
              onClick={onClose}
            >
              Để sau
            </button>
          </div>
        </>
      )}
      {update.status === "latest" && (
        <>
          <p className={NOTE}>
            Bác đang dùng phiên bản mới nhất (<b>v{APP_VERSION}</b>).{" "}
            <ThumbsUp size={14} />
          </p>
          <div className="flex justify-center gap-2.5 mt-4">
            <a
              className={btn(ACTION)}
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
            >
              <ExternalLink size={14} /> Trang GitHub của tool
            </a>
          </div>
        </>
      )}
      {update.status === "error" && (
        <p className={NOTE}>
          Không kiểm tra được cập nhật. Hãy kiểm tra kết nối mạng rồi thử lại.
        </p>
      )}
    </Modal>
  );
}
