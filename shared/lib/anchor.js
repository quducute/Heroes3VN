import { normalize } from "./search.js";

export const slugify = (text) =>
  normalize(text)
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replace(/^-/, "")
    .replace(/-$/, "");

export const sectionAnchor = (title, id) =>
  id ?? (typeof title === "string" ? slugify(title) : undefined);

export function sectionUrl(base, path, anchor) {
  const dir = path ? path + "/" : "";
  return `${base}${dir}#${anchor}`;
}
