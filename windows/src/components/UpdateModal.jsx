import { RefreshCw, Download, ThumbsUp, ExternalLink } from "lucide-react";
import { Modal } from "./ui.jsx";
import { APP_VERSION } from "../lib/version.js";
import { LATEST_RELEASE_URL, REPO_URL } from "../lib/update.js";

export function UpdateModal({ update, onClose }) {
  return (
    <Modal
      title="Kiểm tra cập nhật"
      icon={<RefreshCw size={18} />}
      onClose={onClose}
    >
      {update.status === "checking" && (
        <p className="donate-note">Đang kiểm tra phiên bản mới nhất...</p>
      )}
      {update.status === "update" && (
        <>
          <div className="update-versions">
            <div className="update-version-row">
              <span className="update-version-label">Phiên bản đang dùng</span>
              <span className="update-version-value">v{APP_VERSION}</span>
            </div>
            <div className="update-version-row">
              <span className="update-version-label">Phiên bản mới nhất</span>
              <span className="update-version-value update-version-new">
                v{update.latest}
              </span>
            </div>
          </div>
          {update.notes && (
            <div className="update-changelog">
              <div className="update-changelog-title">
                Thay đổi v{update.latest}:
              </div>
              <div className="update-changelog-body">{update.notes}</div>
            </div>
          )}
          <div className="update-actions">
            <a
              className="btn"
              href={LATEST_RELEASE_URL}
              target="_blank"
              rel="noreferrer"
            >
              <Download size={14} /> Tải bản mới
            </a>
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Để sau
            </button>
          </div>
        </>
      )}
      {update.status === "latest" && (
        <>
          <p className="donate-note">
            Bác đang dùng phiên bản mới nhất (<b>v{APP_VERSION}</b>).{" "}
            <ThumbsUp size={14} />
          </p>
          <div className="update-actions">
            <a className="btn" href={REPO_URL} target="_blank" rel="noreferrer">
              <ExternalLink size={14} /> Trang GitHub của tool
            </a>
          </div>
        </>
      )}
      {update.status === "error" && (
        <p className="donate-note">
          Không kiểm tra được cập nhật. Hãy kiểm tra kết nối mạng rồi thử lại.
        </p>
      )}
    </Modal>
  );
}
