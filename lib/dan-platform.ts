// Links from the website to Dan Platform (a separate, independent application).
// Single source of truth for its address. Both values are public (inlined into the HTML), never secrets.
//   NEXT_PUBLIC_DAN_PLATFORM_URL        public home of Dan Platform (optional; falls back to the login page)
//   NEXT_PUBLIC_DAN_PLATFORM_LOGIN_URL  its real login page (https://<dan-platform-host>/<login route>)
// Unset = no link is rendered anywhere (no fake or localhost URL).
import { parseDanUrl } from "./dan-platform-url";

const LOGIN = parseDanUrl(process.env.NEXT_PUBLIC_DAN_PLATFORM_LOGIN_URL, "NEXT_PUBLIC_DAN_PLATFORM_LOGIN_URL");
const HOME = parseDanUrl(process.env.NEXT_PUBLIC_DAN_PLATFORM_URL, "NEXT_PUBLIC_DAN_PLATFORM_URL");

export const danLoginHref: string | null = LOGIN ?? HOME;
export const danHomeHref: string | null = HOME ?? LOGIN;
