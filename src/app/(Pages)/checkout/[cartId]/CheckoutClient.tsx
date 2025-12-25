"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/Components/ui/button";
import CheckoutClientProps from "@/interfaces/checkout/checkoutClientProps.interface";
import { addressInfo } from "@/interfaces/address/addressResponse.interface";
import { OnlinePayment } from "@/APIs/Payment/onlinePayment";
import { Spinner } from "@/Components/ui/spinner";
export default function CheckoutClient({
  cartId,
  addresses,
  cart,
  error,
}: CheckoutClientProps) {
  const [selectedAddress, setSelectedAddress] = useState<addressInfo | null>(
    null
  );

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("cash");

  const onSubmit = async function () {
    setLoading(true);
    try {
      const payload = await OnlinePayment(cartId, selectedAddress);
      console.log(payload);
      if (payload?.status == "success") {
        window.location.href = payload.session.url;
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container min-h-screen py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Shipping Address</h2>

          {error ? (
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg">
              {error}
            </div>
          ) : addresses && addresses.data && addresses.data.length > 0 ? (
            <div className="space-y-4">
              {addresses.data.map((address) => (
                <div
                  key={address._id}
                  onClick={() => setSelectedAddress(address)}
                  className={`border rounded-lg p-6 hover:border-nexora-orange transition-colors cursor-pointer bg-gray-900/50 ${
                    selectedAddress?._id === address._id
                      ? "border-nexora-orange"
                      : "border-gray-700"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">
                        {address.name}
                      </h3>
                      <p className="text-gray-400 mb-2">{address.details}</p>
                      <p className="text-gray-400 mb-1">
                        <span className="font-medium">City:</span>{" "}
                        {address.city}
                      </p>
                      <p className="text-gray-400">
                        <span className="font-medium">Phone:</span>{" "}
                        {address.phone}
                      </p>
                    </div>
                    <input
                      type="radio"
                      name="selectedAddress"
                      value={address._id}
                      checked={selectedAddress?._id === address._id}
                      onChange={() => setSelectedAddress(address)}
                      className="mt-1 w-5 h-5 text-orange-500 focus:ring-orange-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-gray-700 rounded-lg p-8 text-center bg-gray-900/50">
              <p className="text-gray-400">
                No addresses found. Please add an address to continue.
              </p>
            </div>
          )}
          <div>
            <Link href="/profile/address">
              <Button
                variant="default"
                className="cursor-pointer bg-orange-500 hover:bg-orange-700 transition-all duration-300"
              >
                Add Address
              </Button>
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>

            <div className="space-y-3">
              <div
                onClick={() => setPaymentMethod("cash")}
                className={`border rounded-lg p-4 hover:border-nexora-orange transition-colors cursor-pointer bg-gray-900/50 ${
                  paymentMethod === "cash"
                    ? "border-nexora-orange"
                    : "border-gray-700"
                }`}
              >
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 text-orange-500 focus:ring-orange-500 mr-3"
                  />
                  <div>
                    <p className="font-semibold">Cash on Delivery</p>
                    <p className="text-sm text-gray-400">
                      Pay when you receive your order
                    </p>
                  </div>
                </label>
              </div>

              <div
                onClick={() => setPaymentMethod("card")}
                className={`border rounded-lg p-4 hover:border-nexora-orange transition-colors cursor-pointer bg-gray-900/50 ${
                  paymentMethod === "card"
                    ? "border-nexora-orange"
                    : "border-gray-700"
                }`}
              >
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 text-orange-500 focus:ring-orange-500 mr-3"
                  />
                  <div>
                    <p className="font-semibold">Credit/Debit Card</p>
                    <p className="text-sm text-gray-400">
                      Pay securely with your card
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {cart && cart.data && (
            <div className="bg-[#252525] border border-white/5 rounded-[--radius] p-6">
              <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-400">
                  <span>Items ({cart.numOfCartItems})</span>
                  <span>${cart.data.totalCartPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-gray-700 pt-3 mt-3 flex justify-between text-white font-bold text-xl">
                  <span>Total</span>
                  <span className="text-(--main)">
                    ${cart.data.totalCartPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="border-t border-gray-700 pt-6 mt-6">
            {loading ? (
              <div className="flex justify-center items-center w-full">
                <Button size="lg" variant="default" className="" disabled>
                  <Spinner />
                </Button>
              </div>
            ) : (
              <button
                onClick={onSubmit}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={
                  !addresses || addresses.data.length === 0 || !selectedAddress
                }
              >
                Place Order
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
