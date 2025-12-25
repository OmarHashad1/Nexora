"use server";
import { getToken } from "@/lib/getToken";

export async function clearAllCart() {
  const token = await getToken();

  if (!token)
    throw new Error("You must be logged in to remove all the items from the cart");

  const res = await fetch(`${process.env.API_URL}cart`, {
    method: "DELETE",
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
