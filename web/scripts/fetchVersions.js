import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { fetchAllModLatest } from "../src/lib/update.js";
import { mergeSources } from "./lib/versions.js";

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

const [fresh, previous] = await Promise.all([
  fetchAllModLatest(),
  loadPrevious(),
]);
const { sources, kept } = mergeSources(fresh, previous);
if (kept.length) {
  console.warn(`Giữ lại từ bản trước: ${kept.map((i) => i.label).join(", ")}`);
}
writeFileSync(
  out,
  JSON.stringify({ generatedAt: new Date().toISOString(), sources }, null, 2),
);
console.log(`Đã ghi ${Object.keys(sources).length} nguồn vào ${out}`);
