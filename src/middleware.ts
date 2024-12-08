import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Extend the NextRequest type to include the Clerk `auth` property
type AuthenticatedNextRequest = NextRequest & {
  auth?: {
    isSignedIn: boolean;
    userId?: string;
    sessionId?: string;
    getToken: (options?: { template?: string }) => Promise<string | null>;
  };
};

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/stripe-webhook",
]);

export default clerkMiddleware(
  async (auth, request: AuthenticatedNextRequest) => {
    const { isSignedIn } = request.auth || {};

    // Protect private routes
    if (!isPublicRoute(request)) {
      await auth.protect();
    }

    // Redirect logic based on authentication status
    if (request.nextUrl.pathname === "/") {
      if (isSignedIn) {
        // Redirect logged-in users to `/dashboard`
        return NextResponse.redirect(new URL("/resumes", request.url));
      }
      // Otherwise, allow access to `/`
      return NextResponse.next();
    }

    // Redirect signed-in users from public routes to `/dashboard`
    if (isSignedIn && isPublicRoute(request)) {
      return NextResponse.redirect(new URL("/resumes", request.url));
    }

    return NextResponse.next();
  },
);

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
