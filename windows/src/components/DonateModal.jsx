import { useRef, useState } from "react";
import { Heart, PartyPopper, ExternalLink } from "lucide-react";
import { Modal, ConfirmModal } from "./ui.jsx";
import donateQr from "../assets/images/donate.webp";
import { SECRET_URL } from "../data/social.js";

export function DonateModal({ onClose }) {
  const tapsRef = useRef(0);
  const [showSecret, setShowSecret] = useState(false);
  const onQrTap = () => {
    tapsRef.current += 1;
    if (tapsRef.current >= 3) {
      tapsRef.current = 0;
      setShowSecret(true);
    }
  };
  return (
    <Modal
      title="Donate - VietinBank"
      icon={<Heart size={18} />}
      onClose={onClose}
    >
      <button
        type="button"
        className="donate-qr-btn"
        onClick={onQrTap}
        aria-label="QR Donate VietinBank"
      >
        <img className="donate-qr" src={donateQr} alt="QR Donate VietinBank" />
      </button>
      <p className="donate-note">Quét mã QR bằng app ngân hàng để ủng hộ em.</p>
      <p className="donate-thanks">Cảm ơn các bác đã sử dụng Heroes 3 VN!</p>
      {showSecret && (
        <ConfirmModal
          title="Thông báo"
          icon={<PartyPopper size={18} />}
          confirmText="Xem thử"
          cancelText="Thôi"
          confirmIcon={<ExternalLink size={14} />}
          onConfirm={() =>
            window.open(SECRET_URL, "_blank", "noopener,noreferrer")
          }
          onClose={() => setShowSecret(false)}
        >
          Chúc mừng, bác vừa khám phá ra tính năng ẩn của tool!
        </ConfirmModal>
      )}
    </Modal>
  );
}
