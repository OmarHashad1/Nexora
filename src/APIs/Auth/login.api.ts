"use server";
import loginInterface from "@/interfaces/Auth/login.interface";
export async function authenticateUser({ email, password }: loginInterface) {
  const res = await fetch(`${process.env.API_URL}auth/signin`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  console.log(res);
}
