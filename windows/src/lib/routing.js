import { versions } from "../data/versions.js";
import { EXTRA_PAGES } from "../pages/index.js";

export const HOME_TITLE = "Heroes 3 VN by Gogetto";

const BASE_PATH = new URL(import.meta.url).pathname
  .split("/")
  .slice(0, -2)
  .concat("")
  .join("/");

export const PAGE_PATHS = new Map(
  [...versions, ...EXTRA_PAGES].map((p) => [p.id, p.path ?? p.id]),
);

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

export function startupPage() {
  const id = new URLSearchParams(location.search).get("page");
  return PAGE_PATHS.has(id) ? id : "home";
}
