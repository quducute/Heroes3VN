const upstream = require("@expo/metro-config/babel-transformer");

module.exports.transform = (args) =>
  upstream.transform(
    args.filename.endsWith(".md")
      ? { ...args, src: `export default ${JSON.stringify(args.src)};` }
      : args,
  );
