import { NextResponse } from "next/server";

// Estado del mantenimiento controlado por variable de entorno (Vercel), no por
// código. Así main y develop dejan de divergir: producción usa
// MAINTENANCE_MODE=true; previews y local, false (o sin definir).
const maintenance = process.env.MAINTENANCE_MODE === "true";

export function middleware(req) {
  const { pathname } = req.nextUrl;

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

  return NextResponse.next();
}
