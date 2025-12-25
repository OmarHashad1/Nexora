import React from "react";
import { getUserAddresses } from "@/APIs/Address/getUserAddresses";
import { getUserCart } from "@/APIs/Cart/getUserCart";
import CheckoutClient from "./CheckoutClient";

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ cartId: string }>;
}) {
  const { cartId } = await params;

  let addresses = null;
  let cart = null;
  let error = null;

  try {
    [addresses, cart] = await Promise.all([
      getUserAddresses(),
      getUserCart(),
    ]);
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load checkout data";
    console.log(err);
  }

  return (
    <CheckoutClient
      cartId={cartId}
      addresses={addresses}
      cart={cart}
      error={error}
    />
  );
}
