import { NextResponse } from "next/server";

const maintenance = false;

export function middleware(req) {
  if (maintenance) {
    return NextResponse.rewrite(new URL("/maintenance", req.url));
  }
  return NextResponse.next();
}

// Evita que el middleware corra sobre rutas internas de Next e i18n
// (lo que provocaba el bucle de redirección /es -> /es).
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|maintenance|.*\\..*).*)",
  ],
};
