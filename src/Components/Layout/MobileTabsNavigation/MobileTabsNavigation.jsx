import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import styles from "./styles.module.css";
export const MobileTabsNavigation = () => {
  const TabsMenuRef = useRef();
  // pathname cahnging handler =>{
  const { pathname } = useLocation();
  function getStringAfterSlash(str) {
    const lastIndex = str.lastIndexOf("/");

    if (lastIndex !== -1) {
      const substring = str.substring(lastIndex + 1);
      return substring;
    } else {
      return str;
    }
  }
  const getPathNameIndex = () => {
    return TabsValues.indexOf(
      TabsValues.find((item) => {
        return item.href === getStringAfterSlash(pathname);
      })
    );
  };
  const [value, setValue] = useState(getPathNameIndex());
  const HandleChange = (index) => {
    setValue(index);
  };
  // }
  return (
    <Tabs
      w="100%"
      bottom="0px"
      variant="soft-rounded"
      colorScheme="blue"
      orientation="horizontal"
      bgColor="gray.50"
      p="4"
      zIndex="1000"
      flexShrink="0"
      borderTop="2px"
      borderTopColor="gray.700"
      className={styles.container}
      mt="auto"
      flexGrow="0"
      pos="sticky"
      index={value}
      onChange={HandleChange}
    >
      <TabList h="fit-content">
        {TabsValues.map((tab, index) => {
          return (
            <Tab as={Link} to={tab.href} flexShrink="0" gap="3" key={index}>
              {tab.title}
              {tab.icon}
            </Tab>
          );
        })}
      </TabList>
    </Tabs>
  );
};
import { IoIosMenu } from "react-icons/io";
import { IoAnalyticsOutline } from "react-icons/io5";
import { FaMoneyBillTrendUp, FaMotorcycle } from "react-icons/fa6";
import { BiChat, BiFoodMenu, BiMoney } from "react-icons/bi";
import { IoFastFoodSharp } from "react-icons/io5";
import { FaBowlFood } from "react-icons/fa6";
import { MdEmojiEvents, MdEventSeat, MdLocalShipping } from "react-icons/md";
import { MdSportsMotorsports } from "react-icons/md";
import { GrNotification, GrStatusGood } from "react-icons/gr";
import { FaUsers } from "react-icons/fa";
import { FaUsersCog } from "react-icons/fa";
import { BiSolidFoodMenu } from "react-icons/bi";
import { IoRestaurant } from "react-icons/io5";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { TabsMenu } from "../TabssMenu/TabsMenu";
import { Link, useLocation } from "react-router-dom";
import { useRef, useState } from "react";
const TabsValues = [
  {
    title: "الاحصائيات",
    icon: <IoAnalyticsOutline />,
    href: "/analytics",
  },
  {
    title: "الدخل",
    icon: <FaMoneyBillTrendUp />,
    href: "/outcome",
  },
  {
    title: "الاصناف",
    icon: <IoFastFoodSharp />,
    href: "/categories",
  },
  {
    title: "اضافة صنف",
    icon: <IoFastFoodSharp />,
    href: "/categories/add",
  },

  {
    title: "الطلبيات المعلقة",
    icon: <MdSportsMotorsports />,
    href: "/orders/pending",
  },
  {
    title: " الطلبيات قيد التنفيذ ",
    icon: <FaMotorcycle />,
    href: "/orders/progress",
  },
  {
    title: "الطلبيات الناجحة",
    icon: <GrStatusGood />,
    href: "/orders/completed",
  },
  {
    title: "الطلبيات الداخلية",
    icon: <IoRestaurant />,
  },
  {
    title: "الاحداثيات",
    icon: <MdEmojiEvents />,
    href: "/events",
  },
  {
    title: "الاشعارات",
    icon: <GrNotification />,
    href: "/notifications",
  },
  {
    title: "المستخدمين",
    icon: <FaUsers />,
    href: "/users",
  },
  {
    title: "المنيو",
    icon: <BiSolidFoodMenu />,
    href: "/menu",
  },
  {
    title: "الماليات",
    icon: <BiMoney />,
    href: "/profit",
  },
];
