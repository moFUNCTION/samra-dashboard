import {
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Heading,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { useGetOrders } from "../../../../Firebase/Hooks/Orders/useGetOrders/useGetOrders";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { OrderBox } from "../../../../Components/Common/OrderBox/OrderBox";
import { useCollectionCount } from "../../../../Firebase/Hooks/UseCollectionCount/useCollectionCount";

export default function Index() {
  const {
    count,
    loading: countLoading,
    error: countError,
  } = useCollectionCount({
    collectionName: "Orders",
    GetQuery: `status == pending`,
  });
  const pagesNumber = Math.ceil(count / 3);
  const {
    data,
    loading,
    error,
    page,
    HandleGetNextPage,
    HandleGetPreviousPage,
  } = useGetOrders({ size: 3, status: "pending" });
  return (
    <Stack p="2" overflow="auto">
      <Flex
        bgColor="gray.50"
        justifyContent="space-between"
        gap="5"
        alignItems="center"
        w="100%"
        p="4"
        border="1px"
        borderColor="teal.500"
        borderRadius="md"
        pos="s"
        flexWrap="wrap"
      >
        <Heading size="md">اهلا بك في صفحة الاوردرات المعلقة</Heading>
        <Flex gap="3" flexWrap="wrap">
          <Button flexGrow="1" colorScheme="blue">
            عدد الاوردرات المعلقة :{" "}
          </Button>
          <Button flexGrow="1" colorScheme="blue">
            عدد الاوردرات :{" "}
          </Button>
        </Flex>
      </Flex>
      <Stack
        border="1px"
        borderColor="gray.500"
        p="3"
        borderRadius="lg"
        flexWrap="wrap"
        gap="10"
        as={Skeleton}
        isLoaded={!loading}
        minH="500px"
        fadeDuration={1}
        alignItems="center"
      >
        {data?.map((order) => {
          return (
            <>
              <OrderBox {...order} key={order.id} />
              <Divider />
            </>
          );
        })}
      </Stack>
      <ButtonGroup justifyContent="center" spacing="3" colorScheme="blue">
        <Button
          isDisabled={page + 1 >= pagesNumber}
          isLoading={loading && countLoading}
          gap="3"
          alignItems="center"
          onClick={HandleGetNextPage}
        >
          <BsArrowRight />
          التالي
        </Button>
        <Button
          isDisabled={page === 0}
          isLoading={loading}
          gap="3"
          variant="outline"
          alignItems="center"
          onClick={HandleGetPreviousPage}
        >
          الخلف
          <BsArrowLeft />
        </Button>
      </ButtonGroup>
    </Stack>
  );
}
