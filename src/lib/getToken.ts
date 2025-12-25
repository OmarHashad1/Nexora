"use server";

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export const getToken = async function () {
  const cookieName =
    process.env.NODE_ENV === "production"
      ? "__Secure-next-auth.session-token"
      : "next-auth.session-token";
  const authToken = (await cookies()).get(cookieName)?.value;

  if (!authToken) {
    return null;
  }
  const token = await decode({
    token: authToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  return token?.token;
};
