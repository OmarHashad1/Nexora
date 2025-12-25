import zod from "zod";

export const userFromSchema = zod.object({
  name: zod
    .string()
    .min(1, "This field is required!")
    .min(3, "Name should be at least 3 characters long!")
    .max(20, "Maimum length reached !"),
  email: zod
    .string()
    .nonempty("This field is reqiured!")
    .email("Email not valid!"),
  phone: zod
    .string()
    .min(1, "Phone number is required")
    .regex(/^(010|011|012|015)\d{8}$/, "Invalid number"),
});
