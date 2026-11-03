import { fileURLToPath } from "node:url";

const SHARED = fileURLToPath(new URL(".", import.meta.url));
const ROOT = fileURLToPath(new URL("..", import.meta.url));

const markdown = {
  name: "h3vn-markdown",
  enforce: "pre",
  transform: (code, id) =>
    id.endsWith(".md")
      ? { code: `export default ${JSON.stringify(code)};`, map: null }
      : null,
};

export const sharedConfig = (appDir, { desktop = false } = {}) => ({
  plugins: [markdown],
  resolve: {
    alias: [
      { find: "@shared", replacement: SHARED },
      {
        find: /^\/?@app(?=\/)/,
        replacement: desktop ? `${SHARED}desktop/app` : `${appDir}/src`,
      },
      { find: "@pkg", replacement: `${appDir}/package.json` },
      { find: "@ui", replacement: `${SHARED}desktop/components/ui.jsx` },
    ],
    dedupe: [
      "react",
      "react-dom",
      "lucide-react",
      "country-flag-icons",
      "@fontsource/roboto",
      "@fontsource/luxurious-roman",
    ],
  },
  server: { fs: { allow: [ROOT] } },
});
