import { versions } from "../data/versions.js";
import { upcomingPage } from "./upcoming.jsx";
import { webPage } from "./web.jsx";
import { seriesPage } from "./series.jsx";
import { faqPage } from "./faq.jsx";
import { cheatPage } from "./cheat.jsx";
import { keybindsPage } from "./keybinds.jsx";
import { boardgamePage } from "./boardgame.jsx";

export const EXTRA_PAGES = [
  upcomingPage,
  webPage,
  keybindsPage,
  cheatPage,
  faqPage,
  seriesPage,
  boardgamePage,
];

export const PAGE_OPTIONS = [
  { id: "home", name: "Trang chủ" },
  ...versions,
  ...EXTRA_PAGES,
];
