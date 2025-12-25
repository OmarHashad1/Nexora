"use server";
import userFromInterface from "@/interfaces/Auth/userFrom.interface";
import { getToken } from "@/lib/getToken";

export async function updateInfo({ name, email, phone }: userFromInterface) {
  const token = await getToken();

  if (!token) throw new Error("Not Authenticated");
  const res = await fetch(`${process.env.API_URL}users/updateMe/`, {
    method: "PUT",
    headers: {
      token,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      phone,
    }),
  });
  const data = await res.json();

  if (data?.errors?.msg) {
    throw new Error(data?.errors.msg);
  }
  return data;
}
