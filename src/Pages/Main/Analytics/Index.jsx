import React, { useState } from "react";
import { GridSystem } from "../../../Components/Layout/GridSystem/GridSystem";
import { DataBox } from "./Components/DataBox/DataBox";
import { MdFastfood } from "react-icons/md";
import { FaBowlFood, FaUser } from "react-icons/fa6";
import { FaMoneyBill, FaShippingFast } from "react-icons/fa";
import { FaUserClock } from "react-icons/fa";
import { GiFullMotorcycleHelmet } from "react-icons/gi";
import { RiUser2Fill } from "react-icons/ri";
import { useMediaQuery } from "@chakra-ui/react";
export default function Index() {
  const [isPhoneQuery] = useMediaQuery("(max-width: 800px)");
  const [isTabletQuery] = useMediaQuery("(max-width: 1100px)");
  return (
    <GridSystem
      columns={isTabletQuery ? (isPhoneQuery ? 1 : 2) : 3}
      rowSize="180px"
      gap="10px"
      p="10px"
    >
      {dataSetsGroups.map((dataSet, index) => {
        return <DataBox key={index} {...dataSet} />;
      })}
    </GridSystem>
  );
}
const dataSetsGroups = [
  {
    title: "الطلبيات المعلقة",
    count: 150,
    href: "/orders",
    icon: <FaUserClock />,
    textHelper: "العدد",
    colorScheme: "orange",
  },
  {
    title: "الطلبيات قيد التنفيذ",
    count: 150,
    href: "/orders",
    icon: <GiFullMotorcycleHelmet />,
    textHelper: "العدد",
    colorScheme: "cyan",
  },
  {
    title: "الطلبيات الناجحة",
    count: 150,
    href: "/orders",
    icon: <FaShippingFast />,
    colorScheme: "blue",
    textHelper: "العدد",
  },
  {
    title: "الطلبيات الداخلية",
    count: 150,
    href: "/orders",
    icon: <RiUser2Fill />,
    colorScheme: "pink",
    textHelper: "العدد",
  },
  {
    title: "المنتجات",
    count: 150,
    href: "/products",
    icon: <MdFastfood />,
    colorScheme: "teal",
    textHelper: "العدد",
  },
  {
    title: "الاصناف",
    count: 150,
    href: "/orders",
    icon: <FaBowlFood />,
    textHelper: "العدد",
    colorScheme: "yellow",
  },
  {
    title: "الدخل الكلي",
    count: 150,
    href: "/orders",
    icon: <FaMoneyBill />,
    textHelper: "القيمة",
    colorScheme: "green",
  },
  {
    title: "المستخدمين",
    count: 150,
    href: "/orders",
    icon: <FaUser />,
    textHelper: "العدد",
    colorScheme: "red",
  },
  {
    title: "الموظفين",
    count: 150,
    href: "/orders",
    icon: <FaUser />,
    textHelper: "العدد",
    colorScheme: "purple",
  },
];
