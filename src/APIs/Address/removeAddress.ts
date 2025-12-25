"use server";
import { getToken } from "@/lib/getToken";

export async function deleteAddress({ addressId }: { addressId: string }) {
  const token = await getToken();

  if (!token) throw new Error("You must be logged in to remove the address");

  const res = await fetch(`${process.env.API_URL}addresses/${addressId}`, {
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
