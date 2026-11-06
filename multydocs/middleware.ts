import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const WORKERS_DEV_HOST = "multydocs.developer-saumyasarma.workers.dev";
const CANONICAL_HOST = "https://multydocs.in";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";

  if (host === WORKERS_DEV_HOST) {
    const url = `${CANONICAL_HOST}${request.nextUrl.pathname}${request.nextUrl.search}`;
    const response = NextResponse.redirect(url, 301);
    response.headers.set("X-Robots-Tag", "noindex");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next).*)",
};
