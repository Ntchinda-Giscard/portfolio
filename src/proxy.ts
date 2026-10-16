import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, LOCALE_COOKIE, type Locale } from "@/lib/i18n";

/**
 * Every page lives under /en or /fr. A URL without one ("/", or an old link
 * such as "/projects/wazalink") is redirected to the visitor's language: the
 * one they last picked with the switch, else the best match in their
 * browser's Accept-Language, else English.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (isLocale(pathname.split("/")[1])) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

function preferredLocale(request: NextRequest): Locale {
  const chosen = request.cookies.get(LOCALE_COOKIE)?.value;
  if (isLocale(chosen)) return chosen;

  // "fr-CM,fr;q=0.9,en;q=0.8" -> the highest-weighted language the site speaks.
  const ranked = (request.headers.get("accept-language") ?? "")
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().toLowerCase().split(";");
      const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
      return { lang: tag.split("-")[0], weight: q ? Number(q.slice(2)) || 0 : 1 };
    })
    .filter((entry) => entry.weight > 0)
    .sort((a, b) => b.weight - a.weight);

  const match = ranked.find((entry) => isLocale(entry.lang))?.lang;
  return isLocale(match) ? match : defaultLocale;
}

export const config = {
  // Pages only: not Next's own assets, not files from /public (anything with a dot).
  matcher: ["/((?!_next/|.*\\..*).*)"],
};
