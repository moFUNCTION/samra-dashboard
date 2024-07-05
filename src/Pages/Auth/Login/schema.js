import { z } from "zod";

export const schema = z.object({
  email: z.string().email({ message: "الرجاء ادخال بريد الكتروني صالح" }),
  password: z.string().min(1, { message: "الرجاء ادخال الرقم السري" }),
});
