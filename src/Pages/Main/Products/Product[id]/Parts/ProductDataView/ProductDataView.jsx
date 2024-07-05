import { Stack, Image, Flex, Skeleton, Heading } from "@chakra-ui/react";
import { useGetProduct } from "../../../../../../Firebase/Hooks/Products/useGetProduct[id]/useGetProduct";
import { useParams } from "react-router-dom";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { TranslateSize } from "./../../../../../../Utils/TranslateSize/TranslateSize";

export const ProductDataView = () => {
  const { productId } = useParams();
  const { data, loading, error } = useGetProduct({ id: productId });
  const PuplishedDate = new Date(
    data?.createdAt?.seconds * 1000 + data?.createdAt?.nanoseconds / 1000000
  ).toLocaleString();
  const UpdatedDate = new Date(
    data?.updatedAt?.seconds * 1000 + data?.updatedAt?.nanoseconds / 1000000
  ).toLocaleString();
  return (
    <Flex
      w="100%"
      bgColor="gray.100"
      border="1px"
      borderColor="gray.300"
      p="3"
      borderRadius="lg"
      gap="5"
      flexWrap="wrap"
    >
      <Flex
        as={Skeleton}
        isLoaded={!loading}
        w="100%"
        maxW="550px"
        borderRadius="lg"
        overflow="hidden"
        h="380px"
      >
        <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
          {data?.images?.map((image, index) => {
            return (
              <SwiperSlide key={index}>
                <Image
                  src={image.URL}
                  alt="Green double couch with wooden legs"
                  transition="0.3s"
                  w="100%"
                  h="100%"
                  objectFit="cover"
                  decoding="async"
                  loading="lazy"
                  objectPosition="50% 80%"
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Flex>
      <Stack gap="3">
        <Heading size="md">اسم المنتح : {data?.title}</Heading>
        <Heading size="md"> الوصف : {data?.description}</Heading>
        <Heading size="md"> متاح : {data?.availabilityType}</Heading>
        <Heading size="md"> تاريخ الانشاء : {PuplishedDate}</Heading>
        {data?.updatedAt && (
          <Heading size="md"> تاريخ اخر تحديث : {UpdatedDate}</Heading>
        )}

        <Stack p="2" bgColor="gray.200">
          <Heading
            size="md"
            borderBottom="2px"
            borderBottomColor="gray.600"
            p="2"
          >
            الاسعار
          </Heading>
          {data?.sizes.map((child, index) => {
            const { size, price } = child;
            return (
              <Heading
                borderBottom="2px"
                borderBottomColor="gray.500"
                p="2"
                size="sm"
                key={index}
              >
                {TranslateSize({ title: size })} : {price}
              </Heading>
            );
          })}
        </Stack>
      </Stack>
    </Flex>
  );
};
