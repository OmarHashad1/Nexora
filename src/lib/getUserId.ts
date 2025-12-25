"use server";

import { getToken } from "./getToken";

export const getUserId = async function () {
  const token = await getToken();

  if (!token) {
    console.log("getUserId: No token found");
    return null;
  }

  try {
    const res = await fetch(`${process.env.API_URL}auth/verifyToken`, {
      method: "GET",
      headers: {
        token,
      },
    });

    if (!res.ok) {
      console.error("getUserId: API returned error status:", res.status);
      return null;
    }

    const payload = await res.json();
    console.log("getUserId: VerifyToken response:", JSON.stringify(payload, null, 2));

    if (payload.message !== "verified") {
      console.log("getUserId: Token not verified");
      return null;
    }

   
    const userId = payload.decoded?.id;

    if (!userId) {
   
      return null;
    }

    return userId;
  } catch (err) {
    return null;
  }
};
