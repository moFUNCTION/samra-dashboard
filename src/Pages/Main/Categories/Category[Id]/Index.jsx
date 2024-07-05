import { Stack } from "@chakra-ui/react";
import React from "react";
import { CategoryData } from "./Components/CategotyData/CategoryData";
import { TabsMenu } from "./Components/TabsMenu/TabsMenu";
import { Outlet } from "react-router-dom";

export default function Index() {
  return (
    <Stack p="3">
      <CategoryData />
      <TabsMenu />
      <Outlet />
    </Stack>
  );
}
