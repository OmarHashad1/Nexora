"use server";
import resetPasswordInterface from "@/interfaces/Auth/resetPassword.interface";

export async function resetPassword({
  email,
  password,
}: resetPasswordInterface & { email: string }) {
  const res = await fetch(`${process.env.API_URL}auth/resetPassword`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email,
      newPassword: password,
    }),
  });
  if (!res.ok) throw new Error("Something went wrong");
  const data = await res.json();

  if (data?.errors?.msg) {
    throw new Error(data?.errors.msg);
  }
  return data;
}
