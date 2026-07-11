import { NextResponse } from "next/server";

// Estado del mantenimiento controlado por variable de entorno (Vercel), no por
// código. Así main y develop no divergen: producción usa MAINTENANCE_MODE=true;
// previews y local, false (o sin definir).
const maintenance = process.env.MAINTENANCE_MODE === "true";

const LOCALES = ["en", "es"];
const DEFAULT_LOCALE = "en";
const LOCALE_COOKIE = "NEXT_LOCALE";
const ONE_YEAR = 60 * 60 * 24 * 365;

// Elige el primer idioma soportado según la cabecera Accept-Language.
function pickLocale(header) {
  if (!header) return DEFAULT_LOCALE;
  const wanted = header
    .split(",")
    .map((p) => p.split(";")[0].trim().toLowerCase());
  for (const w of wanted) {
    const base = w.split("-")[0];
    if (LOCALES.includes(base)) return base;
  }
  return DEFAULT_LOCALE;
}

export function middleware(req) {
  const { pathname, locale, search } = req.nextUrl;

  // Permitir la página de mantenimiento y los assets estáticos
  if (
    pathname.startsWith("/maintenance") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/icons") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  if (maintenance) {
    return NextResponse.rewrite(new URL("/maintenance", req.url));
  }

  // Detección de idioma por navegador (hecha aquí, no con el localeDetection de
  // Next, que entra en bucle al convivir con el middleware). Solo la primera
  // vez: si el usuario aún no ha elegido idioma y entró con el idioma por
  // defecto. La cookie NEXT_LOCALE (que también fija el botón de idioma)
  // preserva la elección y evita reevaluar en cada visita.
  const chosen = req.cookies.get(LOCALE_COOKIE)?.value;
  if (!chosen && locale === DEFAULT_LOCALE) {
    const preferred = pickLocale(req.headers.get("accept-language"));
    if (preferred !== DEFAULT_LOCALE) {
      const url = new URL(
        `/${preferred}${pathname === "/" ? "" : pathname}${search}`,
        req.url,
      );
      const res = NextResponse.redirect(url);
      res.cookies.set(LOCALE_COOKIE, preferred, { path: "/", maxAge: ONE_YEAR });
      return res;
    }
    const res = NextResponse.next();
    res.cookies.set(LOCALE_COOKIE, DEFAULT_LOCALE, {
      path: "/",
      maxAge: ONE_YEAR,
    });
    return res;
  }

  return NextResponse.next();
}
