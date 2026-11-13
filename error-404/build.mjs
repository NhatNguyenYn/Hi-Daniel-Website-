// Writes out/404.html: the custom 404 page as one self-contained file (tokens, styles,
// script and favicon inlined), so it works at any URL depth on GitHub Pages.
// Runs automatically after `npm run build` (package.json "postbuild") and replaces
// Next.js' default 404. The "Back to home" link follows NEXT_PUBLIC_BASE_PATH.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const read = (p) => readFileSync(join(root, p), "utf8");
const home = `${(process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/+$/, "")}/`;

if (!/^\/[^"<>\s]*$/.test(home)) {
  console.error(`error-404: NEXT_PUBLIC_BASE_PATH must be a path like "/repo", got: ${home}`);
  process.exit(1);
}
if (!existsSync(join(root, "out"))) {
  console.error("error-404: out/ not found — run `next build` first");
  process.exit(1);
}

const swap = (html, from, to) => {
  if (!html.includes(from)) throw new Error(`error-404: "${from}" not found in error-404/404.html`);
  return html.replace(from, () => to);
};

let html = read("error-404/404.html");
html = swap(html, '<link rel="stylesheet" href="../design-system/hi-daniel.tokens.css">', `<style>\n${read("design-system/hi-daniel.tokens.css")}\n</style>`);
html = swap(html, '<link rel="stylesheet" href="style.css">', `<style>\n${read("error-404/style.css")}\n</style>`);
html = swap(html, '<script src="game.js"></script>', `<script>\n${read("error-404/game.js")}\n</script>`);
html = swap(
  html,
  'href="../design-system/assets/logo-mark.svg"',
  `href="data:image/svg+xml,${encodeURIComponent(read("design-system/assets/logo-mark.svg").trim())}"`,
);
html = swap(html, '<body data-home="/">', `<body data-home="${home}">`);

writeFileSync(join(root, "out/404.html"), html);
console.log(`error-404: out/404.html written (${(html.length / 1024).toFixed(1)} KB, home → ${home})`);
