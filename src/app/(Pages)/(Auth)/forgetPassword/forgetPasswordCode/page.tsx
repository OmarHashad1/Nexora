"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
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
import forgetPasswordCodeInterface from "@/interfaces/Auth/forgetPasswordCode.interface";
import { forgetPasswordCodeSchema } from "@/Schemas/forgetPasswordCode.schema";
import { verifyResetCode } from "@/APIs/Auth/forgetPasswordCode";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/Components/ui/input-otp";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const form = useForm({
    defaultValues: {
      resetCode: "",
    },
    resolver: zodResolver(forgetPasswordCodeSchema),
  });

  const onSubmit = async function (data: forgetPasswordCodeInterface) {
    if (!email) {
      toast.error("Email is missing. Please start from the beginning.");
      router.push("/forgetPassword");
      return;
    }

    setLoading(true);
    try {
      await verifyResetCode(data);
      toast.success("Code verified successfully");
      form.reset();
      router.push(`/forgetPassword/resetPassword?email=${encodeURIComponent(email)}`);
    } catch (err) {
      toast.error(`${err && "Invalid code. Please try again."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex xsm:flex-col lg:flex-row justify-center items-center container">
      <div className="flex flex-col justify-center items-center lg:border-r-2 xsm:border-b-2 lg:border-b-0 xsm:py-10 xsm:mb-7 p-5 me-4 lg:py-20 gap-5">
        <Image src={logo} width={100} alt="Logo"></Image>
        <h2 className="text-2xl font-bold uppercase">Verify Code</h2>
        <p className="nexora-text-secondry text-center">
          Enter the verification code sent to your email
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
              name="resetCode"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center">
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      {...field}
                      containerClassName="gap-3"
                    >
                      <InputOTPGroup className="gap-3">
                        <InputOTPSlot
                          index={0}
                          className="border-2 border-nexora-orange h-14 w-14 text-lg rounded-lg"
                        />
                        <InputOTPSlot
                          index={1}
                          className="border-2 border-nexora-orange h-14 w-14 text-lg rounded-lg"
                        />
                        <InputOTPSlot
                          index={2}
                          className="border-2 border-nexora-orange h-14 w-14 text-lg rounded-lg"
                        />
                        <InputOTPSlot
                          index={3}
                          className="border-2 border-nexora-orange h-14 w-14 text-lg rounded-lg"
                        />
                        <InputOTPSlot
                          index={4}
                          className="border-2 border-nexora-orange h-14 w-14 text-lg rounded-lg"
                        />
                        <InputOTPSlot
                          index={5}
                          className="border-2 border-nexora-orange h-14 w-14 text-lg rounded-lg"
                        />
                      </InputOTPGroup>
                    </InputOTP>
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
                  className="bg-(--main) p-6 px-20 uppercase cursor-pointer hover:bg-orange-700"
                >
                  Verify Code
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
