import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  IconButton,
  Tooltip,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import { UseUserData } from "../../../Context/UserDataProvider/UserDataProvider";
import { GetRoleInArabic } from "../../../Utils/GetRoleinArabic/GetRoleinArabic";
import { SearchField, Title } from "../SearchField/SearchField";
import { BsArrowDown } from "react-icons/bs";
export const Header = () => {
  const { user, HandleRender } = UseUserData();
  const [isPhoneQuery] = useMediaQuery("(max-width: 950px)");
  const [isSmallPhoneQuery] = useMediaQuery("(max-width: 600px)");
  return (
    <HStack
      flexWrap={isPhoneQuery && "wrap"}
      justifyContent={isSmallPhoneQuery ? "center" : "space-between"}
      p="2"
      bgColor="gray.100"
      gap="3"
      pos="sticky"
      top="0"
      w="100%"
      zIndex="100"
    >
      <HStack>
        <Tooltip label={user.data?.email}>
          <IconButton p="1" borderRadius="full" w="fit-content" h="fit-content">
            <Avatar
              onDoubleClick={HandleRender}
              src={user.data?.photoURL}
              bgColor="white"
            />
          </IconButton>
        </Tooltip>
        <Box>
          <Heading size="sm">{user.data?.displayName}</Heading>
          <Heading size="sm" mt="1">
            {GetRoleInArabic(user.data?.role?.name)}
          </Heading>
        </Box>
      </HStack>
      {!isPhoneQuery && (
        <SearchField
          variant="Bar"
          BtnStyles={{
            w: "100%",
            maxW: "500px",
          }}
        >
          <Title>البحث عن منتج</Title>
        </SearchField>
      )}

      <Flex gap="3">
        <Button bgColor="white" colorScheme="blue" variant="outline">
          الطلبيات
        </Button>
        <Button colorScheme="red">تسجيل الخروج</Button>
        {isPhoneQuery && (
          <SearchField
            variant="IconButton"
            BtnStyles={{
              colorScheme: "blue",
            }}
          >
            <Title>البحث عن منتج</Title>
          </SearchField>
        )}
      </Flex>
    </HStack>
  );
};
