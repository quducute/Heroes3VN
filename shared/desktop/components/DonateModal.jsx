import { useRef, useState } from "react";
import { Heart, PartyPopper, ExternalLink } from "lucide-react";
import { Modal, ConfirmModal } from "./ui.jsx";
import donateQr from "@shared/assets/images/donate.webp";
import { SECRET_URL } from "../../data/social.js";

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
        className="block w-75 max-w-full mx-auto p-0 border-none bg-transparent leading-0 cursor-default"
        onClick={onQrTap}
        aria-label="QR Donate VietinBank"
      >
        <img
          className="w-64 max-w-full rounded-lg block mx-auto"
          src={donateQr}
          alt="QR Donate VietinBank"
        />
      </button>
      <p className="mt-3 text-[13.5px] font-semibold text-gold-bright">
        Cảm ơn các bác đã sử dụng Heroes 3 VN!
      </p>
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
