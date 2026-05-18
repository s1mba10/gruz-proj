import { NextResponse, type NextRequest } from "next/server";
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/app/lib/auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Страница логина и API логина — публичные.
  if (pathname === "/operator/login") return NextResponse.next();

  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/operator/login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  const payload = await verifySessionToken(token);
  if (!payload) {
    const url = req.nextUrl.clone();
    url.pathname = "/operator/login";
    url.searchParams.set("from", pathname);
    url.searchParams.set("expired", "1");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/operator/:path*"],
};
