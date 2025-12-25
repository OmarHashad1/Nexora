"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/Components/ui/input";
import logo from "../../../../../public/NexoraLogo.png";
import Image from "next/image";
import { Button } from "@/Components/ui/button";
import { createNewUser } from "@/APIs/Auth/signup.api";
import registerInterface from "@/interfaces/Auth/register.interface";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "@/Components/ui/spinner";
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
import { registerSchema } from "@/Schemas/register.schema";
export default function Page() {
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onSubmit = async function (data: registerInterface) {
    try {
      setLoading(true);
      const res = await createNewUser(data);
      if (res.statusMsg === "fail") {
        toast.error(`${res.message}`);
        return;
      }
      toast.success(
        `Account created successfully. Welcome ${data.name.split(" ")[0]}`
      );
      form.reset();
      router.push("/login");
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex xsm:flex-col lg:flex-row justify-center items-center container">
      <div className="flex flex-col justify-center items-center lg:border-r-2 xsm:border-b-2 lg:border-b-0 xsm:py-10 xsm:mb-7 p-5 me-4 lg:py-30 gap-5">
        <Image src={logo} width={100} alt="Logo"></Image>
        <h2 className="text-2xl font-bold uppercase">Sign Up</h2>
        <p className="nexora-text-secondry text-center">
          Join Us to experience the best shopping experience ever
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
                      className="rounded-lg border-nexora-orange border-2 h-12 "
                      placeholder="example@email.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4 w-full">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="password"
                        placeholder="1234"
                        type="password"
                        className="rounded-lg border-nexora-orange border-2 h-12"
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
                  <FormItem className="flex-1">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="rePassword"
                        placeholder="1234"
                        type="password"
                        className="rounded-lg border-nexora-orange border-2 h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="phone"
                      type="tel"
                      className="rounded-lg border-nexora-orange border-2 h-12 "
                      placeholder="01000000000"
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
                  type="submit"
                  variant={"default"}
                  className="bg-(--main) p-6 px-20   uppercase hover:bg-(--main) cursor-pointer"
                >
                  Register
                </Button>
              )}
              <Link href="/login">
                <Button
                  variant={"link"}
                  className="text-blue-500 cursor-pointer"
                >
                  Already have an account? Login
                </Button>
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
