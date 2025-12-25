"use server";
import loggedChangePasswordInterface from "@/interfaces/Auth/loggedChangePassword";
import { getToken } from "@/lib/getToken";

export async function changePassword({
  currentPassword,
  password,
  rePassword,
}: loggedChangePasswordInterface) {
  const token = await getToken();

  if (!token) throw new Error("Not Authenticated");
  const res = await fetch(`${process.env.API_URL}users/changeMyPassword`, {
    method: "PUT",
    headers: {
      token,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      currentPassword,
      password,
      rePassword,
    }),
  });
  if (!res.ok) throw new Error("Something wrong went happening");

  const data = await res.json();
  if (data?.errors?.msg) {
    throw new Error(data?.errors.msg);
  }
  return data;
}
