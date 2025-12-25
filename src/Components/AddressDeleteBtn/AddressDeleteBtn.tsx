import React from "react";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAddress } from "@/APIs/Address/removeAddress";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
export default function AddressDeleteBtn({ addressId }: { addressId: string }) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: deleteAddress,
    mutationKey: ["deleteItem"],
    onSuccess: (data) => {
      toast.success(`${data.message || "address deleted  successfully"}.`);
      queryClient.invalidateQueries({ queryKey: ["getUserAddress"] });
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
          size="icon-sm"
          className="cursor-pointer bg-(--main) hover:bg-orange-700 text-white rounded-md transition-all duration-300"
          onClick={() => mutate({ addressId })}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}
