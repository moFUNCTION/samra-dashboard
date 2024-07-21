import { Box, Button, Divider, Flex, Heading, Stack } from "@chakra-ui/react";
import React from "react";
import { LazyLoadedImage } from "../LazyLoadedImage/LazyLoadedImage";
import { TranslateSize } from "../../../Utils/TranslateSize/TranslateSize";
import { Link } from "react-router-dom";

export const ProductOrderedBox = ({
  images,
  title,
  description,
  price,
  providedText,
  time,
  sizesRequested,
  id,
  categoryId,
}) => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="stretch"
      p="2"
      bgColor="white"
      borderRadius="lg"
      wrap="wrap"
      gap="3"
    >
      <Flex flexWrap="wrap" gap="3">
        <LazyLoadedImage
          w="200px"
          h="200px"
          borderRadius="lg"
          src={images?.[0]?.URL}
          ImageProps={{
            objectFit: "cover",
          }}
          flexGrow="1"
        />
        <Stack flexGrow="1" gap="3">
          <Heading size="sm">العنوان : {title}</Heading>
          <Heading size="sm">الوصف: {description}</Heading>
          <Heading color="green.600" size="sm">
            سعر الاوردر : {price}
          </Heading>
          <Heading size="sm">النص المرفق : {providedText}</Heading>
          <Heading size="sm">وقت التحضير: {time}</Heading>
          <Button
            as={Link}
            to={`/categories/${categoryId}/products/${id}`}
            colorScheme="blue"
          >
            التوجه للمنتج
          </Button>
        </Stack>
      </Flex>
      <Stack
        gap="2"
        flexGrow="1"
        maxW="700px"
        bgColor="gray.100"
        borderRadius="lg"
        p="2"
        wrap="wrap"
      >
        <Heading
          w="100%"
          size="md"
          borderBottom="1px"
          p="2"
          borderColor="gray.500"
        >
          طلبيات المنتج
        </Heading>
        {sizesRequested.map((sizeRequisted) => {
          return (
            <Flex
              p="2"
              bgColor="gray.300"
              flexGrow="1"
              key={sizeRequisted.id}
              gap="3"
              flexWrap="wrap"
            >
              <Button
                flexGrow="1"
                colorScheme="blue"
                variant="outline"
                bgColor="white"
              >
                الحجم المطلوب : {TranslateSize({ title: sizeRequisted.size })}
              </Button>
              <Button
                flexGrow="1"
                colorScheme="blue"
                variant="outline"
                bgColor="white"
              >
                السعر : {sizeRequisted.price}
              </Button>
              <Button
                flexGrow="1"
                colorScheme="blue"
                variant="outline"
                bgColor="white"
              >
                العدد : {sizeRequisted.quantity}
              </Button>
            </Flex>
          );
        })}
      </Stack>
    </Flex>
  );
};
