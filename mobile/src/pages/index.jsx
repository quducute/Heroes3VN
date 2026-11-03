import { B } from "../components/ui";
import { mix } from "../theme";
import { versions, versionIcons } from "@shared/data/versions.js";
import dorIcon from "@shared/assets/icons/dor.webp";
import webIcon from "@shared/assets/icons/heroes.webp";
import hdIcon from "@shared/assets/icons/hd.webp";
import cheatIcon from "@shared/assets/icons/cheat.webp";
import faqIcon from "@shared/assets/icons/faq.webp";
import seriesIcon from "@shared/assets/icons/series.webp";
import boardgameIcon from "@shared/assets/icons/boardgame.webp";

export const UPCOMING_ITEM = {
  id: "upcoming",
  name: "Sắp ra mắt",
  subtitle: "Dự kiến 2027",
  img: dorIcon,
  accent: mix("deepskyblue", 0.84),
  desc: (
    <>
      Thông tin các bản Heroes 3 sắp ra mắt: <B>Heroes 3 Remake</B> của Ubisoft
      và dự án <B>Day of Reckoning</B> (<B>DoR</B>).
    </>
  ),
};

const VERSION_ITEMS = [
  ...versions.map((v) => ({
    id: v.id,
    name: v.name,
    img: versionIcons[v.id],
    accent: v.accent,
    isVersion: true,
  })),
  UPCOMING_ITEM,
];

const TOOL_ITEMS = [
  { id: "web", name: "Tài nguyên hữu ích", img: webIcon },
  { id: "keybinds", name: "Phím tắt Heroes 3", img: hdIcon },
  { id: "cheat", name: "Mã cheat Heroes 3", img: cheatIcon },
  { id: "faq", name: "Câu hỏi thường gặp", img: faqIcon },
  { id: "series", name: "Game cùng series HoMM", img: seriesIcon },
  { id: "boardgame", name: "Heroes 3 The Board Game", img: boardgameIcon },
];

export const NAV = [
  { id: "home", name: "Trang chủ", icon: "home-outline" },
  {
    group: "versions",
    name: "Các phiên bản Heroes 3",
    icon: "layers-outline",
    items: VERSION_ITEMS,
  },
  {
    group: "tools",
    name: "Khác",
    icon: "view-grid-outline",
    items: TOOL_ITEMS,
  },
  { id: "donate", name: "Donate", icon: "heart-outline" },
];

export const SETTINGS_ITEM = {
  id: "settings",
  name: "Settings",
  icon: "cog-outline",
};

export const SECRET_ITEM = { id: "secret", name: "Hộp Pandora" };

export const findNav = (id) =>
  [...NAV, ...VERSION_ITEMS, ...TOOL_ITEMS, SETTINGS_ITEM, SECRET_ITEM].find(
    (n) => n.id === id,
  );

export const versionOf = (id) => versions.find((v) => v.id === id);

export const PAGE_OPTIONS = [
  { id: "home", name: "Trang chủ" },
  ...VERSION_ITEMS,
  ...TOOL_ITEMS,
];

export const validPage = (id) =>
  PAGE_OPTIONS.some((o) => o.id === id) ? id : "home";
