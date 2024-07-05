import { z } from "zod";

export const schema = z.object({
  title: z.string().min(1, { message: "الرجاء ادخال اسم الصنف" }),
  description: z.string().min(1, { message: "الرجاء ادخال نوع الصنف" }),
  href: z
    .string()
    .min(1, { message: "الرجاء اضافة رابط الحدث" })
    .url({ message: "الرجاء اضافة رابط صحيح" }),
  images: z
    .array(
      z.object({
        value: z.any(),
      })
    )
    .min(1, { message: "يجب اضافة صورة واحدة علاقل" }),
});
