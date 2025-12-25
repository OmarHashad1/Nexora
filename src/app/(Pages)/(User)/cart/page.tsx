"use client";
import React from "react";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserCart } from "@/APIs/Cart/getUserCart";
import { Spinner } from "@/Components/ui/spinner";
import { CartInterface } from "@/interfaces/Cart/cart.interface";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/Components/ui/button";
import Link from "next/link";
import CartItem from "@/Components/CartItem/CartItem";
import { Separator } from "@/Components/ui/separator";
import ClearAllCartBtn from "@/Components/clearAllCartBtn/ClearAllCartBtn";
export default function Page() {
  const queryClient = useQueryClient();

  React.useMemo(() => {
    queryClient.removeQueries({ queryKey: ["getCart"] });
  }, [queryClient]);

  const { data, isLoading, isError, error } = useQuery<CartInterface>({
    queryKey: ["getCart"],
    queryFn: getUserCart,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: "always",
  });

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  if (isError) {
    return toast.error(`${error || "Something wrong went happening"}`);
  }

  if (data?.numOfCartItems == 0) {
    return (
      <div className="flex justify-center items-center flex-col gap-5">
        <div className="icon">
          <ShoppingCart size={100}></ShoppingCart>
        </div>
        <h2 className="font-bold text-3xl text-center">
          Your Cart is <span className="text-(--main)">Empty</span>!
        </h2>
        <div className="flex justify-center items-center gap-2 flex-col md:flex-row">
          <Link href="/products">
            <Button
              variant="default"
              className="bg-(--main) hover:bg-orange-700 cursor-pointer"
            >
              Start Shopping
            </Button>
          </Link>
          <Link href="/categories">
            <Button
              variant="default"
              className="bg-white text-(--main) hover:bg-gray-200 cursor-pointer"
            >
              Categories
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container flex justify-start items-center flex-col gap-6 py-8">
      <div className="text-center w-full">
        <h2 className="font-bold uppercase text-4xl relative group py-5">
          Shopping Cart
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-(--main)"></span>
        </h2>
      </div>
      <div className="flex justify-between flex-col lg:flex-row items-start w-full gap-5">
        <div className="w-full max-w-4xl space-y-4">
          {data?.data.products.map((item) => (
            <CartItem
              key={item._id}
              id={item.product.id}
              title={item.product.title}
              brand={item.product.brand.name}
              price={item.price}
              count={item.count}
              imageCover={item.product.imageCover}
            />
          ))}
        </div>

        <div className="w-full lg:w-150 max-w-4xl bg-[#252525] border border-white/5 rounded-[--radius] p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-white text-lg font-semibold">
              Total Items:
            </span>
            <span className="text-white text-lg">{data?.numOfCartItems}</span>
          </div>
          <div className="flex justify-between items-start mb-6 gap-3 flex-col">
            <div className="flex justify-between items-center w-full">
              <span className="block text-white text-lg font-bold">
                Subtotal:
              </span>
              <span className="block text-(--main) text-2xl font-light">
                EGP {data?.data.totalCartPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center w-full">
              <span className="text-white text-lg font-bold">Shipping:</span>
              <span className="text-(--main) text-2xl font-light ">
                <span className="text-green-300">Free</span>
              </span>
            </div>
            <Separator></Separator>
            <div className="flex justify-between items-center w-full">
              <span className="block text-white text-xl font-bold">Total:</span>
              <span className="block text-(--main) text-2xl font-light">
                EGP {data?.data.totalCartPrice.toFixed(2)}
              </span>
            </div>
          </div>
          <Link href={`/checkout/${data?.cartId}`}>
            <Button className="cursor-pointer w-full bg-(--main) hover:bg-orange-700 text-white font-semibold py-6 text-lg">
              Proceed to Checkout
            </Button>
          </Link>
        </div>
      </div>
      <div className="w-full flex justify-start items-center">
        <ClearAllCartBtn></ClearAllCartBtn>
      </div>
    </div>
  );
}
