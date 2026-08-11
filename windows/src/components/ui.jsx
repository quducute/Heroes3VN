import React, { useState, useEffect, useRef } from "react";
import { Info, ExternalLink, Copy, Check, X, ChevronDown } from "lucide-react";

export function Modal({ title, icon, onClose, children }) {
  const ref = useRef(null);
  const bodyRef = useRef(null);
  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return undefined;
    if (!dlg.open) dlg.showModal();
    const onCancel = () => onClose();
    const onClick = (e) => {
      const body = bodyRef.current;
      if (body && !body.contains(e.target)) onClose();
    };
    dlg.addEventListener("cancel", onCancel);
    dlg.addEventListener("click", onClick);
    return () => {
      dlg.removeEventListener("cancel", onCancel);
      dlg.removeEventListener("click", onClick);
    };
  }, [onClose]);
  return (
    <dialog className="modal" ref={ref} aria-label={title}>
      <div className="modal-body" ref={bodyRef}>
        <button
          type="button"
          className="donate-close"
          onClick={onClose}
          aria-label="Đóng"
        >
          <X size={18} />
        </button>
        <h2 className="donate-title">
          {icon} {title}
        </h2>
        {children}
      </div>
    </dialog>
  );
}

export function ConfirmModal({
  title = "Xác nhận",
  icon,
  confirmText = "Đồng ý",
  cancelText = "Huỷ",
  confirmIcon,
  onConfirm,
  onClose,
  children,
}) {
  const confirm = () => {
    onConfirm?.();
    onClose();
  };
  return (
    <Modal title={title} icon={icon} onClose={onClose}>
      <div className="confirm-text">{children}</div>
      <div className="confirm-actions">
        <button type="button" className="btn" onClick={confirm}>
          {confirmText}
          {confirmIcon}
        </button>
        <button type="button" className="btn btn-ghost" onClick={onClose}>
          {cancelText}
        </button>
      </div>
    </Modal>
  );
}

export function Quote({ children }) {
  return <blockquote className="quote">{children}</blockquote>;
}

export function Note({ title = "Lưu ý", children }) {
  return (
    <div className="note">
      <div className="note-title">
        <Info size={16} /> {title}
      </div>
      <div>{children}</div>
    </div>
  );
}

export function Formula({ children }) {
  return <div className="formula">{children}</div>;
}

export function Faq({ items }) {
  return (
    <div className="faq">
      {items.map((it) => (
        <details className="faq-item" name="faq" key={it.q}>
          <summary className="faq-q">
            <span>{it.q}</span>
            <ChevronDown className="faq-chevron" size={18} />
          </summary>
          <div className="faq-a">{it.a}</div>
        </details>
      ))}
    </div>
  );
}

function CheatCode({ code }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };
  return (
    <button
      type="button"
      className={"cheat-code" + (copied ? " copied" : "")}
      onClick={copy}
      title={copied ? "Đã chép" : "Bấm để chép mã"}
    >
      <code>{code}</code>
      {copied ? (
        <Check className="cheat-copy-icon" size={13} />
      ) : (
        <Copy className="cheat-copy-icon" size={13} />
      )}
    </button>
  );
}

function CheatCell({ value }) {
  if (!value) return <span className="cheat-none">—</span>;
  const { code, note } = typeof value === "string" ? { code: value } : value;
  return (
    <>
      <CheatCode code={code} />
      {note && <span className="cheat-cell-note">{note}</span>}
    </>
  );
}

export function CheatTable({ rows }) {
  return (
    <div className="cheat-wrap">
      <table className="cheat-table">
        <thead>
          <tr>
            <th>Complete/SoD, HotA, Chronicles</th>
            <th>ERA/WoG</th>
            <th>VCMI</th>
            <th>Tác dụng</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.effect}>
              <td>
                <CheatCell value={r.complete} />
              </td>
              <td>
                <CheatCell value={r.wog} />
              </td>
              <td>
                <CheatCell value={r.vcmi} />
              </td>
              <td className="cheat-effect">{r.effect}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function KeyCombo({ keys }) {
  const parts = keys.split(/( [+/] )/);
  let offset = 0;
  return (
    <span className="kbd-combo">
      {parts.map((p) => {
        const key = `${offset}-${p}`;
        offset += p.length;
        const sep = p.trim();
        if (sep === "+" || sep === "/")
          return (
            <span key={key} className="kbd-sep">
              {sep}
            </span>
          );
        return (
          <kbd key={key} className="kbd">
            {p}
          </kbd>
        );
      })}
    </span>
  );
}

export function KeybindsTable({ groups }) {
  return (
    <div className="keybinds-wrap">
      <table className="keybinds-table">
        <thead>
          <tr>
            <th>Phím</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((g) => (
            <React.Fragment key={g.section}>
              <tr className="keybinds-group">
                <th colSpan={2}>{g.section}</th>
              </tr>
              {g.rows.map(([keys, fn]) => (
                <tr key={keys + fn}>
                  <td className="keybinds-keys">
                    <KeyCombo keys={keys} />
                  </td>
                  <td className="keybinds-fn">{fn}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SysReq({ items }) {
  return (
    <div className="sysreq">
      {items.map((it) => (
        <React.Fragment key={it.label}>
          <span className="sysreq-label">{it.label}</span>
          <span className="sysreq-value">{it.value}</span>
        </React.Fragment>
      ))}
    </div>
  );
}

export function Section({ title, children }) {
  return (
    <section className="section">
      <h2 className="section-title">{title}</h2>
      {children}
    </section>
  );
}

function CopyButton({ url }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };
  return (
    <button
      type="button"
      className={"btn btn-copy" + (copied ? " copied" : "")}
      onClick={copy}
      title="Copy link"
      aria-label="Copy link"
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  );
}

export function LinkRow({ label, url, desc, buttonText = "Mở link" }) {
  return (
    <div className="link-row">
      <div className="link-info">
        <div className="link-label">{label}</div>
        {desc && <div className="link-desc">{desc}</div>}
        <div className="link-url">{url}</div>
      </div>
      <CopyButton url={url} />
      <a className="btn" href={url} target="_blank" rel="noreferrer">
        {buttonText} <ExternalLink size={14} />
      </a>
    </div>
  );
}

export function Steps({ title, items }) {
  return (
    <div className="steps">
      {title && <div className="steps-title">{title}</div>}
      <ol>{React.Children.toArray(items.map((it) => <li>{it}</li>))}</ol>
    </div>
  );
}

export function A({ href, children }) {
  return (
    <a className="inline-link" href={href} target="_blank" rel="noreferrer">
      {children || href}
    </a>
  );
}

export function Screenshot({ src, caption }) {
  const [zoom, setZoom] = useState(false);
  return (
    <figure className="shot">
      <button
        type="button"
        className="shot-zoom"
        onClick={() => setZoom(true)}
        aria-label="Phóng to ảnh"
      >
        <img src={src} alt={caption} />
      </button>
      {caption && <figcaption>{caption}</figcaption>}
      {zoom && (
        <button
          type="button"
          className="lightbox"
          onClick={() => setZoom(false)}
          aria-label="Đóng ảnh phóng to"
        >
          <img src={src} alt={caption} />
        </button>
      )}
    </figure>
  );
}
