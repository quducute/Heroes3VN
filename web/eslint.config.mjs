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

export const base = [
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
];

export const browser = { ...module, globals: globals.browser };

export const node = { ...module, globals: globals.node };

export default [
  { ignores: ["dist/**", "node_modules/**"] },
  ...base,
  {
    files: ["src/**/*.{js,jsx}"],
    languageOptions: browser,
  },
  {
    files: ["scripts/**/*.js", "*.mjs"],
    languageOptions: node,
  },
  {
    files: ["scripts/buildRoutes.js"],
    rules: { "sonarjs/no-os-command-from-path": "off" },
  },
];
