"use server";
import { getToken } from "@/lib/getToken";

export async function updateItemCount({
  productId,
  count,
}: {
  productId: string;
  count: number;
}) {
  const token = await getToken();

  if (!token) throw new Error("You must be logged in to update the item count");

  const res = await fetch(`${process.env.API_URL}cart/${productId}`, {
    method: "PUT",
    headers: {
      token,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      count: count,
    }),
  });
  const payload = await res.json();
  if (!res.ok)
    throw new Error(`${payload.message || "Something wrong went happening"}`);

  return payload;
}
