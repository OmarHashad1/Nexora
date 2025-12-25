import zod from "zod";

export const addressFormSchema = zod.object({
  name: zod
    .string()
    .min(1, "This field is required!")
    .max(20, "Maimum length reached !"),
  details: zod
    .string()
    .min(1, "This field is required!")
    .max(20, "Maimum length reached !"),

  phone: zod
    .string()
    .min(1, "Phone number is required")
    .regex(/^(010|011|012|015)\d{8}$/, "Invalid number"),
  city: zod
    .string()
    .min(1, "This field is required!")
    .max(20, "Maimum length reached !"),
});
