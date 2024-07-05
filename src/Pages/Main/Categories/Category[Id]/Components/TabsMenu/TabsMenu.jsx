import { Tabs, TabList, Tab, useMediaQuery } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

export const TabsMenu = () => {
  const { categoryId, productId } = useParams();
  const [phoneQuery] = useMediaQuery("(max-width: 800px)");
  const ref = useRef();
  const { pathname } = useLocation();
  const routes = ["products", "add", "update", "profits", productId];
  const [route] = pathname.split("/").slice(-1);
  useEffect(() => {
    function GoToTheScrollView() {
      if (routes.includes(route)) {
        ref.current?.scrollIntoView({ behavior: "smooth" });
      }
    }
    GoToTheScrollView();
  }, [route]);
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
    href: "products",
    title: "المنتجات",
  },
  {
    href: "products/add",
    title: "اضافة منتج",
  },
  {
    href: "orders",
    title: "مبيعات هذا الصنف",
  },
  {
    href: "update",
    title: "تعديل الصنف",
  },
];
