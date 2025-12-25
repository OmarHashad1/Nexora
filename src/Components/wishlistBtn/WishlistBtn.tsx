"use client"
import { useMemo } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { addToWishlist } from "@/APIs/Wishlist/addToWishlist";
import { deleteItem } from "@/APIs/Wishlist/deleteItem";
import { getUserWishlist } from "@/APIs/Wishlist/getUserWishlist";
import { WishlistInterface } from "@/interfaces/Wishlist/wishlist.interface";
import { cn } from "@/lib/utils";

export default function WishlistBtn({ productId }: { productId: string }) {
  const queryClient = useQueryClient();

  // Read wishlist data from cache
  const { data: wishlistData } = useQuery<WishlistInterface>({
    queryKey: ["getWishlist"],
    queryFn: getUserWishlist,
    staleTime: 60 * 1000, // 1 minute
    retry: false, // Don't retry if user is not authenticated
  });

  // Check if product is in wishlist
  const isInWishlist = useMemo(() => {
    if (!wishlistData?.data) return false;
    return wishlistData.data.some(item => item.id === productId);
  }, [wishlistData, productId]);

  // Add to wishlist mutation
  const addMutation = useMutation({
    mutationKey: ["addToWishlist"],
    mutationFn: addToWishlist,
    onSuccess: (data) => {
      if (data.success === false) {
        toast.error(data.message);
        return;
      }
      toast.success(
        `${data?.message || "Product added successfully to your wishlist!"}`
      );
      queryClient.invalidateQueries({ queryKey: ["getWishlist"] });
    },
    onError: (error) => {
      toast.error(`${error?.message || "Something wrong went happening"}`);
    },
  });

  // Remove from wishlist mutation
  const removeMutation = useMutation({
    mutationKey: ["removeFromWishlist"],
    mutationFn: deleteItem,
    onSuccess: (data) => {
      toast.success(
        `${data?.message || "Product removed from your wishlist!"}`
      );
      queryClient.invalidateQueries({ queryKey: ["getWishlist"] });
    },
    onError: (error) => {
      toast.error(`${error?.message || "Something wrong went happening"}`);
    },
  });

  const isPending = addMutation.isPending || removeMutation.isPending;

  const handleClick = () => {
    if (isInWishlist) {
      removeMutation.mutate({ productId });
    } else {
      addMutation.mutate(productId);
    }
  };
  return (
    <div>
      {isPending ? (
        <Button
          size="sm"
          variant="default"
          className="absolute top-3 right-3 p-2.5"
          disabled
        >
          <Spinner />
        </Button>
      ) : (
        <Button
          onClick={handleClick}
          className={cn(
            "cursor-pointer absolute top-3 right-3 p-2.5 rounded-md transition-all duration-300 z-10 bg-(--main) hover:bg-orange-700",
            isInWishlist ? "" : "text-white hover:text-white"
          )}
        >
          <Heart
            className={cn(
              "w-5 h-5 transition-all text-white",
              isInWishlist && "fill-current"
            )}
          />
        </Button>
      )}
    </div>
  );
}
