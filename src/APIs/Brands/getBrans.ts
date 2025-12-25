"use server";

export async function getBrand({ brandId }: { brandId: string }) {
  const res = await fetch(`${process.env.API_URL}brands/${brandId}`, {
    cache: "no-store",
  });
  const payload = await res.json();
  if (!res.ok)
    throw new Error(`${payload.message || "Something wrong went happening"}`);

  return payload;
}
