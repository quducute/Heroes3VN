import { PAGES } from "@shared/desktop/pages/index.js";
import { WEB_URL } from "@shared/data/links.js";
import { sectionUrl } from "@shared/lib/anchor.js";

export const PAGE_IDS = new Set(PAGES.map((p) => p.id));

export function startupPage() {
  const id = new URLSearchParams(location.search).get("page");
  return PAGE_IDS.has(id) ? id : "home";
}

const webPath = (page) => page.path ?? page.id;

export const pageLink = (page) => `${WEB_URL}${webPath(page)}/`;

export const sectionLink = (page, anchor) =>
  sectionUrl(WEB_URL, webPath(page), anchor);
