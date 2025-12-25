"use server";
import { getToken } from "@/lib/getToken";

export async function getUserWishlist() {
  const token = await getToken();

  if (!token) throw new Error("Not Authenticated");

  const res = await fetch(`${process.env.API_URL}wishlist`, {
    cache: "no-store",
    headers: {
      token,
      "content-type": "application/json",
    },
  });
  const payload = await res.json();
  if (!res.ok)
    throw new Error(`${payload.message || "Something wrong went happening"}`);

  return payload;
}
