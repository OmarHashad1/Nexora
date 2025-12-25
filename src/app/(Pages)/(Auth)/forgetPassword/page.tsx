"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/Components/ui/input";
import logo from "../../../../../public/NexoraLogo.png";
import Image from "next/image";
import { Button } from "@/Components/ui/button";
import { useRouter } from "next/navigation";
import { Spinner } from "@/Components/ui/spinner";
import { ArrowLeftSquare } from "lucide-react";
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
import forgetPasswordInterface from "@/interfaces/Auth/forgetPassword.interface";
import { forgetPasswordSchema } from "@/Schemas/forgetPassword.schema";
import { forgetPassword } from "@/APIs/Auth/forgetPassword";
import Link from "next/link";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgetPasswordSchema),
  });

  const onSubmit = async function (data: forgetPasswordInterface) {
    setLoading(true);
    try {
      await forgetPassword(data);
      toast.success("A code has been sent to you email");
      form.reset();
      router.push(
        `/forgetPassword/forgetPasswordCode?email=${encodeURIComponent(
          data.email
        )}`
      );
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
        <h2 className="text-2xl font-bold uppercase">Forget Password</h2>
        <p className="nexora-text-secondry text-center">
          Enter your email to receive a password reset code
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="email"
                      type="text"
                      className="rounded-lg border-nexora-orange border-2 h-12 "
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
                <div className="flex justify-center items-center flex-col gap-4">
                  <Button
                    variant={"default"}
                    className="bg-(--main) p-6 px-20 uppercase cursor-pointer hover:bg-orange-700"
                  >
                    Send Code
                  </Button>
                  <Link href="/login">
                    <Button
                      variant={"default"}
                      className="bg-(--main) p-5 px-10 uppercase cursor-pointer hover:bg-orange-700"
                    >
                      <ArrowLeftSquare></ArrowLeftSquare>Go Back
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
