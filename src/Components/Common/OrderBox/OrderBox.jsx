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
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import { useGetUser } from "./../../../Firebase/Hooks/Users/useGetUser[id]/useGetUser";
import { BiSolidPhoneCall, BiSolidTime } from "react-icons/bi";
import { LocationModal } from "../LocationModal/LocationModal";
import { useGetProducts } from "../../../Firebase/Hooks/Products/useGetProducts/useGetProducts";
import { ProductOrderedBox } from "./ProductOrderedBox";
import { BsCheck } from "react-icons/bs";
import { useUpdateDoc } from "../../../Firebase/Hooks/useUpdateDoc/useUpdateDoc";
import { CgRemove } from "react-icons/cg";
import { StatusEditableModal } from "./StatusEditableModal";
import { useDeleteDoc } from "../../../Firebase/Hooks/useDeleteDoc/useDeleteDoc";
export const OrderBox = ({
  userId,
  location,
  order,
  status,
  totalPrice,
  phoneNumber,
  createdAt,
  UpdateToStatus,
  id,
  onReset,
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
  const {
    onUpdate,
    loading: onUpdateStatusLoading,
    error: onUpdateStatusError,
  } = useUpdateDoc({ collection: "Orders", DocId: id });
  const HandleUpdateStatus = async ({ status }) => {
    await onUpdate({
      updatedData: {
        status,
      },
    });
    onReset();
  };
  const {
    onDelete,
    loading: onDeleteLoading,
    error: onDeleteError,
  } = useDeleteDoc({
    collection: "Orders",
    DocId: id,
  });
  const HandleDelete = async () => {
    await onDelete();
    onReset();
  };
  return (
    <>
      <LocationModal
        isOpen={isOpenedLocationModal}
        onClose={onCloseLocationModal}
        location={location}
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
            return <ProductOrderedBox key={item.id} {...item} />;
          })}
        </Stack>
        <Flex gap="4" wrap="wrap">
          <Button flexGrow="1" colorScheme="green">
            سعر الاوردر بالكامل {totalPrice}
          </Button>

          {status === "pending" && (
            <Tooltip label="النقل الي الطلبيات المستلمة">
              <Button
                flexGrow="1"
                isLoading={onUpdateStatusLoading}
                gap="3"
                alignItems="center"
                colorScheme="blue"
                onClick={(e) => HandleUpdateStatus({ status: UpdateToStatus })}
              >
                تأكيد تلقية الاوردر
                <BsCheck />
              </Button>
            </Tooltip>
          )}
          {status === "processing" && (
            <Button
              flexGrow="1"
              isLoading={onUpdateStatusLoading}
              gap="3"
              alignItems="center"
              colorScheme="blue"
              onClick={HandleUpdateStatus}
            >
              تأكيد اتمام الاوردر
              <BsCheck />
            </Button>
          )}

          <Button
            onClick={HandleDelete}
            isLoading={onDeleteLoading}
            flexGrow="1"
            gap="3"
            alignItems="center"
            colorScheme="red"
          >
            حذف الاوردر
            <CgRemove />
          </Button>
          <StatusEditableModal
            onChangeStatus={(value) => HandleUpdateStatus({ status: value })}
            isLoading={onUpdateStatusLoading}
            status={status}
          />
        </Flex>
      </Stack>
    </>
  );
};
