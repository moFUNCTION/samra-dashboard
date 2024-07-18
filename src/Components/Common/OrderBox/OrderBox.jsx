import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Skeleton,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import { useGetUser } from "./../../../Firebase/Hooks/Users/useGetUser[id]/useGetUser";
import { BiSolidPhoneCall, BiSolidTime } from "react-icons/bi";
import { AspectRatio } from "@chakra-ui/react";
import { LocationModal } from "../LocationModal/LocationModal";
import { useGetProducts } from "../../../Firebase/Hooks/Products/useGetProducts/useGetProducts";
import { ProductOrderedBox } from "./ProductOrderedBox";
export const OrderBox = ({
  userId,
  location,
  order,
  status,
  totalPrice,
  phoneNumber,
  createdAt,
  id,
}) => {
  const {
    data: userData,
    loading: userDataLoading,
    error: userDataError,
  } = useGetUser({ id: userId });
  const PuplishedDate = new Date(
    createdAt?.seconds * 1000 + createdAt?.nanoseconds / 1000000
  ).toLocaleString();
  const {
    isOpen: isOpenedLocationModal,
    onClose: onCloseLocationModal,
    onOpen: onOpenLocationModal,
  } = useDisclosure();
  const {
    data: orderProductsData,
    loading: orderProductsLoading,
    error: orderProductsError,
  } = useGetProducts({
    whereQueries: [
      {
        field: "__name__",
        operator: "in",
        value: order?.map((product) => {
          return product.id;
        }),
      },
    ],
    orderByQueries: [{ field: "createdAt", direction: "desc" }],
    size: order.length,
  });
  const OrderDetails = order.map((item) => {
    const Product = orderProductsData.find((child) => {
      return child.id === item.id;
    });
    return { ...item, ...Product };
  });
  return (
    <>
      <LocationModal
        isOpen={isOpenedLocationModal}
        onClose={onCloseLocationModal}
        {...location}
        title="عنوان الطلب"
      />
      <Stack w="100%" p="2" bgColor="gray.200" borderRadius="lg">
        <HStack
          justifyContent="space-between"
          as={Skeleton}
          isLoaded={!userDataLoading}
          p="3"
          borderRadius="lg"
          fadeDuration={1}
          wrap="wrap"
        >
          <HStack>
            <IconButton
              w="fit-content"
              h="fit-content"
              p="1"
              borderRadius="full"
            >
              <Avatar src={userData?.photoURL} />
            </IconButton>
            <Box>
              <Heading size="sm">{userData?.displayName}</Heading>
              <Heading size="sm">{userData?.email}</Heading>
            </Box>
          </HStack>
          <Flex flexWrap="wrap" gap="2">
            <Button
              flexGrow="1"
              gap="3"
              alignItems="center"
              colorScheme="green"
            >
              {phoneNumber}
              <BiSolidPhoneCall />
            </Button>
            <Button flexGrow="1" gap="3" alignItems="center" colorScheme="blue">
              {PuplishedDate}
              <BiSolidTime />
            </Button>
            <Button
              onClick={onOpenLocationModal}
              flexGrow="1"
              colorScheme="teal"
            >
              اظهار موقع الطلب
            </Button>
          </Flex>
        </HStack>
        <Stack
          p="3"
          bgColor="gray.300"
          borderRadius="md"
          as={Skeleton}
          isLoaded={!orderProductsLoading}
          minH="100px"
          fadeDuration={2}
        >
          {OrderDetails?.map((item) => {
            return <ProductOrderedBox {...item} key={item.id} />;
          })}
        </Stack>

        <Button colorScheme="green">سعر الاوردر بالكامل {totalPrice}</Button>
        <Button colorScheme="blue">
          تأكيد تلقية الاوردر والنقل الي الاوردرات الي يتم تحضيرها{" "}
        </Button>
      </Stack>
    </>
  );
};
