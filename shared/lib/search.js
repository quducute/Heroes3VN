export const normalize = (text) =>
  String(text ?? "")
    .normalize("NFD")
    .replaceAll(/\p{M}/gu, "")
    .replaceAll(/[đĐ]/g, "d")
    .toLowerCase()
    .trim();

export const matches = (query, ...fields) => {
  const words = normalize(query).split(/\s+/).filter(Boolean);
  if (!words.length) return true;
  const hay = normalize(fields.flat().join(" "));
  return words.every((w) => hay.includes(w));
};

const cheatValue = (v) => {
  if (!v) return "";
  return typeof v === "string" ? v : `${v.code} ${v.note ?? ""}`;
};

export const filterCheats = (rows, query) =>
  rows.filter((r) =>
    matches(
      query,
      cheatValue(r.complete),
      cheatValue(r.wog),
      cheatValue(r.vcmi),
      r.effect,
    ),
  );

export const filterKeybinds = (groups, query) =>
  groups
    .map((g) =>
      matches(query, g.section)
        ? g
        : {
            ...g,
            rows: g.rows.filter(([keys, fn]) => matches(query, keys, fn)),
          },
    )
    .filter((g) => g.rows.length);

export const textOf = (node) => {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join(" ");
  return textOf(node.props?.children);
};

const faqText = new WeakMap();

const answerText = (item) => {
  if (!faqText.has(item)) faqText.set(item, textOf(item.a));
  return faqText.get(item);
};

export const filterFaq = (items, query) =>
  items.filter((it) => matches(query, it.q, answerText(it)));

export const SEARCH_EMPTY = "Không tìm thấy kết quả phù hợp.";
