"use server";

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export const getUserId = async function () {
  const cookieStore = await cookies();
  const authToken =
    cookieStore.get("next-auth.session-token")?.value ||
    cookieStore.get("__Secure-next-auth.session-token")?.value;

  if (!authToken) {
    console.log("No auth token found");
    return null;
  }
  const token = await decode({
    token: authToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  console.log("User ID from token:", token?.user?._id);
  return token?.user?._id || null;
};
