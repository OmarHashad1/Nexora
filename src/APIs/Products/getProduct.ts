"use server";

export async function getProduct(productId: string) {
  const res = await fetch(`${process.env.API_URL}products/${productId}`, {
    cache: "no-store",
  });
  const payload = await res.json();
  if (!res.ok)
    throw new Error(`${payload.message || "Something wrong went happening"}`);

  return payload;
}
