"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { Input } from "@/Components/ui/input";
import logo from "../../../../../public/NexoraLogo.png";
import Image from "next/image";
import { Button } from "@/Components/ui/button";
import { useRouter } from "next/navigation";
import { Spinner } from "@/Components/ui/spinner";
import loginInterface from "@/interfaces/Auth/login.interface";
import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
} from "@/Components/ui/form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/Schemas/login.shcema";
import { toast } from "sonner";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async function (data: loginInterface) {
    try {
      setLoading(true);

      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: "/",
        redirect: false,
      });
      if (res?.error) {
        toast.error(res.error);
        return;
      }

      toast.success("Welcome Back!");
      form.reset();
      router.push("/");
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
        <h2 className="text-2xl font-bold uppercase">Login</h2>
        <p className="nexora-text-secondry text-center">
          Welcome back! Please login to your account to continue shopping.
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="password"
                      type="password"
                      className="rounded-lg border-nexora-orange border-2 h-12 "
                    />
                  </FormControl>
                  <div>
                    <Link href="/forgetPassword">
                      <Button
                        variant={"link"}
                        className="text-blue-500 -m-2 cursor-pointer"
                      >
                        Forget Password?
                      </Button>
                    </Link>
                  </div>
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
                  login
                </Button>
              )}
              <Link href="/register">
                <Button
                  variant={"link"}
                  className="text-blue-500 cursor-pointer"
                >
                  Dont have an account? Sign Up
                </Button>
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
