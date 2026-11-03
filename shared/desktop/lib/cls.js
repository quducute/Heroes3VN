export const cx = (...parts) => parts.filter(Boolean).join(" ");

const BTN_BASE =
  "shrink-0 inline-flex items-center justify-center gap-1.5 bg-transparent font-bold text-[13.5px] rounded-md no-underline border motion-safe:transition-[filter,translate] motion-safe:duration-[150ms,100ms] active:translate-y-px";

const BTN_FILL =
  "text-ink shadow-[0_2px_6px_color-mix(in_srgb,black_40%,transparent)] hover:brightness-112";

const BTN_GOLD = "bg-linear-180/srgb from-gold to-gold-dark border-gold-bright";

export const btn = (extra, copied) =>
  cx(
    BTN_BASE,
    BTN_FILL,
    copied
      ? "bg-linear-180/srgb from-ok to-[forestgreen] border-[lightgreen]"
      : BTN_GOLD,
    extra ?? "min-w-41.25 px-4 py-2",
  );

export const btnGhost = (extra) =>
  cx(
    BTN_BASE,
    "text-fg border-line cursor-pointer hover:bg-gold/8",
    extra ?? "min-w-41.25 px-4 py-2",
  );

export const SIDE_BTN =
  "flex items-center justify-start gap-2.5 w-full h-10.5 h900:h-10 h800:h-9 h700:h-8.5 h600:h-8 leading-none px-4 bg-transparent bg-linear-180/srgb from-gold to-gold-dark text-ink font-bold text-[13.5px] border border-gold-bright rounded-lg cursor-pointer shadow-[0_2px_6px_color-mix(in_srgb,black_40%,transparent)] transition-[filter] no-underline not-italic hover:brightness-112 [&_svg]:shrink-0";

export const MAIN =
  "flex-1 overflow-y-auto bg-bg2 bg-[radial-gradient(1100px_500px_at_70%_-10%,color-mix(in_srgb,goldenrod_7%,transparent),transparent)]";

export const PANEL_GRADIENT = "bg-linear-170/srgb from-panel to-panel2";

export const SECTION_TITLE =
  "text-[20px] phone:text-[18px] text-gold-bright border-b border-line pb-2 mb-3.5";

export const CHOOSE_TITLE =
  "text-[20px] text-gold-bright border-b border-line pb-2 mb-3 h800:pb-1.25 h800:mb-1.75";

export const DETAILS =
  "group border border-gold/35 rounded-lg bg-gold/5 overflow-hidden";

export const SUMMARY =
  "list-none cursor-pointer flex items-center justify-between gap-3 px-4 font-semibold text-[15px] text-gold-bright [&::-webkit-details-marker]:hidden hover:bg-gold/8 group-open:border-b group-open:border-b-gold/20";

export const DETAILS_CHEVRON =
  "shrink-0 text-gold motion-safe:transition-transform motion-safe:duration-200 group-open:rotate-180";

export const LINES = "flex flex-col gap-1.75";

export const HINT = "text-muted text-[14px] mb-2.5";

export const SOURCE = "mt-3.5 text-[13px] text-muted";

export const PILL_BTN =
  "inline-flex items-center gap-1.5 px-3 py-1.5 border border-line rounded-full text-[12.5px] font-semibold text-gold-bright bg-linear-180/srgb from-panel2 to-panel cursor-pointer whitespace-nowrap motion-safe:transition-[border-color,background,translate] hover:border-gold hover:-translate-y-px [&_svg]:text-gold-bright";

export const MOD_LATEST =
  "px-3.5 py-1.75 border border-(--accent) rounded-full text-[13px] text-fg bg-gold/6 text-right phone:flex phone:flex-col phone:gap-0.5 phone:max-w-full phone:rounded-[14px] phone:text-left [&_b]:text-gold-bright";

export const MOD_LATEST_PART = "whitespace-nowrap phone:whitespace-normal";

export const CARD_LATEST =
  "mb-2 text-[11.5px] leading-[1.3] text-muted [&_b]:text-(--accent) [&_b]:font-semibold h800:mb-1 h800:text-[11px]";

export const page = (home) =>
  cx(
    "max-w-275 mx-auto px-11 motion-safe:animate-fadein laptop:px-7.5 tablet:px-6 phone:px-4",
    !home &&
      "pt-8 pb-14 laptop:pt-6.5 laptop:pb-11 h800:pt-2.5 tablet:pt-5.5 tablet:pb-11 phone:pt-4.5 phone:pb-10",
  );

export const CHAPTER_LIST =
  "pl-6.5 columns-2 gap-10 *:my-1 *:font-roman *:text-[15.5px] *:marker:text-(--accent) *:marker:font-bold";

const SHOT_GRID_BASE = "flex flex-wrap justify-center gap-3.5 mt-4";

export const SHOT_GRID = cx(
  SHOT_GRID_BASE,
  "items-start *:flex-[0_0_calc((100%-14px)/2)] wide:*:basis-[calc((100%-28px)/3)] phone:*:basis-full",
);

export const SHOT_GRID_STACK = cx(
  SHOT_GRID_BASE,
  "flex-col items-center *:flex-none *:w-full *:max-w-170",
);

export const SHOT_GRID_ICON = cx(
  SHOT_GRID_BASE,
  "items-start *:flex-none *:w-55",
);
