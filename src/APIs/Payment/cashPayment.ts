"use server";
import addressInterface from "@/interfaces/address/address.interface";
import { getToken } from "@/lib/getToken";

export async function cashPayment(
  cartId: string,
  shippingAddress: addressInterface
) {
  const token = await getToken();

  if (!token) throw new Error("Not Authorized");

  const res = await fetch(
    `${process.env.API_URL}orders/${cartId}`,
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
