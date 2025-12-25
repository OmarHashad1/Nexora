import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateItemCount } from "@/APIs/Cart/updateItemCount";
import { Spinner } from "flowbite-react";

export default function UpdateCountBtns({
  productId,
  count,
}: {
  productId: string;
  count: number;
}) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: updateItemCount,
    mutationKey: ["updateCount"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getCart"] });
    },
  });
  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={() => mutate({ productId, count: count - 1 })}
        size="icon-sm"
        className="bg-(--main) hover:bg-orange-700 text-white rounded-md transition-all duration-300 cursor-pointer"
      >
        <Minus className="w-4 h-4" />
      </Button>

      <span className="text-white font-semibold text-lg min-w-10 text-center">
        {isPending ? <Spinner></Spinner> : count}
      </span>

      <Button
        onClick={() => mutate({ productId, count: count + 1 })}
        size="icon-sm"
        className="bg-(--main) hover:bg-orange-700 text-white rounded-md transition-all duration-300 cursor-pointer"
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
}
