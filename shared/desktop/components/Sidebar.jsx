import { useLayoutEffect, useRef, useState } from "react";
import { Heart } from "lucide-react";
import { versions } from "../../data/versions.js";
import { APP_VERSION } from "@app/lib/version.js";
import brandLogo from "@shared/assets/images/logo.webp";
import { VN as VietnamFlag } from "country-flag-icons/react/3x2";
import { upcomingPage } from "../pages/upcoming.jsx";
import { EXTRA_PAGES } from "../pages/index.js";
import { DonateModal } from "./DonateModal.jsx";
import { cx, SIDE_BTN } from "../lib/cls.js";

const NAV_GROUP =
  "px-4.5 pt-4 pb-1.5 text-[11px] uppercase tracking-[2px] text-muted h1000:pt-3 h1000:pb-1.25 h900:pt-2.5 h780:pt-1.5 h780:pb-1 h700:pt-1 h700:pb-0.5 h680:pt-1 h680:pb-0 h680:leading-tight";

const BRAND_ACTIVE =
  "bg-gold/8 shadow-[0_0_12px_color-mix(in_srgb,goldenrod_20%,transparent)]";

function NavItem({ item, active, onClick }) {
  return (
    <button
      type="button"
      className={cx(
        "flex items-center gap-3 w-full px-4 py-2.25 border-0 border-l-3 text-fg cursor-pointer text-left no-underline transition-[background] h1000:py-1.75 h900:py-1.5 h780:py-0.5 h680:py-0",
        active
          ? "border-l-(--accent) bg-gold/12"
          : "border-l-transparent bg-transparent hover:bg-gold/8",
      )}
      style={{ "--accent": item.accent }}
      onClick={onClick}
    >
      <span className="flex items-center shrink-0">
        <img
          className="w-6.5 h-6.5 object-contain rounded-[5px]"
          src={item.icon}
          alt=""
        />
      </span>
      <span>
        <span className="block text-[15px] leading-tight font-sans font-bold">
          {item.name}
        </span>
        <span className="block text-[11.5px] leading-tight text-muted">
          {item.subtitle}
        </span>
      </span>
    </button>
  );
}

const OTHER_PAGES = EXTRA_PAGES.filter((p) => p !== upcomingPage);
const MIN_ZOOM = 0.75;

function useFitZoom(asideRef, bodyRef, navRef, listRef) {
  const [zoom, setZoom] = useState(1);
  useLayoutEffect(() => {
    const els = [asideRef, bodyRef, navRef, listRef].map((r) => r.current);
    if (els.some((el) => !el)) return undefined;
    const [aside, body, nav, list] = els;
    const fit = () => {
      setZoom((z) => {
        const available = aside.getBoundingClientRect().height;
        const needed =
          body.getBoundingClientRect().height -
          nav.getBoundingClientRect().height +
          list.getBoundingClientRect().height;
        if (!available || !needed) return z;
        const next = Math.min(
          1,
          Math.max(
            MIN_ZOOM,
            Math.floor(((z * available) / needed) * 1000) / 1000,
          ),
        );
        return Math.abs(next - z) < 0.004 ? z : next;
      });
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(aside);
    ro.observe(list);
    document.fonts?.ready.then(fit, () => {});
    return () => ro.disconnect();
  }, [asideRef, bodyRef, navRef, listRef]);
  return zoom;
}

export function Sidebar({ page, setPage, menuOpen, footer }) {
  const [showDonate, setShowDonate] = useState(false);
  const asideRef = useRef(null);
  const bodyRef = useRef(null);
  const navRef = useRef(null);
  const listRef = useRef(null);
  const zoom = useFitZoom(asideRef, bodyRef, navRef, listRef);
  const home = page === "home";
  const navItem = (item) => (
    <NavItem
      key={item.id}
      item={item}
      active={page === item.id}
      onClick={() => setPage(item.id)}
    />
  );
  return (
    <aside
      className={cx(
        "w-66.25 shrink-0 bg-linear-180/srgb from-bar to-bg border-r-2 border-line flex flex-col overflow-hidden tablet:fixed tablet:top-0 tablet:bottom-0 tablet:left-0 tablet:z-60 tablet:w-[min(280px,85vw)] tablet:motion-safe:transition-[translate] tablet:motion-safe:duration-220",
        menuOpen
          ? "tablet:translate-none tablet:shadow-[4px_0_24px_color-mix(in_srgb,black_60%,transparent)]"
          : "tablet:-translate-x-full",
      )}
      ref={asideRef}
    >
      <div
        className="flex flex-col h-full min-h-0"
        ref={bodyRef}
        style={zoom < 1 ? { zoom } : undefined}
      >
        <button
          type="button"
          className={cx(
            "flex flex-col items-center shrink-0 gap-1.75 w-[calc(100%-24px)] m-3 pt-3.25 px-4 pb-2.75 border-[1.5px] border-gold rounded-[10px] cursor-pointer text-center transition-[background,box-shadow] h900:my-2.25 h900:pt-2.5 h900:pb-2 h780:my-2 h780:pt-2 h780:pb-1.5 h700:gap-1.25 h700:my-1.5 h700:pt-1.5 h700:pb-1.25 h680:gap-1 h680:pt-1.25 h680:pb-1",
            home
              ? BRAND_ACTIVE
              : "bg-transparent hover:bg-gold/8 hover:shadow-[0_0_12px_color-mix(in_srgb,goldenrod_20%,transparent)]",
          )}
          onClick={() => setPage("home")}
        >
          <img
            className="block w-full max-w-47.5 h-auto drop-shadow-[0_2px_8px_color-mix(in_srgb,goldenrod_35%,transparent)] h900:max-w-41.25 h780:max-w-37.5 h700:max-w-32.5 h680:max-w-28"
            src={brandLogo}
            alt="Heroes 3 VN"
          />
          <span className="flex items-center gap-1.75 leading-none">
            <VietnamFlag
              className="block w-5 rounded-xs shadow-[0_0_4px_color-mix(in_srgb,black_50%,transparent)]"
              title="Việt Nam"
            />{" "}
            <span className="text-[11px] font-medium text-muted tracking-[0.5px] text-shadow-none align-middle">
              v{APP_VERSION}
            </span>
          </span>
        </button>
        <nav className="flex-[1_1_auto] min-h-0 overflow-y-auto" ref={navRef}>
          <div ref={listRef}>
            <div className={NAV_GROUP}>Các phiên bản Heroes 3</div>
            {versions.map(navItem)}
            {navItem(upcomingPage)}
            <div className={NAV_GROUP}>Khác</div>
            {OTHER_PAGES.map(navItem)}
          </div>
        </nav>
        <div className="shrink-0 p-3.5 border-t border-line flex flex-col gap-2 h900:py-2.75 h780:py-2.5 h700:py-2 h700:gap-1.5 h680:py-1.5">
          <button
            type="button"
            className={SIDE_BTN}
            onClick={() => setShowDonate(true)}
          >
            <Heart size={16} /> Donate
          </button>
          {footer}
        </div>
      </div>
      {showDonate && <DonateModal onClose={() => setShowDonate(false)} />}
    </aside>
  );
}
