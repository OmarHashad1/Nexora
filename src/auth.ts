import Credentials from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";


export const authOptions: NextAuthOptions = {
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const res = await fetch(`${process.env.API_URL}auth/signin`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });
        const payload = await res.json();
        console.log(payload);
        if (payload.message == "success") return payload;
        throw new Error(payload.message || "Something wrong went happen");
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }: { token: any; user: any }) => {
      if (user) {
        token.user = user.user;
        token.token = user.token;
      }
      return token;
    },
    session: ({ session, token }: { session: any; token: any }) => {
      session.user = token.user;
      session.userId = token.userId;
      return session;
    },
  },
};
