import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // ✅ correction: শুধু value নেওয়া হয়েছে
  const isLoggedIn = request.cookies.get("token")?.value;

  // /about এ গেলে cookie সেট করবে
  if (request.nextUrl.pathname.startsWith("/about")) {
    response.cookies.set("token", "123abc", {
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });
    response.headers.set("my-custom-header", "sagor123")
  }

  // ✅ correction: /dashboard এ গেলে token না থাকলে redirect হবে
  if (!isLoggedIn && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/about/:path*",
    "/dashboard/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
