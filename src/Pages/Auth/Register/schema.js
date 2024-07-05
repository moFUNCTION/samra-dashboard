import { z } from "zod";

export const schema = z
  .object({
    email: z.string().email({ message: "الرجاء ادخال بريد الكتروني صحيح" }),
    username: z.string().min(4, { message: "الرجاء كتابة الاسم المستخدم" }),
    password: z.string().min(1, { message: "الرجاء ادخال الرقم السري" }),
    confirmPassword: z.string().min(1, { message: "الرجاء تأكيد الرقم السري" }),
    phoneNumber: z.number({
      required_error: "الرجاء ادخال رقم الهاتف (الذي به واتساب)",
      invalid_type_error: "الرجاء ادخال رقم الهاتف (الذي به واتساب)",
    }),
    role: z.enum(["Admin", "Editor", "Accountant", "Delivery"], {
      message: "الرجاء ادخال الدور الوظيفي",
    }),
    image: z.any(),
  })
  .refine((val) => val.password === val.confirmPassword, {
    message: "الرجاء تأكيد الرقم السري بشكل صحيح",
    path: ["confirmPassword"],
  });
