import React from "react";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteItem } from "@/APIs/Cart/deleteItem";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
export default function CartDeleteBtn({ productId }: { productId: string }) {
  const queryClient = useQueryClient();
  const { mutate, isPending} = useMutation({
    mutationFn: deleteItem,
    mutationKey: ["deleteItem"],
    onSuccess: (data) => {
      toast.success(`${data.message || "Item deleted successfully"}.`);
      queryClient.invalidateQueries({ queryKey: ["getCart"] });
    },
    onError: (error) => {
      toast.error(`${error.message || "Failed to delete item"}.`);
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
          onClick={() => mutate({ productId })}
          size="icon-sm"
          className="bg-(--main) hover:bg-orange-700 text-white rounded-md transition-all duration-300 cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}
