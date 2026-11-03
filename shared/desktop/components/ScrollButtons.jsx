import { useState, useRef, useEffect } from "react";
import { ArrowUp, ArrowDown, ChevronsUpDown } from "lucide-react";
import { cx } from "../lib/cls.js";
import { SecretModal } from "./SecretModal.jsx";
import pandora from "@shared/assets/icons/pandora.webp";

const BTN =
  "flex items-center justify-center rounded-full border bg-transparent bg-linear-180/srgb from-panel2 to-panel text-gold-bright cursor-pointer shadow-[0_4px_14px_color-mix(in_srgb,black_45%,transparent)] motion-safe:transition-[opacity,translate,scale,rotate,border-color,background] motion-safe:duration-[200ms,150ms,150ms,150ms,150ms,150ms] hover:enabled:border-gold hover:enabled:from-panel hover:enabled:to-panel2";

function SecretButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        className={cx(BTN, "w-10.5 h-10.5 border-line hover:-translate-y-0.5")}
        title="Hộp Pandora"
        aria-label="Hộp Pandora"
        onClick={() => setOpen(true)}
      >
        <img className="h-7 w-auto" src={pandora} alt="" />
      </button>
      {open && <SecretModal onClose={() => setOpen(false)} />}
    </>
  );
}

export function ScrollButtons({ scrollRef, page }) {
  const [openPage, setOpenPage] = useState(null);
  const open = openPage === page;
  const [canUp, setCanUp] = useState(false);
  const [canDown, setCanDown] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      setCanUp(scrollTop > 20);
      setCanDown(scrollTop + clientHeight < scrollHeight - 20);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const resize = new ResizeObserver(update);
    resize.observe(el);
    for (const child of el.children) resize.observe(child);
    return () => {
      el.removeEventListener("scroll", update);
      resize.disconnect();
    };
  }, [scrollRef, page]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setOpenPage(null);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const scrollTo = (top) =>
    scrollRef.current?.scrollTo({ top, behavior: "smooth" });

  const small = cx(
    BTN,
    "w-9.5 h-9.5 border-line",
    open
      ? "opacity-100 pointer-events-auto disabled:opacity-40 disabled:cursor-default"
      : "opacity-0 pointer-events-none translate-y-3.5 scale-80",
  );

  return (
    <div
      className="fixed right-5.5 bottom-5.5 z-40 flex flex-col items-center gap-2.5 tablet:right-3.5 tablet:bottom-3.5"
      ref={menuRef}
    >
      <button
        type="button"
        className={small}
        title="Lên đầu trang"
        aria-label="Lên đầu trang"
        disabled={!canUp}
        onClick={() => scrollTo(0)}
      >
        <ArrowUp size={18} />
      </button>
      <button
        type="button"
        className={small}
        title="Xuống cuối trang"
        aria-label="Xuống cuối trang"
        disabled={!canDown}
        onClick={() => scrollTo(scrollRef.current?.scrollHeight ?? 0)}
      >
        <ArrowDown size={18} />
      </button>
      <button
        type="button"
        className={cx(
          BTN,
          "w-10.5 h-10.5",
          open
            ? "border-gold rotate-180"
            : "border-line hover:enabled:-translate-y-0.5",
        )}
        title="Cuộn trang"
        aria-label="Menu cuộn trang"
        aria-expanded={open}
        onClick={() => setOpenPage(open ? null : page)}
      >
        <ChevronsUpDown size={20} />
      </button>
      <SecretButton />
    </div>
  );
}
