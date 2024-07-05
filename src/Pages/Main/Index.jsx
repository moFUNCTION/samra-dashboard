import { Flex, Stack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { TabsMenu } from "../../Components/Layout/TabssMenu/TabsMenu";
import { Header } from "../../Components/Layout/Header/Header";
import { UseUserData } from "../../Context/UserDataProvider/UserDataProvider";
import { CenteredCircularProgress } from "../../Components/Common/CenteredCircularProgress/CenteredCircularProgress";

export default function Index() {
  const { user, HandleRender } = UseUserData();
  if (user.loading) {
    return <CenteredCircularProgress />;
  }
  if (!user.data) {
    return <Navigate to="/login" state={{ from: "/" }} />;
  }
  return (
    <Flex
      sx={{
        " > *": {
          overflow: "auto",
          flexGrow: 1,
        },
      }}
      h="100vh"
      w="100%"
    >
      <TabsMenu />
      <Stack
        w="100%"
        gap="0"
        sx={{
          "> div": {
            overflow: "auto",
            flexShrink: 0,
          },
        }}
      >
        <Header />
        <Outlet />
      </Stack>
    </Flex>
  );
}
