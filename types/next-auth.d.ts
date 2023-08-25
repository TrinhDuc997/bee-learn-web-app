import { JWT } from "next-auth/jwt";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    access;
    user: {
      address: string;
      id?: string;
      role?: string;
      hierarchicalArrayOfWords: number[];
      courseLearned: any[];
      tags: Array<{
        _id?: string;
        title: string;
        description?: string;
      }>;
      // token?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    token?: string;
  }
}
