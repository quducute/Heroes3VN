import { useCallback, useEffect, useState } from "react";
import { Share2, Copy, Check } from "lucide-react";
import { Modal } from "@shared/desktop/components/ui.jsx";
import { btn, btnGhost, PILL_BTN } from "@shared/desktop/lib/cls.js";

function ShareModal({ name, onClose }) {
  const url = location.origin + location.pathname;
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return undefined;
    const t = setTimeout(onClose, 900);
    return () => clearTimeout(t);
  }, [copied, onClose]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      document.getElementById("share-url")?.select();
    }
  };

  return (
    <Modal title="Chia sẻ" icon={<Share2 size={18} />} onClose={onClose}>
      <p className="mt-1 text-[14px] text-fg leading-[1.55] [&_b]:text-gold-bright">
        Copy link trang <b>{name}</b> để gửi cho bạn bè?
      </p>
      <input
        id="share-url"
        className="mt-3 w-full px-3 py-2 rounded-lg border border-line bg-bg2 text-[13px] text-muted text-center outline-none focus:border-gold"
        readOnly
        value={url}
        aria-label="Link chia sẻ"
        onFocus={(e) => e.target.select()}
      />
      <div className="flex justify-center gap-2.5 mt-4.5">
        <button
          type="button"
          className={btn("min-w-30 px-4 py-2 font-[inherit]", copied)}
          onClick={copy}
        >
          {copied ? "Đã copy" : "Copy link"}
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
        <button
          type="button"
          className={btnGhost("min-w-30 px-4 py-2 font-[inherit]")}
          onClick={onClose}
        >
          Huỷ
        </button>
      </div>
    </Modal>
  );
}

export function ShareButton({ name }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  return (
    <>
      <button type="button" className={PILL_BTN} onClick={() => setOpen(true)}>
        <Share2 size={14} /> Chia sẻ
      </button>
      {open && <ShareModal name={name} onClose={close} />}
    </>
  );
}
