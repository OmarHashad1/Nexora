"use server";
import { getToken } from "@/lib/getToken";
export async function addToWishlist(productId: string) {
  const token = await getToken();

  if (!token)
    throw new Error("You must be logged in to add items to your wishlist");

  const res = await fetch(`${process.env.API_URL}wishlist`, {
    method: "POST",
    cache: "no-store",  
    body: JSON.stringify({ productId }),
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
