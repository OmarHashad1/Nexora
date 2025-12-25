"use client";
import React from "react";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { addToCart } from "@/APIs/Cart/addToCart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
export default function WishlistAddToCartBtn({
  productId,
}: {
  productId: string;
}) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["addToCart"],
    mutationFn: addToCart,
    onSuccess: (data) => {
      toast.success(
        `${data?.message || "Product added successfully to your cart!"}`
      );
      queryClient.invalidateQueries({ queryKey: ["addToCart"] });
    },
    onError: (error) => {
      toast.error(`${error?.message || "Something wrong went happening"}`);
    },
  });

  return (
    <div>
      {isPending ? (
        <Button size="sm" variant="default" className="" disabled>
          <Spinner />
        </Button>
      ) : (
        <Button
          onClick={() => mutate(productId)}
          className=" cursor-pointer bg-(--main) hover:bg-orange-700 "
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="font-semibold">Add to Cart</span>
        </Button>
      )}
    </div>
  );
}
