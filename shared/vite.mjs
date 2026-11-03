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

export const sharedConfig = (appDir) => ({
  plugins: [markdown],
  resolve: {
    alias: {
      "@shared": SHARED,
      "@app": `${appDir}/src`,
      "@ui": `${SHARED}desktop/components/ui.jsx`,
    },
    dedupe: ["react", "react-dom", "lucide-react", "country-flag-icons"],
  },
  server: { fs: { allow: [ROOT] } },
});
