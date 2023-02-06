import { NextRequest, NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith("/_next") ||
    req.nextUrl.pathname.includes("/api/") ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return;
  }
  // if path is /wiki/, redirect to /wiki/:locale
  if (req.nextUrl.pathname === "/wiki") {
    const language =
      req.headers
        .get("accept-language")
        ?.split(",")?.[0]
        .split("-")?.[0]
        .toLowerCase() || "en";
    const redirUrl = req.nextUrl.clone();
    redirUrl.pathname = redirUrl.pathname + `/${language}`;
    return NextResponse.rewrite(redirUrl);
  }
  return;
}
