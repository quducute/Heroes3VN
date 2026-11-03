const path = require("node:path");
const { getDefaultConfig } = require("expo/metro-config");
const { withUniwindConfig } = require("uniwind/metro");

const root = path.resolve(__dirname, "..");
const shared = path.join(root, "shared");
const ui = path.join(__dirname, "src", "components", "ui.jsx");
const escape = (p) => p.replaceAll(/[\\^$.*+?()[\]{}|]/g, String.raw`\$&`);
const config = getDefaultConfig(__dirname);

config.watchFolders = [root];
config.resolver.nodeModulesPaths = [path.join(__dirname, "node_modules")];
config.resolver.sourceExts.push("md");
config.resolver.blockList = [
  new RegExp(
    String.raw`^${escape(root)}[\\/](?!mobile(?:[\\/]|$)|shared(?:[\\/]|$)|secret\.md$).*`,
  ),
  new RegExp(String.raw`^${escape(shared)}[\\/]desktop[\\/].*`),
];
config.resolver.resolveRequest = (context, name, platform) => {
  if (name === "@ui") return context.resolveRequest(context, ui, platform);
  if (name.startsWith("@shared/"))
    return context.resolveRequest(
      context,
      path.join(shared, name.slice("@shared/".length)),
      platform,
    );
  return context.resolveRequest(context, name, platform);
};
config.transformer.babelTransformerPath =
  require.resolve("./metro.transformer.js");

module.exports = withUniwindConfig(config, {
  cssEntryFile: "./global.css",
});
