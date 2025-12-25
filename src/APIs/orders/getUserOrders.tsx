"use server";

import { getToken } from "@/lib/getToken";
import { getUserId } from "@/lib/getUserId";

export async function getUserOrders() {
  const token = await getToken();
  const userId = await getUserId();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const res = await fetch(`${process.env.API_URL}orders/user/${userId}`, {
    method: "GET",
    cache: "no-store",
    headers: {
      token: token || "",
    },
  });
  const payload = await res.json();


  if (!res.ok)
    throw new Error(`${payload.message || "Something wrong went happening"}`);

  return payload;
}
