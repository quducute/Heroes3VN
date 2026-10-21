import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { fetchAllModLatest } from "../src/update.js";

const PREVIOUS_URL = "https://quducute.github.io/Heroes3VN/versions.json";

const out = fileURLToPath(new URL("../dist/versions.json", import.meta.url));

async function loadPrevious() {
  try {
    const res = await fetch(PREVIOUS_URL, { cache: "no-store" });
    return res.ok ? (await res.json()).sources || {} : {};
  } catch {
    return {};
  }
}

function merge(current, previous) {
  if (current === undefined) return previous;
  if (!Array.isArray(current) || !Array.isArray(previous)) return current;
  const fresh = new Map(current.map((item) => [item.label, item]));
  const kept = previous.filter((item) => !fresh.has(item.label));
  if (kept.length) {
    console.warn(
      `Giữ lại từ bản trước: ${kept.map((i) => i.label).join(", ")}`,
    );
  }
  const result = [...current];
  for (const item of kept) {
    result.splice(previous.indexOf(item), 0, item);
  }
  return result;
}

const [fresh, previous] = await Promise.all([
  fetchAllModLatest(),
  loadPrevious(),
]);
const sources = {};
for (const id of new Set([...Object.keys(previous), ...Object.keys(fresh)])) {
  const value = merge(fresh[id], previous[id]);
  if (value !== undefined) sources[id] = value;
}
writeFileSync(
  out,
  JSON.stringify({ generatedAt: new Date().toISOString(), sources }, null, 2),
);
console.log(`Đã ghi ${Object.keys(sources).length} nguồn vào ${out}`);
