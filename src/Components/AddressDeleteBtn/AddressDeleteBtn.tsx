"use client";
import React from "react";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { deleteAddress } from "@/APIs/Address/removeAddress";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { useRouter } from "next/navigation";

export default function AddressDeleteBtn({ addressId }: { addressId: string }) {
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: deleteAddress,
    mutationKey: ["deleteItem"],
    onSuccess: (data) => {
      toast.success(`${data.message || "Address deleted successfully"}.`);
      router.refresh();
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
