import { login } from "@/actions/auth/login.action";
import { authConfig } from "@/lib/auth/auth.config";
import NextAuth, { AuthError } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const result = await login(credentials);
        if (result.message) {
          const error = new AuthError();
          error.type = "CredentialsSignin";
          error.message = result.message;
          throw error;
        }
        return {
          token: result.token,
          ...result.user,
        };
      },
    }),
  ],
});
