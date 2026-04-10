import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  // Ignore api, _next/static, _next/image, favicon.ico, and other static assets
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|studio|illustrations|svg|audios|png|icon.png|apple-icon.png|shortcut-icon.png|og-image.png|twitter-image.png|manifest.json|.well-known|opensearch.xml).*)",
  ],
};
