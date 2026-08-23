import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync } from "node:fs";
import { resolve } from "node:path";
import * as esbuild from "esbuild";
import { bundleAsync } from "lightningcss";

const root = resolve(import.meta.dirname, "..");
const dist = resolve(root, "dist");
const assets = resolve(dist, "assets");

if (!existsSync(assets)) mkdirSync(assets, { recursive: true });

await esbuild.build({
  entryPoints: [resolve(root, "src/main.ts")],
  outfile: resolve(assets, "index.js"),
  bundle: true,
  format: "esm",
  minify: true,
  target: "esnext",
  platform: "browser",
  loader: { ".ts": "ts" },
});
console.log("[timor] bundled client JS");

const { code: css } = await bundleAsync({
  filename: resolve(root, "src/styles/app.css"),
  minify: true,
});
writeFileSync(resolve(assets, "index.css"), css);
console.log("[timor] bundled CSS");

copyFileSync(resolve(root, "src/assets/icon.svg"), resolve(assets, "icon.svg"));

await esbuild.build({
  entryPoints: [resolve(root, "src/ssr-entrypoint.ts")],
  outfile: resolve(dist, "ssr.js"),
  bundle: true,
  format: "esm",
  platform: "node",
  target: "node22",
  loader: { ".ts": "ts" },
});
console.log("[timor] bundled SSR entry");

const { renderApp } = await import(resolve(dist, "ssr.js"));
const appHtml: string = await renderApp();

const template = readFileSync(resolve(root, "index.html"), "utf-8");
const result = template
  .replace(
    '<link rel="stylesheet" href="/src/styles/app.css" />',
    '<link rel="stylesheet" href="/assets/index.css" />',
  )
  .replace(
    '<script type="module" src="/src/main.ts"></script>',
    '<script type="module" src="/assets/index.js"></script>',
  )
  .replace(
    '<link rel="icon" type="image/svg+xml" href="/src/assets/icon.svg" />',
    '<link rel="icon" type="image/svg+xml" href="/assets/icon.svg" />',
  )
  .replace("<timor-app></timor-app>", appHtml);

writeFileSync(resolve(dist, "index.html"), result);
console.log("[timor] wrote dist/index.html");
