import { updateSession } from "@/utils/supabase/middleware";
import { type NextRequest } from "next/server";

/*
Be careful when protecting pages. The server gets the user session from the cookies, which can be spoofed by anyone.

Always use supabase.auth.getUser() to protect pages and user data.

Never trust supabase.auth.getSession() inside server code such as middleware. It isn't guaranteed to revalidate the Auth token.

It's safe to trust getUser() because it sends a request to the Supabase Auth server every time to revalidate the Auth token.

*/

export async function middleware(request: NextRequest) {
  // Step 1: Update the session and get the initial response
  const response = await updateSession(request);

  // Step 2: Create or modify headers and set "x-current-path"
  response.headers.set("x-current-path", request.nextUrl.pathname);

  // Step 3: Return the modified supabaseResponse
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|sign-up|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
