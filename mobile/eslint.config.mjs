import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import sonarjs from "eslint-plugin-sonarjs";
import globals from "globals";
import pkg from "./package.json" with { type: "json" };

const module = {
  ecmaVersion: "latest",
  sourceType: "module",
  parserOptions: { ecmaFeatures: { jsx: true } },
};

export default [
  { ignores: ["dist/**", ".expo/**", "node_modules/**"] },
  js.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  reactHooks.configs.flat.recommended,
  sonarjs.configs.recommended,
  {
    settings: {
      react: { version: pkg.dependencies.react.replace(/^\D+/, "") },
    },
    rules: { "react/prop-types": "off" },
  },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ...module,
      globals: { ...globals.browser, __DEV__: "readonly" },
    },
  },
  {
    files: ["*.mjs"],
    languageOptions: { ...module, globals: globals.node },
  },
  {
    files: ["app.config.js", "babel.config.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: globals.node,
    },
  },
  {
    files: ["src/data/web.jsx", "src/pages/upcoming.jsx"],
    rules: { "sonarjs/no-clear-text-protocols": "off" },
  },
];
