import { NextResponse } from "next/server";
import { getSession, updateSession } from "./app/lib/actions";
import { redirect } from "next/dist/server/api-utils";
import { cookies } from "next/headers";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const sess = await getSession();
 // if (sess) await updateSession(request)
  
  if (request.nextUrl.pathname.startsWith("/account") && !sess) {
    // return NextResponse.redirect(new URL("/login", request.url));
  }
  if (request.nextUrl.pathname.startsWith("/login") && sess) {
    return NextResponse.redirect(new URL("/account", request.url));
  }
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/account/:path*",
    "/login/",
  ],
};