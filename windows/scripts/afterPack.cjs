const fs = require("node:fs");
const path = require("node:path");

const KEEP = new Set(["en-US.pak", "vi.pak"]);

module.exports = async function afterPack(context) {
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
