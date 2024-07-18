import { useEffect, useRef, useState } from "react";
// compoents =>{
import { TabElement } from "./TabElement";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Tabs,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
// }
// react router =>{
import { useLocation } from "react-router-dom";
// }
export const TabsMenu = () => {
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
  // expand tabs menu handler =>{
  const [expand, setExpnad] = useState(true);
  const ExpandMenu = () => {
    setExpnad(!expand);
  };
  // }

  return (
    <>
      <Stack flexShrink="0" bgColor="gray.100" h="100%" alignItems="center">
        <Box
          display="flex"
          justifyContent="center"
          p="9px"
          borderBottom="2px"
          w="100%"
          borderBottomColor="gray.200"
        >
          <IconButton
            onClick={ExpandMenu}
            borderRadius="50%"
            colorScheme="blue"
            minW="50px"
            minH="50px"
            m="0 auto"
          >
            <IoIosMenu />
          </IconButton>
        </Box>

        <Tabs
          orientation="vertical"
          flexDirection="column"
          alignItems="center"
          w={`${expand ? "220px" : "80px"}`}
          h="100%"
          bgColor="gray.100"
          overflowX="hidden"
          overflowY="auto"
          index={value}
          onChange={HandleChange}
          transition="0.3s"
          borderLeft="2px"
          borderLeftColor="gray.200"
          className="scrollable"
          sx={{
            direction: "ltr !important",
          }}
          ref={TabsMenuRef}
        >
          {TabsValues.map((tab, index) => {
            return (
              <TabElement
                key={index}
                href={tab.href}
                title={tab.title}
                icon={tab.icon}
                expand={expand}
                childLinks={tab.childsLinks}
              />
            );
          })}
        </Tabs>
      </Stack>
    </>
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
const TabsValues = [
  {
    title: "الاحصائيات",
    icon: <IoAnalyticsOutline />,
    href: "/analytics",
    childsLinks: [
      {
        title: "الدخل",
        icon: <FaMoneyBillTrendUp />,
        href: "/outcome",
      },
    ],
  },
  {
    title: "المنتجات",
    icon: <BiFoodMenu />,
    href: "/categories",
    childsLinks: [
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
    ],
  },
  {
    title: "الطلبيات",
    icon: <MdLocalShipping />,
    childsLinks: [
      {
        title: "المعلقة",
        icon: <MdSportsMotorsports />,
        href: "/orders/pending",
      },
      {
        title: "قيد التنفيذ",
        icon: <FaMotorcycle />,
        href: "/orders/progress",
      },
      {
        title: "الناجحة",
        icon: <GrStatusGood />,
        href: "/orders/completed",
      },
      {
        title: "الطلبيات الداخلية",
        icon: <IoRestaurant />,
      },
    ],
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
