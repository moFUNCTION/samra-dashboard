import { Tabs, TabList, Tab, useMediaQuery } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

export const TabsMenu = () => {
  const [phoneQuery] = useMediaQuery("(max-width: 800px)");
  const ref = useRef();
  return (
    <Tabs ref={ref} w="100%" justifyContent="center">
      <TabList flexWrap={phoneQuery && "wrap"} gap="1" justifyContent="center">
        {tabsLinks.map((tab, _i) => {
          return (
            <Tab
              key={_i}
              _hover={{ bgColor: "gray.100" }}
              as={Link}
              to={tab.href}
              w="100%"
            >
              {tab.title}
            </Tab>
          );
        })}
      </TabList>
    </Tabs>
  );
};
const tabsLinks = [
  {
    href: "comments",
    title: "التعليقات",
  },
  {
    href: "orders",
    title: "عمليات الشراء",
  },
  {
    href: "likes",
    title: "عمليات الاعجاب",
  },
  {
    href: "visitors",
    title: "عمليات المشاهدة",
  },
  {
    href: "updateProduct",
    title: "تعديل المنتج",
  },
];
