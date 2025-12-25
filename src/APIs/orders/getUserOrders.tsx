"use server";

import { getUserId } from "@/lib/getUserId";
import { OrderResponseInterface } from "@/interfaces/orders/orderResponse.interface";

export async function getUserOrders(): Promise<OrderResponseInterface> {
  const userId = await getUserId();

  console.log("getUserOrders: userId =", userId);

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const url = `${process.env.API_URL}orders/user/${userId}`;
  console.log("getUserOrders: Fetching from URL:", url);

  const res = await fetch(url, {
    method: "GET",
    cache: "no-store",
  });

  const payload = await res.json();
  console.log("getUserOrders: API Response:", JSON.stringify(payload, null, 2));

  if (!res.ok) {
    throw new Error(`${payload.message || "Something wrong went happening"}`);
  }

  // The API might return the orders directly as an array, or wrapped in a data property
  // Handle both cases
  if (Array.isArray(payload)) {
    console.log("getUserOrders: Payload is array, wrapping in data property");
    return {
      results: payload.length,
      data: payload,
    };
  }

  // If payload already has a data property, return as is
  if (payload.data) {
    console.log("getUserOrders: Payload has data property, returning as is");
    return payload;
  }

  // Otherwise, assume the response structure is already correct
  console.log("getUserOrders: Returning payload as is");
  return payload;
}
