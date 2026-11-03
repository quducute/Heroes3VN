import { defineConfig, mergeConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { sharedConfig } from "../shared/vite.mjs";

export default defineConfig(
  mergeConfig(sharedConfig(import.meta.dirname), {
    base: "./",
    plugins: [react(), tailwindcss()],
  }),
);
