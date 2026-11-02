// Links from the website to the Hi Daniel! LMS (a separate application).
// NEXT_PUBLIC_LMS_URL is inlined into the static HTML at build time: it holds the
// public LMS address only, never an API key or any other secret.
// Unset = the LMS is not public yet; LMS buttons then lead to the /lms/ product page.
import { parseLmsUrl } from "./lms-url";
import { lmsProductPath, type Locale } from "@/content";

export const LMS_URL = parseLmsUrl(process.env.NEXT_PUBLIC_LMS_URL);

export type LmsPath = "/" | "/login" | "/register" | "/courses";

/** Absolute LMS URL for `path`, or null when no LMS address is configured. */
export function lmsHref(path: LmsPath): string | null {
  if (!LMS_URL) return null;
  return path === "/" ? `${LMS_URL}/` : LMS_URL + path;
}

/**
 * Content files write LMS destinations as "lms:/login". Everything else
 * ("#section", "/blog/", absolute URLs) is returned unchanged.
 */
export function resolveHref(href: string, locale: Locale): string {
  if (!href.startsWith("lms:")) return href;
  return lmsHref(href.slice(4) as LmsPath) ?? lmsProductPath[locale];
}
