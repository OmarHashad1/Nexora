"use server";

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export const getToken = async function () {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();

  const sessionCookie = allCookies.find(cookie =>
    cookie.name.includes('next-auth.session-token') ||
    cookie.name.includes('__Secure-next-auth.session-token')
  );

  if (!sessionCookie) {
    return null;
  }

  const token = await decode({
    token: sessionCookie.value,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  return token?.token;
};
