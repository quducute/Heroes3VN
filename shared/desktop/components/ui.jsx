import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import {
  Info,
  ExternalLink,
  Copy,
  Check,
  X,
  ChevronDown,
  Search,
  Link2,
  Pin,
  PinOff,
} from "lucide-react";
import {
  btn,
  btnGhost,
  cx,
  CHAPTER_LIST,
  DETAILS,
  DETAILS_CHEVRON,
  HINT,
  LINES,
  SECTION_TITLE,
  SHOT_GRID,
  SHOT_GRID_ICON,
  SHOT_GRID_STACK,
  SOURCE,
  SUMMARY,
} from "../lib/cls.js";
import {
  filterCheats,
  filterFaq,
  filterKeybinds,
  SEARCH_EMPTY,
} from "../../lib/search.js";
import { useCopy } from "../../lib/useCopy.js";
import { keyParts } from "../../lib/keys.js";
import { sectionAnchor } from "../../lib/anchor.js";
import {
  PINNED_SECTION,
  cheatPin,
  countPinned,
  keybindPin,
  pinFirst,
  pinKeybinds,
} from "../../lib/pins.js";
import { usePrefs } from "./Prefs.jsx";

export const mix = (name, amount) =>
  `color-mix(in srgb, ${name} ${Math.round(amount * 100)}%, black)`;

export function P({ children }) {
  return <div>{children}</div>;
}

export function B({ children }) {
  return <b>{children}</b>;
}

export function I({ children }) {
  return <i>{children}</i>;
}

export function Code({ children }) {
  return <code>{children}</code>;
}

export function Br() {
  return <br />;
}

export function Source({ children }) {
  return <p className={SOURCE}>{children}</p>;
}

export function TableTitle({ children }) {
  return <h2 className={SECTION_TITLE}>{children}</h2>;
}

export function Lines({ children }) {
  return <div className={LINES}>{children}</div>;
}

export function Hint({ children }) {
  return <p className={HINT}>{children}</p>;
}

export function ShotGrid({ children }) {
  return <div className={SHOT_GRID}>{children}</div>;
}

export function Shots({ stack, children }) {
  return <div className={stack ? SHOT_GRID_STACK : SHOT_GRID}>{children}</div>;
}

export function IconShot({ children }) {
  return <div className={SHOT_GRID_ICON}>{children}</div>;
}

export function ChapterList({ items }) {
  return (
    <ol className={CHAPTER_LIST}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ol>
  );
}

function useLatest(value) {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  });
  return ref;
}

export function Modal({ title, icon, onClose, wide, children }) {
  const ref = useRef(null);
  const bodyRef = useRef(null);
  const closeRef = useLatest(onClose);
  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return undefined;
    if (!dlg.open) dlg.showModal();
    const onCancel = () => closeRef.current();
    const onClick = (e) => {
      const body = bodyRef.current;
      if (body && !body.contains(e.target)) closeRef.current();
    };
    dlg.addEventListener("cancel", onCancel);
    dlg.addEventListener("click", onClick);
    return () => {
      dlg.removeEventListener("cancel", onCancel);
      dlg.removeEventListener("click", onClick);
    };
  }, [closeRef]);
  return createPortal(
    <dialog
      className="open:m-0 open:p-0 open:border-none open:bg-transparent open:w-screen open:max-w-[100vw] open:h-screen open:max-h-screen open:flex open:items-center open:justify-center backdrop:bg-black/75"
      ref={ref}
      aria-label={title}
    >
      <div
        className={cx(
          "relative bg-panel border border-gold rounded-xl px-7 py-6 shadow-[0_12px_48px_color-mix(in_srgb,black_70%,transparent)] tablet:max-w-[calc(100vw-32px)] tablet:px-4.5 tablet:py-5",
          wide
            ? "flex flex-col w-170 max-w-[calc(100vw-32px)] max-h-[calc(100vh-48px)] text-left"
            : "text-center max-w-105",
        )}
        ref={bodyRef}
      >
        <button
          type="button"
          className="absolute top-2.5 right-2.5 bg-transparent border-none text-muted cursor-pointer p-1 flex hover:text-fg"
          onClick={onClose}
          aria-label="Đóng"
        >
          <X size={18} />
        </button>
        <h2 className="flex items-center justify-center gap-2 font-roman font-normal tracking-[1px] text-[19px] text-gold-bright mb-3.5">
          {icon} {title}
        </h2>
        {wide ? (
          <div className="min-h-0 overflow-y-auto -mr-3 pr-3">{children}</div>
        ) : (
          children
        )}
      </div>
    </dialog>,
    document.body,
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
      <div className="mt-1 text-[14px] text-fg leading-[1.55]">{children}</div>
      <div className="flex justify-center gap-2.5 mt-4.5">
        <button
          type="button"
          className={btn("min-w-30 px-4 py-2")}
          onClick={confirm}
        >
          {confirmText}
          {confirmIcon}
        </button>
        <button
          type="button"
          className={btnGhost("min-w-30 px-4 py-2")}
          onClick={onClose}
        >
          {cancelText}
        </button>
      </div>
    </Modal>
  );
}

export function Quote({ children }) {
  return (
    <blockquote className="italic text-quote bg-ink border-l-4 border-l-(--accent) px-4.5 py-3.5 rounded-r-lg mb-4.5">
      {children}
    </blockquote>
  );
}

export function Note({ title = "Lưu ý", children }) {
  return (
    <div className="bg-gold/10 border border-gold rounded-lg px-4 py-3 my-3.5 text-[14px]">
      <div className="font-bold text-gold-bright mb-1 flex items-center gap-1.5">
        <Info size={16} /> {title}
      </div>
      <div>{children}</div>
    </div>
  );
}

export function Formula({ children }) {
  return (
    <div className="mt-3 mb-0.5 text-center font-roman text-[17px] font-bold tracking-[0.3px] text-gold-bright">
      {children}
    </div>
  );
}

export function Faq({ items }) {
  const shown = filterFaq(items, useContext(SearchContext));
  return (
    <div className="flex flex-col gap-2.5">
      {shown.length === 0 && (
        <p className="text-center text-muted py-5">{SEARCH_EMPTY}</p>
      )}
      {shown.map((it) => (
        <details className={DETAILS} name="faq" key={it.q}>
          <summary className={cx(SUMMARY, "py-3.25")}>
            <span>{it.q}</span>
            <ChevronDown className={DETAILS_CHEVRON} size={18} />
          </summary>
          <div className="px-4 pt-3 pb-3.5 text-fg text-[14px] leading-[1.65]">
            {it.a}
          </div>
        </details>
      ))}
    </div>
  );
}

function CheatCode({ code }) {
  const [copied, copyText] = useCopy(1200);
  const copy = () => copyText(code);
  const Icon = copied ? Check : Copy;
  return (
    <button
      type="button"
      className="group/cc inline-flex items-center gap-1.25 p-0 bg-transparent border-none [font:inherit] cursor-pointer"
      onClick={copy}
      title={copied ? "Đã copy" : "Bấm để copy mã"}
    >
      <code
        className={cx(
          "font-semibold whitespace-nowrap cursor-pointer transition-[color,border-color]",
          copied
            ? "text-ok border-ok"
            : "text-gold-bright group-hover/cc:border-gold",
        )}
      >
        {code}
      </code>
      <Icon
        className={cx(
          "shrink-0 transition-[opacity,color]",
          copied
            ? "opacity-100 text-ok"
            : "text-muted opacity-0 group-hover/cc:opacity-100 group-hover/cc:text-gold-bright",
        )}
        size={13}
      />
    </button>
  );
}

function CheatCell({ value }) {
  if (!value) return <span className="text-muted">-</span>;
  const { code, note } = typeof value === "string" ? { code: value } : value;
  return (
    <>
      <CheatCode code={code} />
      {note && (
        <span className="block mt-0.5 text-[12px] text-muted">{note}</span>
      )}
    </>
  );
}

const TABLE =
  "w-full border-collapse text-[14px] [&_:is(th,td)]:text-left [&_:is(th,td)]:px-3.5 [&_:is(th,td)]:py-2.25 [&_:is(th,td)]:border-b [&_:is(th,td)]:border-line [&_:is(th,td)]:align-top [&_thead_th]:bg-gold/14 [&_thead_th]:text-gold-bright [&_thead_th]:font-bold [&_tbody_tr:last-child_td]:border-b-0";

const TABLE_WRAP = "overflow-x-auto border border-gold rounded-[10px]";

const PIN_CELL = "w-px pl-2! pr-0!";

const PINNED_ROW = "bg-gold/8!";

function PinButton({ id }) {
  const { pins, togglePin } = usePrefs();
  const on = pins.includes(id);
  const label = on ? "Bỏ ghim" : "Ghim lên đầu danh sách";
  return (
    <button
      type="button"
      className={cx(
        "grid place-items-center size-6.5 -my-0.5 p-0 bg-transparent border-none rounded-md cursor-pointer transition-[opacity,color] hover:bg-white/5 hover:text-gold-bright focus-visible:opacity-100",
        on
          ? "text-gold-bright"
          : "text-muted opacity-30 group-hover/row:opacity-100",
      )}
      onClick={() => togglePin(id)}
      title={label}
      aria-label={label}
      aria-pressed={on}
    >
      <Pin size={14} fill={on ? "currentColor" : "none"} />
    </button>
  );
}

const SearchContext = createContext("");

export function Searchable({ placeholder, children }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const clear = () => {
    setQuery("");
    inputRef.current?.focus();
  };
  const onKeyDown = (e) => {
    if (e.key !== "Escape" || !query) return;
    e.stopPropagation();
    clear();
  };
  return (
    <SearchContext.Provider value={query}>
      <div className="relative mt-5 mb-3">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
          size={16}
        />
        <input
          ref={inputRef}
          type="search"
          className="w-full h-10.5 pl-9.5 pr-10 text-[14px] text-fg bg-panel border border-line rounded-lg placeholder:text-dim transition-[border-color] hover:border-line-hover focus:outline-none focus:border-gold [&::-webkit-search-cancel-button]:hidden"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
        />
        {query && (
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 grid place-items-center size-7 p-0 text-muted bg-transparent border-none rounded-md cursor-pointer hover:text-gold-bright hover:bg-white/5"
            onClick={clear}
            title="Xoá tìm kiếm"
          >
            <X size={15} />
          </button>
        )}
      </div>
      {children}
    </SearchContext.Provider>
  );
}

export function PinReset({ ids, prefix, unit }) {
  const { pins, unpinAll } = usePrefs();
  const [confirm, setConfirm] = useState(false);
  const count = countPinned(pins, ids);
  if (!count) return null;
  return (
    <div className="flex items-center justify-end flex-wrap gap-x-3 gap-y-2 -mt-1 mb-3 text-[13px] text-muted">
      <span className="inline-flex items-center gap-1.5">
        <Pin className="text-gold-bright" size={13} fill="currentColor" /> Đã
        ghim <b className="text-gold-bright">{count}</b> {unit}
      </span>
      <button
        type="button"
        className={btnGhost("min-w-0 px-3 py-1.5 text-[12.5px]")}
        onClick={() => setConfirm(true)}
      >
        <PinOff size={13} /> Bỏ ghim tất cả
      </button>
      {confirm && (
        <ConfirmModal
          title="Bỏ ghim"
          icon={<PinOff size={18} />}
          confirmText="Bỏ ghim"
          confirmIcon={<PinOff size={14} />}
          onConfirm={() => unpinAll(prefix)}
          onClose={() => setConfirm(false)}
        >
          Bỏ ghim toàn bộ <b>{count}</b> {unit} trên trang này?
        </ConfirmModal>
      )}
    </div>
  );
}

function EmptyRow({ cols }) {
  return (
    <tr>
      <td colSpan={cols} className="text-center text-muted py-5!">
        {SEARCH_EMPTY}
      </td>
    </tr>
  );
}

export function CheatTable({ rows }) {
  const { pins } = usePrefs();
  const shown = filterCheats(
    pinFirst(rows, cheatPin, pins),
    useContext(SearchContext),
  );
  return (
    <div className={TABLE_WRAP}>
      <table
        className={cx(
          TABLE,
          "min-w-180 [&_tbody_tr:nth-child(even)]:bg-white/2",
        )}
      >
        <thead>
          <tr>
            <th className={PIN_CELL} aria-label="Ghim" />
            <th>Complete/SoD, HotA, Chronicles</th>
            <th>ERA/WoG</th>
            <th>VCMI</th>
            <th>Tác dụng</th>
          </tr>
        </thead>
        <tbody>
          {shown.length === 0 && <EmptyRow cols={5} />}
          {shown.map((r) => (
            <tr
              key={r.effect}
              className={cx(
                "group/row",
                pins.includes(cheatPin(r)) && PINNED_ROW,
              )}
            >
              <td className={PIN_CELL}>
                <PinButton id={cheatPin(r)} />
              </td>
              <td>
                <CheatCell value={r.complete} />
              </td>
              <td>
                <CheatCell value={r.wog} />
              </td>
              <td>
                <CheatCell value={r.vcmi} />
              </td>
              <td className="w-2/5">{r.effect}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function KeyCombo({ keys }) {
  return (
    <span className="inline-flex flex-wrap items-center gap-1">
      {keyParts(keys).map(({ key, text, sep }) => {
        if (sep)
          return (
            <span key={key} className="text-muted text-[12px]">
              {text}
            </span>
          );
        return (
          <kbd
            key={key}
            className="inline-block px-1.75 py-px min-w-5 text-center text-[12.5px] font-semibold text-gold-bright bg-white/4 border border-gold border-b-2 rounded-[5px]"
          >
            {text}
          </kbd>
        );
      })}
    </span>
  );
}

export function KeybindsTable({ groups }) {
  const { pins } = usePrefs();
  const shown = filterKeybinds(
    pinKeybinds(groups, pins),
    useContext(SearchContext),
  );
  return (
    <div className={TABLE_WRAP}>
      <table className={cx(TABLE, "min-w-130")}>
        <thead>
          <tr>
            <th className={PIN_CELL} aria-label="Ghim" />
            <th>Phím</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {shown.length === 0 && <EmptyRow cols={3} />}
          {shown.map((g) => (
            <React.Fragment key={g.section}>
              <tr>
                <th
                  colSpan={3}
                  className="bg-gold/8 text-gold-bright font-bold text-[13px]"
                >
                  {g.section === PINNED_SECTION ? (
                    <span className="inline-flex items-center gap-1.5">
                      <Pin size={13} fill="currentColor" /> {g.section}
                    </span>
                  ) : (
                    g.section
                  )}
                </th>
              </tr>
              {g.rows.map((row) => (
                <tr key={row[0] + row[1]} className="group/row">
                  <td className={PIN_CELL}>
                    <PinButton id={keybindPin(row)} />
                  </td>
                  <td className="whitespace-nowrap">
                    <KeyCombo keys={row[0]} />
                  </td>
                  <td className="w-[62%]">{row[1]}</td>
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
    <div className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 bg-panel border border-line border-l-3 border-l-(--accent) rounded-lg px-4.5 py-3.5 text-[13.5px] phone:grid-cols-1 phone:gap-0.5">
      {items.map((it) => (
        <React.Fragment key={it.label}>
          <span className="text-gold-bright font-semibold whitespace-nowrap phone:whitespace-normal phone:not-first:mt-2">
            {it.label}
          </span>
          <span className="text-fg opacity-92">{it.value}</span>
        </React.Fragment>
      ))}
    </div>
  );
}

export const SectionLinkContext = createContext(null);

function SectionLink({ url }) {
  const [copied, copyText] = useCopy();
  const Icon = copied ? Check : Link2;
  const label = copied ? "Đã copy link" : "Copy link mục này";
  return (
    <button
      type="button"
      className={cx(
        "inline-grid place-items-center align-middle size-7 ml-1.5 -my-1 p-0 bg-transparent border-none rounded-md cursor-pointer transition-[opacity,color] hover:bg-white/5 hover:text-gold-bright focus-visible:opacity-100",
        copied
          ? "text-ok"
          : "text-muted opacity-40 group-hover/section:opacity-100",
      )}
      onClick={() => copyText(url)}
      title={label}
      aria-label={label}
    >
      <Icon size={16} />
    </button>
  );
}

export function Section({ id: anchorId, title, children }) {
  const linkOf = useContext(SectionLinkContext);
  const id = sectionAnchor(title, anchorId);
  const url = id && linkOf?.(id);
  return (
    <section className="mt-7.5 scroll-mt-6" id={id}>
      <h2 className={cx(SECTION_TITLE, "group/section")}>
        {title}
        {url && <SectionLink url={url} />}
      </h2>
      {children}
    </section>
  );
}

function CopyButton({ url }) {
  const [copied, copyText] = useCopy();
  const copy = () => copyText(url);
  return (
    <button
      type="button"
      className={btn("min-w-0 px-2.5 py-2 cursor-pointer", copied)}
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
    <div className="flex items-center gap-4 bg-panel border border-line rounded-lg px-4 py-3 mb-2.5 phone:grid phone:grid-cols-[auto_1fr] phone:gap-2.5">
      <div className="flex-1 min-w-0 phone:col-span-full">
        <div className="font-semibold">{label}</div>
        {desc && <div className="text-[13px] text-muted mt-0.5">{desc}</div>}
        <div className="text-[11.5px] text-dim whitespace-nowrap overflow-hidden text-ellipsis mt-0.75">
          {url}
        </div>
      </div>
      <CopyButton url={url} />
      <a className={btn()} href={url} target="_blank" rel="noreferrer">
        {buttonText} <ExternalLink size={14} />
      </a>
    </div>
  );
}

export function Steps({ title, items }) {
  return (
    <div className="bg-panel border border-line rounded-lg px-4.5 py-3.5 my-3">
      {title && <div className="font-bold text-gold-bright mb-2">{title}</div>}
      <ol className="pl-5.5">
        {items.map((it) => (
          <li
            key={typeof it === "string" ? it : it.key}
            className="my-1.5 marker:text-(--accent) marker:font-bold"
          >
            {it}
          </li>
        ))}
      </ol>
    </div>
  );
}

export const NavContext = createContext(null);

const INLINE_LINK =
  "text-link underline underline-offset-2 hover:text-link-hover";

export function PageLink({ to, children }) {
  const navigate = useContext(NavContext);
  return (
    <button
      type="button"
      className={cx(
        INLINE_LINK,
        "p-0 border-none bg-transparent [font:inherit] cursor-pointer",
      )}
      onClick={() => navigate?.(to)}
    >
      {children}
    </button>
  );
}

export function A({ href, children }) {
  return (
    <a className={INLINE_LINK} href={href} target="_blank" rel="noreferrer">
      {children || href}
    </a>
  );
}

function Lightbox({ src, caption, onClose }) {
  const closeRef = useLatest(onClose);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeRef.current();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeRef]);
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-100">
      <button
        type="button"
        className="absolute inset-0 w-full border-none bg-black/82 cursor-zoom-out"
        onClick={onClose}
        aria-label="Đóng ảnh phóng to"
      />
      <figure className="relative flex flex-col items-center max-w-[88vw] max-h-[88vh]">
        <button
          type="button"
          className="absolute -top-3.5 -right-3.5 w-8.5 h-8.5 flex items-center justify-center rounded-full border border-gold bg-panel text-gold-bright cursor-pointer shadow-[0_2px_10px_color-mix(in_srgb,black_60%,transparent)] transition-[filter] hover:brightness-130"
          onClick={onClose}
          title="Đóng (Esc)"
          aria-label="Đóng ảnh phóng to"
        >
          <X size={20} />
        </button>
        <img
          className="block w-full max-w-[88vw] max-h-[calc(88vh-34px)] object-contain border border-gold rounded-lg shadow-[0_12px_48px_color-mix(in_srgb,black_80%,transparent)]"
          src={src}
          alt={caption}
        />
        {caption && (
          <figcaption className="mt-2.5 px-1 pt-1.75 pb-0.5 text-[13.5px] text-fg text-center">
            {caption}
          </figcaption>
        )}
      </figure>
    </div>,
    document.body,
  );
}

export function Screenshot({ src, caption }) {
  const [zoom, setZoom] = useState(false);
  return (
    <figure className="bg-panel border border-line rounded-lg p-2">
      <button
        type="button"
        className="block w-full p-0 bg-transparent border-none cursor-zoom-in"
        onClick={() => setZoom(true)}
        aria-label="Phóng to ảnh"
      >
        <img
          className="w-full rounded-[5px] block"
          src={src}
          alt={caption}
          loading="lazy"
          decoding="async"
        />
      </button>
      {caption && (
        <figcaption className="text-[12.5px] text-muted px-1 pt-1.75 pb-0.5 text-center">
          {caption}
        </figcaption>
      )}
      {zoom && (
        <Lightbox src={src} caption={caption} onClose={() => setZoom(false)} />
      )}
    </figure>
  );
}
