const {
  mkdirSync,
  readFileSync,
  readdirSync,
  renameSync,
  rmSync,
  statSync,
} = require("node:fs");
const { join } = require("node:path");

const root = join(__dirname, "..");
const { version } = JSON.parse(
  readFileSync(join(root, "package.json"), "utf8"),
);
const buildDir = join(root, "release");
const releaseDir = join(root, "..", "release");
const target = `Heroes3VN-Windows-v${version}.exe`;

const exes = readdirSync(buildDir)
  .filter((f) => /^Heroes3VN.*\.exe$/.test(f))
  .map((f) => ({ f, mtime: statSync(join(buildDir, f)).mtimeMs }))
  .sort((a, b) => b.mtime - a.mtime);

if (exes.length === 0) {
  console.error("Không tìm thấy file exe trong windows/release/");
  process.exit(1);
}

mkdirSync(releaseDir, { recursive: true });
rmSync(join(releaseDir, target), { force: true });
renameSync(join(buildDir, exes[0].f), join(releaseDir, target));
const mb = (statSync(join(releaseDir, target)).size / 1024 / 1024).toFixed(1);
console.log(`Artifact: release/${target} (${mb} MB)`);
