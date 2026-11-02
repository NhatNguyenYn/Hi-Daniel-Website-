// Prefixes public-folder paths with the deploy sub-path (e.g. "/repo-name" on GitHub Pages).
// next/link and next/image do this automatically; plain <img>/<a> need it.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string) => (path.startsWith("/") ? basePath + path : path);
