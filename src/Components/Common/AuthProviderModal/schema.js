import { z } from "zod";

export const schema = z.object({
  phoneNumber: z.number({
    required_error: "الرجاء ادخال رقم الهاتف (الذي به واتساب)",
    invalid_type_error: "الرجاء ادخال رقم الهاتف (الذي به واتساب)",
  }),
  role: z.enum(["Admin", "Editor", "Accountant", "Delivery"], {
    message: "الرجاء ادخال الدور الوظيفي",
  }),
});
