import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  //extending the session type to include user id to appease typescript
  interface Session {
    firebaseToken?: string;
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
