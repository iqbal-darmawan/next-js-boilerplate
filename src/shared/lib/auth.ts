import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { $Enums, Role } from "@prisma/client";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name: string;
    username: string;
    photo_profile: string | null;
    role_id: number;
    role?: Role;
    status: $Enums.userStatus;
    createdAt: Date;
  }
  interface Session {
    user: User;
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: true,
  logger: {
    error(code, metadata) {
      console.error(code, metadata);
    },
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async authorize(credentials: any) {
        // Add logic here to look up the user from the credentials supplied
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        try {
          // ** Login API Call to match the user credentials and receive user data in response along with his role
          const res = await fetch(`${process.env.API_URL}/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
          });

          const data = await res.json();
          console.log("🚀 ~ authorize ~ data:", data);

          if (res.status === 401) {
            throw new Error(JSON.stringify(data));
          }

          if (res.status === 200) {
            /*
             * Please unset all the sensitive information of the user either from API response or before returning
             * user data below. Below return statement will set the user object in the token and the same is set in
             * the session which will be accessible all over the app.
             */
            return data.data;
          }

          return null;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
          throw new Error(e.message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user;
        return {
          ...token,
          ...u,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          name: token.name,
          email: token.email,
          username: token.username,
          photo_profile: token.photo_profile,
          role_id: token.role_id,
          role: token.role,
          id: token.id,
        },
      };
    },
  },
};
