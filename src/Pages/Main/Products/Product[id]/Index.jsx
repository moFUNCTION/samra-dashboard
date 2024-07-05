import { Heading, Stack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { ProductDataView } from "./Parts/ProductDataView/ProductDataView";
import { TabsMenu } from "./Parts/TabsMenu/TabsMenu";
import { Outlet } from "react-router-dom";

export default function Product() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Stack p="10px" h="100vh">
      <Heading
        p="3"
        borderBottom="2px"
        borderBottomColor="teal.600"
        color="teal"
        size="md"
      >
        المنتجات / المنتج
      </Heading>
      <ProductDataView />
      <TabsMenu />
      <Outlet />
    </Stack>
  );
}
