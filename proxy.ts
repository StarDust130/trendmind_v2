import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 1. Establish the explicit whitelist of public routes.
// The (.*) regex ensures any sub-routes (like /help/contact) are also permitted.
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/help(.*)",
  "/legal(.*)",
  "/terms(.*)",
  "/privacy(.*)",
  "/api/webhooks(.*)", // CRITICAL: Always whitelist webhooks if you use Stripe/Clerk syncing
]);

export default clerkMiddleware(async (auth, req) => {
  // 2. Intercept the request. If it does NOT match the public whitelist, enforce login.
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
