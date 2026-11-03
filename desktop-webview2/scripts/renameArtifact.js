import { copyFileSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const { version } = JSON.parse(
  readFileSync(new URL("package.json", root), "utf8"),
);
const exe = fileURLToPath(
  new URL("src-tauri/target/release/heroes3vn.exe", root),
);
const releaseDir = fileURLToPath(new URL("../release/", root));
const target = `Heroes3VN-Windows-WebView2-v${version}.exe`;

mkdirSync(releaseDir, { recursive: true });
copyFileSync(exe, releaseDir + target);
const mb = (statSync(releaseDir + target).size / 1024 / 1024).toFixed(1);
console.log(`Artifact: release/${target} (${mb} MB)`);
