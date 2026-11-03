import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config.mjs";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: ["tests/**/*.test.mjs"],
      environment: "node",
      restoreMocks: true,
      testTimeout: 60000,
      fileParallelism: false,
    },
  }),
);
