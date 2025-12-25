import zod from "zod";

export const forgetPasswordCodeSchema = zod.object({
  resetCode: zod
    .string()
    .nonempty("This field is required!")
    .length(6, "Code must be 6 digits"),
});
