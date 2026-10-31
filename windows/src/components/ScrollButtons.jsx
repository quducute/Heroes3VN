import { useState, useRef, useEffect } from "react";
import { ArrowUp, ArrowDown, ChevronsUpDown } from "lucide-react";

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
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
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

  return (
    <div className={`scroll-menu${open ? " open" : ""}`} ref={menuRef}>
      <button
        type="button"
        className="scroll-btn scroll-btn-sm"
        title="Lên đầu trang"
        aria-label="Lên đầu trang"
        disabled={!canUp}
        onClick={() => scrollTo(0)}
      >
        <ArrowUp size={18} />
      </button>
      <button
        type="button"
        className="scroll-btn scroll-btn-sm"
        title="Xuống cuối trang"
        aria-label="Xuống cuối trang"
        disabled={!canDown}
        onClick={() => scrollTo(scrollRef.current?.scrollHeight ?? 0)}
      >
        <ArrowDown size={18} />
      </button>
      <button
        type="button"
        className="scroll-btn scroll-toggle"
        title="Cuộn trang"
        aria-label="Menu cuộn trang"
        aria-expanded={open}
        onClick={() => setOpenPage(open ? null : page)}
      >
        <ChevronsUpDown size={20} />
      </button>
    </div>
  );
}
