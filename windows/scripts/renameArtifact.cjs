const {
  readFileSync,
  readdirSync,
  renameSync,
  statSync,
  unlinkSync,
} = require("node:fs");
const { join } = require("node:path");

const root = join(__dirname, "..");
const { version } = JSON.parse(
  readFileSync(join(root, "package.json"), "utf8"),
);
const releaseDir = join(root, "release");
const target = `Heroes3VN-Windows-v${version}.exe`;

const exes = readdirSync(releaseDir)
  .filter((f) => /^Heroes3VN.*\.exe$/.test(f))
  .map((f) => ({ f, mtime: statSync(join(releaseDir, f)).mtimeMs }))
  .sort((a, b) => b.mtime - a.mtime);

if (exes.length === 0) {
  console.error("Không tìm thấy file exe trong release/");
  process.exit(1);
}

const newest = exes[0].f;
if (newest !== target) {
  try {
    unlinkSync(join(releaseDir, target));
  } catch {}
  renameSync(join(releaseDir, newest), join(releaseDir, target));
}
console.log(`Artifact: release/${target}`);
