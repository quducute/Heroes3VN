// Lấy version mới nhất của các bản Heroes 3 rồi ghi ra dist/versions.json
// cho bản web (GitHub Pages), vì trình duyệt bị CORS chặn một số nguồn
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { fetchAllModLatest } from "../src/update.js";

const out = fileURLToPath(new URL("../dist/versions.json", import.meta.url));
const sources = await fetchAllModLatest();
writeFileSync(
  out,
  JSON.stringify({ generatedAt: new Date().toISOString(), sources }, null, 2),
);
console.log(`Đã ghi ${Object.keys(sources).length} nguồn vào ${out}`);
