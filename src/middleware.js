import { NextResponse } from "next/server";

// Producción (main): mantenimiento ACTIVADO. Reescribe todo a /maintenance.
// (En develop este flag está en false; ver nota abajo sobre el matcher.)
const maintenance = true;

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
