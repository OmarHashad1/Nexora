import React from "react";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearAllCart } from "@/APIs/Cart/clearAllCart";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
export default function ClearAllCartBtn() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: clearAllCart,
    mutationKey: ["clearCart"],
    onSuccess: () => {
      toast.success(`Cart cleared successfully!`);
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
          onClick={() => mutate()}
          variant="destructive"
          className="cursor-pointer flex justify-center gap-2 items-center"
        >
          Clear All <Trash></Trash>
        </Button>
      )}
    </div>
  );
}
