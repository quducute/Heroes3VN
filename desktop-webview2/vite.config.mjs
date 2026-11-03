import { defineConfig, mergeConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { sharedConfig } from "../shared/vite.mjs";

export default defineConfig(
  mergeConfig(sharedConfig(import.meta.dirname, { desktop: true }), {
    base: "./",
    plugins: [react(), tailwindcss()],
    clearScreen: false,
    server: {
      port: 5173,
      strictPort: true,
      watch: { ignored: ["**/src-tauri/**"] },
    },
  }),
);
