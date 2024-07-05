import { z } from "zod";

export const schema = z.object({
  title: z.string().min(1, { message: "الرجاء ادخال اسم الصنف" }),
  description: z.string().min(1, { message: "الرجاء ادخال نوع الصنف" }),

  availabilityType: z.enum(["local", "delivery", "puplic"], {
    message: "الرجاء اختيار نوع التوافر",
  }),
  images: z
    .array(
      z.object({
        value: z.any(),
      })
    )
    .min(1, { message: "يجب اضافة صورة واحدة علاقل" }),
});
