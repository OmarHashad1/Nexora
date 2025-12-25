"use client";

import React, { useState } from "react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userFromSchema } from "@/Schemas/userFrom.schema";
import userFromInterface from "@/interfaces/Auth/userFrom.interface";
import { Spinner } from "@/Components/ui/spinner";
import loggedChangePasswordInterface from "@/interfaces/Auth/loggedChangePassword";
import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
} from "@/Components/ui/form";
import { updateInfo } from "@/APIs/Auth/updateInfo";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { loggedChangePassword } from "@/Schemas/loggedChangePassowrd.schema";
import { changePassword } from "@/APIs/Auth/changeLoggedUserPassword";

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [changePasswordLoading, setChangePasswordLoading] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
    resolver: zodResolver(userFromSchema),
  });

  const changePasswordForm = useForm({
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(loggedChangePassword),
  });

  const onSubmit = async function (data: userFromInterface) {
    setLoading(true);
    try {
      await updateInfo(data);
      toast.success("Profile updated successfully");
      form.reset();
    } catch (err: any) {
      toast.error(err.message || "Something wrong went happening");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async function (
    data: loggedChangePasswordInterface
  ) {
    setChangePasswordLoading(true);
    try {
      await changePassword(data);
      toast.success("Password changed successfully!");
      changePasswordForm.reset();
      setOpenDialog(false);
    } catch (err: any) {
      toast.error(err.message || "Something wrong went happening");
    } finally {
      setChangePasswordLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-6">User Information</h2>
      <div className="space-y-6">
        <div className="space-y-2"></div>
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
                      placeholder="Omar Hashad"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      className="rounded-lg border-nexora-orange border-2 h-12"
                      placeholder="omar@example.com"
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
                      type="tel"
                      className="rounded-lg border-nexora-orange border-2 h-12"
                      placeholder="01000000000"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center">
              {loading ? (
                <Button size="sm" variant="default" disabled>
                  <Spinner />
                </Button>
              ) : (
                <Button
                  variant="default"
                  type="submit"
                  className=" text-white bg-(--main) hover:bg-orange-700 cursor-pointer transition-all duration-300 px-6 py-6"
                >
                  Change Information
                </Button>
              )}
            </div>
          </form>
        </Form>

        <div className=" flex justify-center items-center gap-4 ">
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button
                variant="default"
                className="bg-(--main) hover:bg-orange-700 cursor-pointer transition-all duration-300 px-6 py-6"
              >
                Change Password
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-106.25">
              <DialogHeader>
                <DialogTitle>Change Password</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Form {...changePasswordForm}>
                  <form
                    className="flex flex-col gap-5"
                    onSubmit={changePasswordForm.handleSubmit(
                      handleChangePassword
                    )}
                  >
                    <FormField
                      control={changePasswordForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Password</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              id="currentPassword"
                              type="password"
                              className="rounded-lg border-nexora-orange border-2 h-12"
                              placeholder="1234"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={changePasswordForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              id="password"
                              type="password"
                              className="rounded-lg border-nexora-orange border-2 h-12"
                              placeholder="12345"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={changePasswordForm.control}
                      name="rePassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              id="rePassword"
                              type="password"
                              className="rounded-lg border-nexora-orange border-2 h-12"
                              placeholder="12345"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {changePasswordLoading ? (
                      <Button size="sm" variant="default" disabled>
                        <Spinner />
                      </Button>
                    ) : (
                      <Button
                        variant="default"
                        type="submit"
                        className="w-full text-white bg-(--main) hover:bg-orange-700 cursor-pointer transition-all duration-300"
                      >
                        Save Changes
                      </Button>
                    )}
                  </form>
                </Form>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
