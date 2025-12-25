"use server";
import addressInterface from "@/interfaces/address/address.interface";
import { getToken } from "@/lib/getToken";
import { headers } from "next/headers";

export async function OnlinePayment(
  cartId: string,
  shippingAddress: addressInterface
) {
  const token = await getToken();

  if (!token) throw new Error("Not Authorized");

  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const redirectUrl = `${protocol}://${host}`;

  const res = await fetch(
    `${process.env.API_URL}orders/checkout-session/${cartId}?url=${redirectUrl}`,
    {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify({ shippingAddress }),
      headers: {
        token,
      },
    }
  );
  const payload = await res.json();
  if (!res.ok)
    throw new Error(`${payload.message || "Something wrong went happening"}`);

  return payload;
}
