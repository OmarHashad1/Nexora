import zod from "zod";

export const registerSchema = zod
  .object({
    name: zod
      .string()
      .min(1, "This field is required!")
      .min(3, "Name should be at least 3 characters long!")
      .max(20, "Maimum length reached !"),
    email: zod
      .string()
      .min(1, "This field is required!")
      .email("Email not valid!"),
    password: zod
      .string()
      .regex(/^.{6,}$/, "Password must be at least 6 characters long!"),
    rePassword: zod.string().min(1, "This field is required!"),
    phone: zod
      .string()
      .min(1, "Phone number is required")
      .regex(/^(010|011|012|015)\d{8}$/, "Invalid number"),
  })
  .refine((data) => data.password == data.rePassword, {
    message: "Passwords don't match",
    path: ["rePassword"],
  });
