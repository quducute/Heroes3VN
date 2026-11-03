import { versions } from "@shared/data/versions.js";
import { EXTRA_PAGES } from "@shared/desktop/pages/index.js";

export const PAGE_IDS = new Set([...versions, ...EXTRA_PAGES].map((p) => p.id));

export function startupPage() {
  const id = new URLSearchParams(location.search).get("page");
  return PAGE_IDS.has(id) ? id : "home";
}
