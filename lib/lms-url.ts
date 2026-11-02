// Validation for NEXT_PUBLIC_LMS_URL, shared by next.config.ts (build-time check)
// and lib/lms.ts (link building). No framework imports so the config can load it.

const LOOPBACK = new Set(["localhost", "127.0.0.1", "[::1]"]);

/**
 * Returns the LMS base URL without a trailing slash, or null when unset.
 * Throws when the value is not a plain http(s) address: it is inlined into
 * public HTML, so credentials, query strings or fragments are refused.
 */
export function parseLmsUrl(raw: string | undefined): string | null {
  const value = raw?.trim();
  if (!value) return null;
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error("NEXT_PUBLIC_LMS_URL must be an absolute URL, e.g. https://lms.example.com");
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("NEXT_PUBLIC_LMS_URL must use http or https");
  }
  if (url.username || url.password || url.search || url.hash) {
    throw new Error("NEXT_PUBLIC_LMS_URL must not contain credentials, a query string or a fragment");
  }
  return (url.origin + url.pathname).replace(/\/+$/, "");
}

export function isLoopbackUrl(base: string): boolean {
  const host = new URL(base).hostname;
  return LOOPBACK.has(host) || host.endsWith(".localhost");
}

/**
 * Production builds (static export for hosting) must not link to a developer
 * machine or to plain http. LMS_URL_ALLOW_LOCAL=1 permits a loopback URL for
 * a local test of the exported site only.
 */
export function checkLmsUrlForBuild(base: string | null, env: { production: boolean; allowLocal: boolean }) {
  if (!base || !env.production) return;
  if (isLoopbackUrl(base)) {
    if (env.allowLocal) return;
    throw new Error(
      "NEXT_PUBLIC_LMS_URL points to this machine in a production build. Use the public LMS address, " +
        "or set LMS_URL_ALLOW_LOCAL=1 for a local test build only.",
    );
  }
  if (!base.startsWith("https://")) {
    throw new Error("NEXT_PUBLIC_LMS_URL must use https in a production build");
  }
}
