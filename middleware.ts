import { withAuth } from "next-auth/middleware";

export default withAuth;

export const config = {
  //https://nextjs.org/docs/app/building-your-application/routing/middleware
  matcher: ["/protectedroute"], //routes that require the user to be logged in
};
