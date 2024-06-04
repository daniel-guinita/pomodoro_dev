import type { NextAuthConfig } from "next-auth";

export const publicRoute: string[] = [];

export const authConfig = {
  secret: process.env.NEXT_PUBLIC_SECRET,
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const isLoginRoute = nextUrl.pathname.startsWith("/login");
      const isRegisterRoute = nextUrl.pathname.startsWith("/register");
      const isLogoutRoute = nextUrl.pathname.startsWith("/logout");
      const isActivationRoute = nextUrl.pathname.startsWith("/activation");
      const isTeacherRoute = nextUrl.pathname.startsWith("/teacher");
      const isPublicRoute = publicRoute.includes(nextUrl.pathname);

      if (isLoginRoute || isRegisterRoute || isActivationRoute) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/", nextUrl));
        }
        return true;
      }

      if (!isLoggedIn && !isPublicRoute) {
        const redirectUrl = new URL("/login", nextUrl);
        const callbackUrl = nextUrl.pathname;
        if (callbackUrl !== "/") {
          redirectUrl.searchParams.append("callbackUrl", callbackUrl);
        }
        return Response.redirect(redirectUrl);
      }

      if (isLogoutRoute) {
        return true;
      }

      if (!auth) {
        return false;
      }

      const user = auth.user;

      if (!isTeacherRoute && user.role === "teacher") {
        return Response.redirect(new URL("/teacher", nextUrl));
      } else if (isTeacherRoute && user.role === "student") {
        return Response.redirect(new URL("/", nextUrl));
      }

      return true;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        return {
          ...token,
          user,
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      return {
        ...session,
        ...token,
      };
    },
  },
  session: {
    strategy: "jwt",
  },
  providers: [],
} satisfies NextAuthConfig;
