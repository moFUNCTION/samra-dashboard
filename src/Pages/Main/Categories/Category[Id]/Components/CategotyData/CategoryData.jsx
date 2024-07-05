import {
  Stack,
  Image,
  Flex,
  Skeleton,
  Heading,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { useGetCategory } from "./../../../../../../Firebase/Hooks/Categories/useGetCategory[id]/useGetCategory";
import { useParams } from "react-router-dom";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

export const CategoryData = () => {
  const { categoryId } = useParams();
  const { data, loading, error } = useGetCategory({ id: categoryId });
  const PuplishedDate = new Date(
    data?.createdAt?.seconds * 1000 + data?.createdAt?.nanoseconds / 1000000
  ).toLocaleString();
  const UpdatedDate = new Date(
    data?.updatedAt?.seconds * 1000 + data?.updatedAt?.nanoseconds / 1000000
  ).toLocaleString();

  return (
    <Flex
      w="100%"
      bgColor="gray.50"
      border="1px"
      borderColor="gray.300"
      p="3"
      borderRadius="lg"
      gap="5"
      alignItems="start"
      flexWrap="wrap"
    >
      <Flex
        as={Skeleton}
        isLoaded={!loading}
        w="100%"
        maxW="550px"
        borderRadius="lg"
        overflow="hidden"
        h="350px"
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
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Flex>
      <Stack gap="3">
        <Heading size="md">اسم الصنف : {data?.title}</Heading>
        <Heading size="md"> الوصف : {data?.description}</Heading>
        <Heading size="md"> متاح : {data?.availabilityType}</Heading>
        <Heading size="md"> تاريخ الانشاء : {PuplishedDate}</Heading>
        {data?.updatedAt && (
          <Heading size="md"> تاريخ اخر تحديث : {UpdatedDate}</Heading>
        )}
        <Heading size="md">عدد المنتجات في هذا الصنف</Heading>
        <Heading size="md">عدد الطلبيات من هذا الصنف</Heading>
      </Stack>
    </Flex>
  );
};
