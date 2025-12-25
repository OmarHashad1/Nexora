"use server";
import { getToken } from "@/lib/getToken";

export async function addToWishlist(productId: string) {
  try {
    const token = await getToken();

    if (!token) {
      return {
        success: false,
        message: "You must be logged in to add items to your wishlist"
      };
    }

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

    if (!res.ok) {
      return {
        success: false,
        message: payload.message || "Failed to add item to wishlist"
      };
    }

    return {
      success: true,
      ...payload
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "An unexpected error occurred"
    };
  }
}
