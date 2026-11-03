import { base, browser, node } from "../web/eslint.config.mjs";

export default [
  ...base,
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: browser,
  },
  {
    files: ["*.mjs"],
    languageOptions: node,
  },
  {
    files: ["data/web.jsx", "data/content/upcoming.jsx"],
    rules: { "sonarjs/no-clear-text-protocols": "off" },
  },
];
