"use client";

import React, { useState } from "react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@/Components/ui/spinner";
import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
} from "@/Components/ui/form";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import addressInterface from "@/interfaces/address/address.interface";
import { addressFormSchema } from "@/Schemas/address.schema";
import { addAddress } from "@/APIs/Address/addAddress";
import AddressItem from "@/Components/AddressItem/AddressItem";
import { addressInfo } from "@/interfaces/address/addressResponse.interface";

interface AddressManagerProps {
  addresses: addressInfo[];
}

export default function AddressManager({ addresses }: AddressManagerProps) {
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      name: "",
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(addressFormSchema),
  });

  const onSubmit = async function (data: addressInterface) {
    setLoading(true);
    try {
      await addAddress(data);
      toast.success("Address Added Successfully!");
      form.reset();
      setOpenDialog(false);
      queryClient.invalidateQueries({ queryKey: ["getUserAddress"] });
      window.location.reload();
    } catch (err: any) {
      toast.error(err.message || "Something wrong went happening");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-6">Address</h2>

      <div className="space-y-4 mb-6">
        {addresses?.map((address) => (
          <AddressItem
            key={address._id}
            id={address._id}
            name={address.name}
            details={address.details}
            phone={address.phone}
            city={address.city}
          />
        ))}
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <Button
            className="cursor-pointer bg-(--main) hover:bg-orange-700 transition-all duration-300"
            variant="default"
          >
            Add Address
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle>Add New Address</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Form {...form}>
              <form
                className="flex flex-col gap-5"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="name"
                          type="text"
                          className="rounded-lg border-nexora-orange border-2 h-12"
                          placeholder="Home"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="details"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Details</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="details"
                          type="text"
                          className="rounded-lg border-nexora-orange border-2 h-12"
                          placeholder="Apartment 3"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="phone"
                          type="text"
                          className="rounded-lg border-nexora-orange border-2 h-12"
                          placeholder="01000000000"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="city"
                          type="text"
                          className="rounded-lg border-nexora-orange border-2 h-12"
                          placeholder="Cairo"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {loading ? (
                  <Button size="sm" variant="default" disabled>
                    <Spinner />
                  </Button>
                ) : (
                  <Button
                    variant="default"
                    type="submit"
                    className="w-full text-white bg-(--main) hover:bg-orange-700 cursor-pointer transition-all duration-300"
                  >
                    Add Address
                  </Button>
                )}
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
