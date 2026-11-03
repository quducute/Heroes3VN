import { readdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const assets = fileURLToPath(new URL("../dist/assets/", import.meta.url));

let removed = 0;
for (const f of readdirSync(assets)) {
  if (!f.endsWith(".woff")) continue;
  rmSync(join(assets, f));
  removed += 1;
}
console.log(`[pruneDist] Xoá ${removed} font .woff (WebView2 dùng .woff2)`);
