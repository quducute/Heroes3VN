import { PAGES } from "@shared/desktop/pages/index.js";
import { sectionUrl } from "@shared/lib/anchor.js";

export const HOME_TITLE = "Heroes 3 VN by Gogetto";

export const BASE_PATH = new URL(import.meta.url).pathname
  .split("/")
  .slice(0, -2)
  .concat("")
  .join("/");

export const PAGE_IDS = new Set(PAGES.map((p) => p.id));

const PAGE_PATHS = new Map(PAGES.map((p) => [p.id, p.path ?? p.id]));

const PATH_IDS = new Map(
  [...PAGE_PATHS].flatMap(([id, path]) => [
    [id, id],
    [path.toLowerCase(), id],
  ]),
);

export function pathOf(id) {
  return BASE_PATH + (PAGE_PATHS.has(id) ? PAGE_PATHS.get(id) + "/" : "");
}

export function pageFromPath() {
  const path = location.pathname
    .slice(BASE_PATH.length)
    .split("/")
    .filter(Boolean)
    .join("/")
    .toLowerCase();
  return PATH_IDS.get(path) ?? "home";
}

export const pageLink = (page) => location.origin + pathOf(page.id);

export const sectionLink = (page, anchor) =>
  sectionUrl(location.origin + BASE_PATH, page.path ?? page.id, anchor);
