import { versions } from "@shared/data/versions.js";
import { PAGES, TOOL_PAGE_IDS } from "@shared/data/pages.jsx";
import { SECRET } from "@shared/data/secret.js";
import { SETTINGS } from "@shared/data/settings.js";
import { WEB_URL } from "@shared/data/links.js";

const { upcoming } = PAGES;

export const UPCOMING_ITEM = {
  id: upcoming.id,
  name: upcoming.name,
  subtitle: upcoming.subtitle,
  img: upcoming.icon,
  accent: upcoming.accent,
  desc: upcoming.summary,
};

const VERSION_ITEMS = [
  ...versions.map((v) => ({
    id: v.id,
    name: v.name,
    img: v.icon,
    accent: v.accent,
    isVersion: true,
  })),
  UPCOMING_ITEM,
];

const TOOL_ITEMS = TOOL_PAGE_IDS.map((id) => ({
  id,
  name: PAGES[id].name,
  img: PAGES[id].icon,
}));

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
  title: SETTINGS.title,
  icon: "cog-outline",
};

export const SECRET_ITEM = { id: "secret", name: SECRET.title };

const ALL_ITEMS = [
  ...NAV,
  ...VERSION_ITEMS,
  ...TOOL_ITEMS,
  SETTINGS_ITEM,
  SECRET_ITEM,
];

export const findNav = (id) => ALL_ITEMS.find((n) => n.id === id);

export const versionOf = (id) => versions.find((v) => v.id === id);

const WEB_PAGE_IDS = new Set([upcoming.id, ...TOOL_PAGE_IDS]);

export const webPathOf = (id) =>
  versionOf(id)?.path ?? (WEB_PAGE_IDS.has(id) ? id : null);

export const webUrlOf = (id) => {
  const path = webPathOf(id);
  return path === null ? null : `${WEB_URL}${path}/`;
};

export const PAGE_OPTIONS = [
  { id: "home", name: "Trang chủ (mặc định)" },
  ...VERSION_ITEMS,
  ...TOOL_ITEMS,
];

export const validPage = (id) =>
  PAGE_OPTIONS.some((o) => o.id === id) ? id : "home";
