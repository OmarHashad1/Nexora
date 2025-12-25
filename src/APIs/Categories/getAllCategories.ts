"use server";

export async function getAllCategories() {
  const res = await fetch(`${process.env.API_URL}categories`, {
    cache: "no-store",
  });
  const payload = await res.json();
  if (!res.ok)
    throw new Error(`${payload.message || "Something wrong went happening"}`);

  return payload;
}
