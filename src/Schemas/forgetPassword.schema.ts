import zod from "zod";

export const forgetPasswordSchema = zod.object({
  email: zod
    .string()
    .nonempty("This field is reqiured!")
    .email("Email not valid!"),
});
