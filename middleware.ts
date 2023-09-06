import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  secretKey: process.env.CLERK_SECRET_KEY,
  publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  publicRoutes: [
    "/",
    "/search",
    "/communities",
    "/communities/:communityId",
    "/profile/:userId",
    "/api/webhook/clerk",
  ],
  ignoredRoutes: ["/api/webhook/clerk"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
