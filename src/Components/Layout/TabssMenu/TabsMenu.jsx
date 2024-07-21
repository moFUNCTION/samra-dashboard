import { useEffect, useRef, useState } from "react";
// compoents =>{
import { TabElement } from "./TabElement";
import { Box, IconButton, Stack, Tab, Tabs } from "@chakra-ui/react";
// }
// react router =>{
import { useLocation } from "react-router-dom";
// }
import { SearchField, Title } from "../SearchField/SearchField";
import { TabsValues } from "./TabsMenuValues";
import { IoIosMenu } from "react-icons/io";
import { RiUserSearchLine } from "react-icons/ri";
import { TbDatabaseSearch } from "react-icons/tb";
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
            const { href, title, Icon, childsLinks } = tab;
            return (
              <TabElement
                key={index}
                href={href}
                title={title}
                icon={<Icon />}
                expand={expand}
                childLinks={childsLinks}
              />
            );
          })}
          <Stack w="100%" p="2">
            <SearchField
              BtnStyles={{
                w: "100%",
                colorScheme: "blue",
                variant: "outline",
                bgColor: "white",
                justifyContent: expand ? "start" : "center",
              }}
              TooltipLabel="البحث عن منتج"
              variant={expand ? "Bar" : "IconButton"}
              Icon={<TbDatabaseSearch />}
            >
              <Title>البحث عن منتج</Title>
            </SearchField>
            <SearchField
              BtnStyles={{
                w: "100%",
                colorScheme: "blue",
                variant: "outline",
                bgColor: "white",
                justifyContent: expand ? "start" : "center",
              }}
              TooltipLabel="البحث عن صنف"
              variant={expand ? "Bar" : "IconButton"}
              Icon={<TbDatabaseSearch />}
            >
              <Title>البحث عن صنف</Title>
            </SearchField>
            <SearchField
              BtnStyles={{
                w: "100%",
                colorScheme: "blue",
                variant: "outline",
                bgColor: "white",
                justifyContent: expand ? "start" : "center",
              }}
              TooltipLabel="البحث عن مستخدم"
              variant={expand ? "Bar" : "IconButton"}
              Icon={<RiUserSearchLine />}
            >
              <Title>البحث عن مستخدم</Title>
            </SearchField>
            <SearchField
              BtnStyles={{
                w: "100%",
                colorScheme: "blue",
                variant: "outline",
                bgColor: "white",
                justifyContent: expand ? "start" : "center",
              }}
              TooltipLabel="البحث عن مشرف"
              variant={expand ? "Bar" : "IconButton"}
              Icon={<RiUserSearchLine />}
            >
              <Title>البحث عن مشرف</Title>
            </SearchField>
          </Stack>
        </Tabs>
      </Stack>
    </>
  );
};
