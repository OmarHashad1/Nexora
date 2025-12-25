"use client";
import React from "react";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Spinner } from "@/Components/ui/spinner";
import { WishlistInterface } from "@/interfaces/Wishlist/wishlist.interface";
import { ShoppingBasket } from "lucide-react";
import { Button } from "@/Components/ui/button";
import Link from "next/link";
import WishListItem from "@/Components/wishlistItem/WishlistItem";
import { getUserWishlist } from "@/APIs/Wishlist/getUserWishlist";
export default function Page() {
  const queryClient = useQueryClient();

  React.useMemo(() => {
    queryClient.removeQueries({ queryKey: ["getWishlist"] });
  }, [queryClient]);

  const { data, isLoading, isError, error } = useQuery<WishlistInterface>({
    queryKey: ["getWishlist"],
    queryFn: getUserWishlist,
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

  if (data?.count == 0) {
    return (
      <div className="flex justify-center items-center flex-col gap-5">
        <div className="icon">
          <ShoppingBasket size={100}></ShoppingBasket>
        </div>
        <h2 className="font-bold text-3xl text-center">
          Your Wishlist is <span className="text-(--main)">Empty</span>!
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
          Wishlist
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-(--main)"></span>
        </h2>
      </div>
      <div className="flex justify-between flex-col lg:flex-row items-center w-full gap-5">
        <div className="w-full max-w-4xl space-y-4 mx-auto">
          {data?.data && Array.isArray(data.data) ? (
            data.data.map((item) => {
              if (!item) return null;
              return (
                <WishListItem
                  key={item._id}
                  id={item.id}
                  title={item.title}
                  brand={item.brand?.name || "Unknown"}
                  price={item.price}
                  imageCover={item.imageCover}
                />
              );
            })
          ) : (
            <p className="text-white">No wishlist data available</p>
          )}
        </div>
      </div>
    </div>
  );
}
