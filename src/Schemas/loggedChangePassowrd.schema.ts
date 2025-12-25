import zod from "zod";

export const loggedChangePassword = zod
  .object({
    currentPassword: zod.string().min(3, ""),
    password: zod
      .string()
      .regex(/^.{6,}$/, "Password must be at least 6 characters long!"),
    rePassword: zod.string().min(3, ""),
  })
  .refine((data) => data.password == data.rePassword, {
    message: "Passwords don't match",
    path: ["rePassword"],
  });
