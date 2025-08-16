
import next from "next";
import { NextRequest, NextResponse } from "next/server";

// export function middleware(request: NextRequest) {
//   //logic
//   const isLoggedIn = request.cookies.get("token");

//   if (!isLoggedIn && request.nextUrl.pathname.startsWith("/dashboard")) {
//     return NextResponse.redirect(new URL("/auth/login", request.url));
//   }
//   return NextResponse.next();
// }

// export const config = {
//   matcher: "/dashboard",
// };

//redirect Conditional Statements
// export function middleware(request: NextRequest) {
//   if (request.nextUrl.pathname.startsWith("/about")) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }
// }

//rewrite
// export function middleware(request: NextRequest) {
//   if (request.nextUrl.pathname.startsWith("/about")) {
//     return NextResponse.rewrite(new URL("/", request.url));
//   }
// }

export function middleware(request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: ["/about/:path*", "/dashboard/:path*"],
};