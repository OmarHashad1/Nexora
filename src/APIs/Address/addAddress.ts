"use server";
import { getToken } from "@/lib/getToken";
import addressInterface from "@/interfaces/address/address.interface";
export async function addAddress({
  name,
  details,
  phone,
  city,
}: addressInterface) {
  const token = await getToken();

  if (!token) throw new Error("Not Authorized");

  const res = await fetch(`${process.env.API_URL}addresses`, {
    method: "POST",
    cache: "no-store",
    body: JSON.stringify({ name, details, phone, city }),
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
