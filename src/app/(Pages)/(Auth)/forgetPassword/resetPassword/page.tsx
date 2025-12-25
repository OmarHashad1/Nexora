"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/Components/ui/input";
import logo from "../../../../../../public/NexoraLogo.png";
import Image from "next/image";
import { Button } from "@/Components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { Spinner } from "@/Components/ui/spinner";
import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
} from "@/Components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { resetPasswordSchmea } from "@/Schemas/resetPassword.schema";
import resetPasswordInterface from "@/interfaces/Auth/resetPassword.interface";
import { resetPassword } from "@/APIs/Auth/resetPassword";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const form = useForm({
    defaultValues: {
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(resetPasswordSchmea),
  });

  const onSubmit = async function (data: resetPasswordInterface) {
    setLoading(true);
    try {
      await resetPassword({ ...data, email: email || "" });
      toast.success(
        "Password reset successfully! Please login with your new password."
      );
      form.reset();
      router.push("/login");
    } catch (err) {
      toast.error(`${err && "Something went wrong. Please try again."}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex xsm:flex-col lg:flex-row justify-center items-center container">
      <div className="flex flex-col justify-center items-center lg:border-r-2 xsm:border-b-2 lg:border-b-0 xsm:py-10 xsm:mb-7 p-5 me-4 lg:py-20 gap-5">
        <Image src={logo} width={100} alt="Logo"></Image>
        <h2 className="text-2xl font-bold uppercase">Reset Password</h2>
        <p className="nexora-text-secondry text-center">
          Enter your new password to reset your account
        </p>
      </div>
      <div className="xsm:w-full lg:w-[50%]">
        <Form {...form}>
          <form
            className="flex flex-col gap-5"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="password"
                      placeholder="Enter your new password"
                      type="password"
                      className="rounded-lg border-nexora-orange border-2 h-12 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="rePassword"
                      type="password"
                      className="rounded-lg border-nexora-orange border-2 h-12 "
                      placeholder="Confirm your new password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center items-center flex-col gap-2">
              {loading ? (
                <Button size="sm" variant="outline" disabled>
                  <Spinner />
                </Button>
              ) : (
                <Button
                  variant={"default"}
                  className="bg-(--main) p-6 px-20 uppercase  cursor-pointer hover:bg-orange-700"
                >
                  Reset Password
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
