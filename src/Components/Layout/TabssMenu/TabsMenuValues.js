import { IoAnalyticsOutline } from "react-icons/io5";
import { FaMoneyBillTrendUp, FaMotorcycle } from "react-icons/fa6";
import { BiFoodMenu, BiMoney } from "react-icons/bi";
import { IoFastFoodSharp } from "react-icons/io5";
import { MdDiscount, MdEmojiEvents, MdLocalShipping } from "react-icons/md";
import { MdSportsMotorsports } from "react-icons/md";
import { GrStatusGood } from "react-icons/gr";
import { FaUsers } from "react-icons/fa";
export const TabsValues = [
  {
    title: "الاحصائيات",
    Icon: IoAnalyticsOutline,
    href: "/analytics",
    childsLinks: [
      {
        title: "الدخل",
        Icon: FaMoneyBillTrendUp,
        href: "/outcome",
      },
    ],
  },
  {
    title: "المنتجات",
    Icon: BiFoodMenu,
    href: "/categories",
    childsLinks: [
      {
        title: "الاصناف",
        Icon: IoFastFoodSharp,
        href: "/categories",
      },
      {
        title: "اضافة صنف",
        Icon: IoFastFoodSharp,
        href: "/categories/add",
      },
    ],
  },
  {
    title: "الطلبيات",
    Icon: MdLocalShipping,
    childsLinks: [
      {
        title: "المعلقة",
        Icon: MdSportsMotorsports,
        href: "/orders/pending",
      },
      {
        title: "قيد التنفيذ",
        Icon: FaMotorcycle,
        href: "/orders/progress",
      },
      {
        title: "الناجحة",
        Icon: GrStatusGood,
        href: "/orders/completed",
      },
    ],
  },

  {
    title: "الاحداثيات",
    Icon: MdEmojiEvents,
    href: "/events",
  },
  {
    title: "اكواد الخصومات",
    Icon: MdDiscount,
    childsLinks: [
      {
        title: "الاكواد المنشئة",
        href: "/discounts",
        Icon: MdDiscount,
      },
      {
        title: "انشاء كود خصم",
        href: "/discount/add",
        Icon: MdDiscount,
      },
    ],
  },
  {
    title: "المستخدمين",
    Icon: FaUsers,
    href: "/users",
  },
  {
    title: "الماليات",
    Icon: BiMoney,
    href: "/profit",
  },
];
