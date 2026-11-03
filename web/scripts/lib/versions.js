export function mergeSource(current, previous) {
  if (current === undefined) return { value: previous, kept: [] };
  if (!Array.isArray(current) || !Array.isArray(previous))
    return { value: current, kept: [] };
  const fresh = new Map(current.map((item) => [item.label, item]));
  const kept = previous.filter((item) => !fresh.has(item.label));
  const value = [...current];
  for (const item of kept) {
    value.splice(previous.indexOf(item), 0, item);
  }
  return { value, kept };
}

export function mergeSources(fresh, previous) {
  const sources = {};
  const kept = [];
  for (const id of new Set([...Object.keys(previous), ...Object.keys(fresh)])) {
    const merged = mergeSource(fresh[id], previous[id]);
    kept.push(...merged.kept);
    if (merged.value !== undefined) sources[id] = merged.value;
  }
  return { sources, kept };
}
