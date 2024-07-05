import { z } from "zod";

export const schema = z.object({
  title: z.string().min(1, { message: "الرجاء ادخال اسم المنتج" }),
  description: z.string().min(1, { message: "الرجاء ادخال وصف المنتج" }),
  availabilityType: z.enum(["local", "delivery", "puplic"], {
    message: "الرجاء اختيار نوع التوافر",
  }),
  sizes: z
    .array(
      z.object({
        size: z.enum(["2xl", "xl", "lg", "md", "sm"], {
          message: "الرجاء اختيار حجم صحيح",
        }),
        price: z
          .number({
            invalid_type_error: "الرجاء ادخال سعر صحيح",
            required_error: "الرجاء ادخال سعر صحيح",
          })
          .nonnegative({ message: "الرجاء ادخال سعر صحيح" }),
      })
    )
    .refine(
      (array) => {
        const sizes = array?.map((item) => item.size);
        const uniqueSizes = new Set(sizes);
        return sizes.length === uniqueSizes.size;
      },
      { message: "لا يمكن تكرار حجم" }
    ),
  size: z.any(),
  price: z.any(),
  time: z
    .number({ invalid_type_error: "الرجاء ادخال وقت صحيح لمدة التحضير" })
    .nonnegative()
    .optional(),
  images: z
    .array(
      z.object({
        value: z.any(),
      })
    )
    .optional(),
});
