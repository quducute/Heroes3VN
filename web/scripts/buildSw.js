import { generateSW } from "workbox-build";
import { fileURLToPath } from "node:url";

const dist = fileURLToPath(new URL("../dist/", import.meta.url));

const { count, size, warnings } = await generateSW({
  globDirectory: dist,
  globPatterns: ["**/*.{css,html,ico,js,png,webmanifest,webp,woff2}"],
  globIgnores: ["google*.html", "sw.js"],
  swDest: `${dist}sw.js`,
  dontCacheBustURLsMatching: /assets\//,
  navigateFallback: "404.html",
  navigateFallbackDenylist: [/\/google[^/]*\.html$/, /\/sitemap\.xml$/],
  cleanupOutdatedCaches: true,
  clientsClaim: true,
  skipWaiting: true,
  inlineWorkboxRuntime: true,
  sourcemap: false,
  runtimeCaching: [
    {
      urlPattern: ({ url }) => url.pathname.endsWith("/versions.json"),
      handler: "NetworkFirst",
      options: { cacheName: "versions", networkTimeoutSeconds: 5 },
    },
  ],
});

for (const w of warnings) console.warn(w);
console.log(
  `Service worker: ${count} file (${(size / 1024 / 1024).toFixed(1)} MB)`,
);
