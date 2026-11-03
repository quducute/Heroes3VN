const fs = require("node:fs");
const path = require("node:path");

const KEEP = new Set(["en-US.pak", "vi.pak"]);

const UNUSED = [
  "dxcompiler.dll",
  "dxil.dll",
  "vk_swiftshader.dll",
  "vk_swiftshader_icd.json",
  "vulkan-1.dll",
];

module.exports = async function afterPack(context) {
  let unusedBytes = 0;
  for (const file of UNUSED) {
    const full = path.join(context.appOutDir, file);
    if (!fs.existsSync(full)) continue;
    unusedBytes += fs.statSync(full).size;
    fs.rmSync(full);
  }
  console.log(
    `[afterPack] Xoá ${UNUSED.length} file không dùng (${(unusedBytes / 1024 / 1024).toFixed(1)} MB)`,
  );

  const localesDir = path.join(context.appOutDir, "locales");
  if (!fs.existsSync(localesDir)) return;

  let removed = 0;
  let freedBytes = 0;
  for (const file of fs.readdirSync(localesDir)) {
    if (!file.endsWith(".pak") || KEEP.has(file)) continue;
    const full = path.join(localesDir, file);
    freedBytes += fs.statSync(full).size;
    fs.rmSync(full);
    removed += 1;
  }

  const freedMB = (freedBytes / 1024 / 1024).toFixed(1);
  console.log(
    `[afterPack] Xoá ${removed} file locale (${freedMB} MB), giữ: ${[...KEEP].join(", ")}`,
  );
};
