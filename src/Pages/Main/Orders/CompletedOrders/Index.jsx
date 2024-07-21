import {
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Heading,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { useGetOrders } from "../../../../Firebase/Hooks/Orders/useGetOrders/useGetOrders";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { OrderBox } from "../../../../Components/Common/OrderBox/OrderBox";
import { useCollectionCount } from "../../../../Firebase/Hooks/UseCollectionCount/useCollectionCount";
import { useOutletContext } from "react-router-dom";
import Lottie from "lottie-react";
import AnimationData from "../../../../Assests/Error/Animation - 1707156954178.json";
export default function Index() {
  const {
    count,
    loading: countLoading,
    error: countError,
    onRender,
  } = useCollectionCount({
    collectionName: "Orders",
    GetQuery: `status == completed`,
  });
  const pagesNumber = Math.ceil(count / 3);

  const {
    data,
    loading,
    error,
    page,
    HandleGetNextPage,
    HandleGetPreviousPage,
    HandleReset,
  } = useGetOrders({ size: 3, status: "completed" });
  const [scrollTop] = useOutletContext();
  useEffect(() => {
    scrollTop();
  }, [page]);
  useEffect(() => {
    onRender();
  }, [JSON.stringify(data)]);
  const onResetPage = () => {
    if (count - page * 3) {
      HandleReset();
    }
  };

  return (
    <Stack p="2">
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
          <Button isLoading={countLoading} flexGrow="1" colorScheme="blue">
            عدد الاوردرات الناجحة : {count}
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
        {data?.length === 0 && !loading && (
          <>
            <Lottie
              style={{
                width: "100%",
                maxWidth: "400px",
              }}
              animationData={AnimationData}
            />
            <Heading size="md" textAlign="center">
              لا يوجد اوردرات مكتملة حتي الان
            </Heading>
          </>
        )}
        {data?.map((order) => {
          return (
            <React.Fragment key={order.id}>
              <OrderBox onReset={onResetPage} {...order} />
              <Divider />
            </React.Fragment>
          );
        })}
      </Stack>
      <ButtonGroup justifyContent="center" spacing="3" colorScheme="blue">
        <Button
          isDisabled={page + 1 >= pagesNumber}
          isLoading={loading || countLoading}
          gap="3"
          alignItems="center"
          onClick={HandleGetNextPage}
        >
          <BsArrowRight />
          التالي
        </Button>
        <Button
          isDisabled={page === 0}
          isLoading={loading || countLoading}
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
