"use server";
import forgetPasswordCodeInterface from "@/interfaces/Auth/forgetPasswordCode.interface";

export async function verifyResetCode({
  resetCode,
}: forgetPasswordCodeInterface) {
  const res = await fetch(`${process.env.API_URL}auth/verifyResetCode`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      resetCode,
    }),
  });
  if (!res.ok) throw new Error("Something went wrong");
  const data = await res.json();

  if (data?.errors?.msg) {
    throw new Error(data?.errors.msg);
  }
  return data;
}
