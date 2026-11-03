import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config.mjs";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      dir: "..",
      include: [
        "shared/**/*.test.{js,jsx}",
        "web/src/**/*.test.{js,jsx}",
        "web/scripts/**/*.test.js",
      ],
      environment: "node",
      restoreMocks: true,
      unstubGlobals: true,
    },
  }),
);
