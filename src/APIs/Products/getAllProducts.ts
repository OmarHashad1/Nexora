export async function getAllProducts() {
  const res = await fetch(`${process.env.API_URL}products`);
  if (!res.ok) throw new Error("Something wrong went happening!");
  const data = await res.json();
  return data;
}
