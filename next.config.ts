import type { NextConfig } from "next";
import { checkLmsUrlForBuild, parseLmsUrl } from "./lib/lms-url";
import { checkDanUrlForBuild, parseDanUrl } from "./lib/dan-platform-url";

// Public LMS address for the "Log in" / "Sign up" / "Courses" links (see .env.example).
// Malformed values always fail; production builds also refuse localhost and plain http.
checkLmsUrlForBuild(parseLmsUrl(process.env.NEXT_PUBLIC_LMS_URL), {
  production: process.env.NODE_ENV === "production",
  allowLocal: process.env.LMS_URL_ALLOW_LOCAL === "1",
});

// Dan Platform links (see lib/dan-platform.ts): same rules, https only in production builds.
for (const name of ["NEXT_PUBLIC_DAN_PLATFORM_URL", "NEXT_PUBLIC_DAN_PLATFORM_LOGIN_URL"]) {
  checkDanUrlForBuild(parseDanUrl(process.env[name], name), name, process.env.NODE_ENV === "production");
}

// Static export: `npm run build` produces a plain `out/` folder
// that can be uploaded to any hosting (cPanel, Nginx, S3...).
// NEXT_PUBLIC_BASE_PATH is set when the site lives in a sub-folder (GitHub Pages: "/<repo>").
const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
