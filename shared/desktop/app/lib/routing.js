import { PAGES } from "@shared/desktop/pages/index.js";

export const PAGE_IDS = new Set(PAGES.map((p) => p.id));

export function startupPage() {
  const id = new URLSearchParams(location.search).get("page");
  return PAGE_IDS.has(id) ? id : "home";
}
