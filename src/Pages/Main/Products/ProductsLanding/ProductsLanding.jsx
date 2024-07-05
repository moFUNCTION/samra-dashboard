import {
  Alert,
  AlertTitle,
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Heading,
  Skeleton,
  Stack,
  AlertIcon,
} from "@chakra-ui/react";
import { ProductBox } from "./Components/ProductBox";
import { Link, useParams } from "react-router-dom";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { useCollectionCount } from "./../../../../Firebase/Hooks/UseCollectionCount/useCollectionCount";
import {
  SearchField,
  Title,
} from "../../../../Components/Layout/SearchField/SearchField";
import { useGetProductsByCategory } from "../../../../Firebase/Hooks/Products/useGetProductsByCategory/useGetProductsByCategory";
export default function Index() {
  const { categoryId } = useParams();
  const {
    count,
    loading: countLoading,
    error: countError,
  } = useCollectionCount({
    collectionName: "Products",
    GetQuery: `categoryId == ${categoryId}`,
  });
  const pagesNumber = Math.floor(count / 6);

  const {
    error,
    HandleGetNextPage,
    HandleGetPreviousPage,
    page,
    data,
    loading,
  } = useGetProductsByCategory({ size: 8, categoryId });
  return (
    <Stack p="3">
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
        <Heading size="md">اهلا بك في تهيئة منتجات الصنف</Heading>
        <Flex gap="3" flexWrap="wrap">
          <Button isLoading={countLoading} colorScheme="blue">
            عدد المنتجات : {count}
          </Button>
        </Flex>
      </Flex>
      <Flex gap="3" w="100%">
        <SearchField BtnStyles={{ w: "100%" }} variant="Bar">
          <Title>البحث عن منتج</Title>
        </SearchField>
        <Button colorScheme="blue">فلترة</Button>
      </Flex>

      <Flex
        border="2px"
        borderColor="gray.200"
        p="3"
        borderRadius="lg"
        flexWrap="wrap"
        gap="3"
        justifyContent="center"
        alignItems="stretch"
        as={Skeleton}
        isLoaded={!loading}
        minH="500px"
        fadeDuration={1}
      >
        {data.length === 0 && (
          <Stack w="100%">
            <Alert
              status="warning"
              h="fit-content"
              justifyContent="center"
              borderRadius="lg"
            >
              <AlertIcon />
              <AlertTitle>لا يوجد بيانات لعرضها</AlertTitle>
            </Alert>
            <Button
              colorScheme="teal"
              as={Link}
              to={`/categories/${categoryId}/products/add`}
            >
              اضافة منتج
            </Button>
          </Stack>
        )}
        {data?.map((category, index) => {
          return <ProductBox {...category} key={index} />;
        })}
        {error && (
          <Heading whiteSpace="wrap" size="md">
            حدث خطأ في جلب البيانات
            {error}
          </Heading>
        )}
      </Flex>
      <ButtonGroup justifyContent="center" spacing="3" colorScheme="blue">
        <Button
          isDisabled={page >= pagesNumber}
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
