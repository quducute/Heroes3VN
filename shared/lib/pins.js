export const MAX_PINS = 200;
export const MAX_PIN_LENGTH = 300;

export const PINNED_SECTION = "Đã ghim";

export const CHEAT_PIN = "cheat:";
export const KEY_PIN = "key:";

export const cheatPin = (row) => `${CHEAT_PIN}${row.effect}`;

export const keybindPin = ([keys, fn]) => `${KEY_PIN}${keys}|${fn}`;

export const unpinAll = (pins, prefix) =>
  pins.filter((p) => !p.startsWith(prefix));

export function countPinned(pins, ids) {
  const set = new Set(ids);
  return pins.filter((p) => set.has(p)).length;
}

export const isPin = (id) =>
  typeof id === "string" && id.length > 0 && id.length <= MAX_PIN_LENGTH;

export const cleanPins = (pins) =>
  Array.isArray(pins) ? [...new Set(pins.filter(isPin))].slice(-MAX_PINS) : [];

export const togglePin = (pins, id) =>
  pins.includes(id) ? pins.filter((p) => p !== id) : cleanPins([...pins, id]);

export function pinFirst(items, idOf, pins) {
  const set = new Set(pins);
  const pinned = items.filter((it) => set.has(idOf(it)));
  if (!pinned.length) return items;
  return [...pinned, ...items.filter((it) => !set.has(idOf(it)))];
}

export function pinKeybinds(groups, pins) {
  const set = new Set(pins);
  if (!set.size) return groups;
  const pinned = groups.flatMap((g) =>
    g.rows.filter((r) => set.has(keybindPin(r))),
  );
  if (!pinned.length) return groups;
  const rest = groups
    .map((g) => ({ ...g, rows: g.rows.filter((r) => !set.has(keybindPin(r))) }))
    .filter((g) => g.rows.length);
  return [{ section: PINNED_SECTION, rows: pinned }, ...rest];
}
