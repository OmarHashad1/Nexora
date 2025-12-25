"use client";
import React from "react";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { addToCart } from "@/APIs/Cart/addToCart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
export default function AddToCartBtn({ productId }: { productId: string }) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["addToCart"],
    mutationFn: addToCart,
    onSuccess: (data) => {
      if (data.success === false) {
        toast.error(data.message);
        return;
      }
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
        <Button
          size="sm"
          variant="default"
          className="absolute bottom-65 left-1/2 -translate-x-1/2 z-10 opacity-0 group-hover:opacity-100"
          disabled
        >
          <Spinner />
        </Button>
      ) : (
        <Button
          onClick={() => mutate(productId)}
          className="absolute bottom-65 cursor-pointer left-1/2 -translate-x-1/2 z-10 bg-(--main) hover:bg-orange-700 opacity-0 group-hover:opacity-100"
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="font-semibold">Add to Cart</span>
        </Button>
      )}
    </div>
  );
}
