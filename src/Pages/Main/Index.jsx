import { Flex, Stack, useMediaQuery } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { TabsMenu } from "../../Components/Layout/TabssMenu/TabsMenu";
import { Header } from "../../Components/Layout/Header/Header";
import { UseUserData } from "../../Context/UserDataProvider/UserDataProvider";
import { CenteredCircularProgress } from "../../Components/Common/CenteredCircularProgress/CenteredCircularProgress";
import { MobileTabsNavigation } from "../../Components/Layout/MobileTabsNavigation/MobileTabsNavigation";

export default function Index() {
  const [isPhoneQuery] = useMediaQuery("(max-width: 900px)");
  const container = useRef();
  const scrollTop = () => {
    container.current.scrollTo({
      top: 100,
      left: 100,
      behavior: "smooth",
    });
  };
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
      pos="relative"
      flexDir={isPhoneQuery ? "column-reverse" : "row"}
    >
      {isPhoneQuery ? <MobileTabsNavigation /> : <TabsMenu />}

      <Stack
        w="100%"
        gap="0"
        sx={{
          "> div": {
            overflow: "auto",
            flexShrink: 0,
          },
        }}
        ref={container}
      >
        <Header />
        <Outlet context={[scrollTop]} />
      </Stack>
    </Flex>
  );
}
