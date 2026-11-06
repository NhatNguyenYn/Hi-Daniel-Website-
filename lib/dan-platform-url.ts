// Validation for the Dan Platform URLs, shared by next.config.ts (build check) and lib/dan-platform.ts.
// No framework imports so the config can load it.

const LOOPBACK = /^(localhost|127\.0\.0\.1|\[::1\])$|\.localhost$/;

/**
 * Returns a clean absolute http(s) URL (no credentials or fragment), or null when unset.
 * Throws on anything else (javascript:, relative paths, garbage): the value goes into public HTML.
 */
export function parseDanUrl(raw: string | undefined, name: string): string | null {
  const value = raw?.trim();
  if (!value) return null;
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`${name} must be an absolute URL, e.g. https://dan.example.com/login`);
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") throw new Error(`${name} must use http or https`);
  if (url.username || url.password || url.hash) throw new Error(`${name} must not contain credentials or a fragment`);
  return url.href;
}

/** Production builds must link to a public https address, never to a developer machine. */
export function checkDanUrlForBuild(href: string | null, name: string, production: boolean) {
  if (!href || !production) return;
  const u = new URL(href);
  if (LOOPBACK.test(u.hostname)) throw new Error(`${name} points to this machine in a production build`);
  if (u.protocol !== "https:") throw new Error(`${name} must use https in a production build`);
}
