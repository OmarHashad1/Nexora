import zod from "zod";

export const loginSchema = zod.object({
  email: zod
    .string()
    .nonempty("This field is reqiured!")
    .email("Email not valid!"),
  password: zod.string().min(3, "")
});
