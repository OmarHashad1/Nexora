"use server";
import registerInterface from "@/interfaces/Auth/register.interface";
export async function createNewUser({
  name,
  email,
  password,
  rePassword,
  phone,
}: registerInterface) {
  const res = await fetch(`${process.env.API_URL}auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
      rePassword,
      phone,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to create account");
  }

  return data;
}
