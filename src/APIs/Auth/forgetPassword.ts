"use server";
import forgetPasswordInterface from "@/interfaces/Auth/forgetPassword.interface";

export async function forgetPassword({ email }: forgetPasswordInterface) {
  const res = await fetch(`${process.env.API_URL}auth/forgotPasswords`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });
  if (!res.ok) throw new Error("Something went wrong");
  const data = await res.json();

  if (data?.errors?.msg) {
    throw new Error(data?.errors.msg);
  }
  return data;
}
