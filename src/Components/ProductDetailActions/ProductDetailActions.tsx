"use client";

import { useMemo } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Spinner } from "@/Components/ui/spinner";
import { addToCart } from "@/APIs/Cart/addToCart";
import { addToWishlist } from "@/APIs/Wishlist/addToWishlist";
import { getUserWishlist } from "@/APIs/Wishlist/getUserWishlist";
import { WishlistInterface } from "@/interfaces/Wishlist/wishlist.interface";
import { cn } from "@/lib/utils";

interface ProductDetailActionsProps {
  productId: string;
}

export default function ProductDetailActions({
  productId,
}: ProductDetailActionsProps) {
  const queryClient = useQueryClient();

  const { data: wishlistData } = useQuery<WishlistInterface>({
    queryKey: ["getWishlist"],
    queryFn: getUserWishlist,
    staleTime: 60 * 1000,
    retry: false,
  });

  const isInWishlist = useMemo(() => {
    if (!wishlistData?.data) return false;
    return wishlistData.data.some((item) => item.id === productId);
  }, [wishlistData, productId]);

  const addWishlistMutation = useMutation({
    mutationKey: ["addToWishlist"],
    mutationFn: addToWishlist,
    onSuccess: (data) => {
      toast.success(
        `${data?.message || "Product added successfully to your wishlist!"}`
      );
      queryClient.invalidateQueries({ queryKey: ["getWishlist"] });
    },
    onError: (error) => {
      toast.error(`${error?.message || "Something wrong went happening"}`);
    },
  });

  const handleWishlistClick = () => {
    addWishlistMutation.mutate(productId);
  };

  const addCartMutation = useMutation({
    mutationKey: ["addToCart"],
    mutationFn: addToCart,
    onSuccess: (data) => {
      toast.success(
        `${data?.message || "Product added successfully to your cart!"}`
      );
      queryClient.invalidateQueries({ queryKey: ["getCart"] });
    },
    onError: (error) => {
      toast.error(`${error?.message || "Something wrong went happening"}`);
    },
  });

  const isWishlistPending = addWishlistMutation.isPending;
  const isCartPending = addCartMutation.isPending;

  return (
    <div className="flex gap-4 pt-4">
      <Button
        onClick={() => addCartMutation.mutate(productId)}
        disabled={isCartPending}
        className="flex-1 bg-(--main) hover:bg-orange-700 text-white font-semibold py-6 text-lg cursor-pointer"
      >
        {isCartPending ? (
          <Spinner />
        ) : (
          <>
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </>
        )}
      </Button>

      <Button
        onClick={handleWishlistClick}
        disabled={isWishlistPending}
        variant="outline"
        className="p-6 border-2 border-(--main) text-(--main) hover:bg-(--main) hover:text-white transition-all duration-300"
      >
        {isWishlistPending ? (
          <Spinner />
        ) : (
          <Heart
            className={cn(
              "w-6 h-6 transition-all",
              isInWishlist && "fill-current"
            )}
          />
        )}
      </Button>
    </div>
  );
}
