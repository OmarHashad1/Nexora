"use server";

export async function getSubCategory({ categoryId }: { categoryId: string }) {
  const res = await fetch(
    `${process.env.API_URL}categories/${categoryId}/subcategories`,
    {
      cache: "no-store",
    }
  );
  const payload = await res.json();
  if (!res.ok)
    throw new Error(`${payload.message || "Something wrong went happening"}`);

  return payload;
}
