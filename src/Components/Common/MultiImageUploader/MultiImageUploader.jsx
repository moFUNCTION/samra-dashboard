import {
  Button,
  Flex,
  HStack,
  Heading,
  Skeleton,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import styles from "./styles.module.css";
import { ImageBox } from "./ImageBox";
import { ImBin2 } from "react-icons/im";

export const MultiImageUploader = ({
  images,
  onChange,
  onRemoveItem,
  onRemoveAllItems,
  isLoaded,
  ...rest
}) => {
  const [isPhoneQuery] = useMediaQuery("(max-width: 800px)");
  const renderedImages = useMemo(() => {
    return images instanceof Array
      ? images?.map((image) => {
          return {
            ...image,
            value:
              image.value instanceof File
                ? URL.createObjectURL(image.value)
                : image.value,
          };
        })
      : undefined;
  }, [images]);

  const HandleChange = (e) => {
    onChange(e.target.files);
  };
  const HandleRemoveItem = ({ index, item }) => {
    onRemoveItem({ index, item });
  };
  return (
    <>
      <Flex
        flexWrap="wrap"
        gap="3"
        bgColor="blue.600"
        justifyContent={isPhoneQuery && "center"}
        p="3"
        borderRadius="lg"
        as={Skeleton}
        minH="200px"
        isLoaded={isLoaded}
        fadeDuration={1}
        {...rest}
      >
        {renderedImages?.map((image, index) => {
          return (
            <ImageBox
              onRemove={() => HandleRemoveItem({ index, item: images[index] })}
              key={image.id}
              src={image.value}
            />
          );
        })}
        <Button
          justifyContent="center"
          alignItems="center"
          w="200px"
          h="200px"
          borderRadius="lg"
          border="2px"
          borderColor="gray.300"
          borderStyle="dashed"
          colorScheme="blue"
          variant="outline"
          bgColor="white"
          flexDir="column"
          gap="3"
          as="label"
          htmlFor="1"
          cursor="pointer"
          transition="0.3s"
          key={images?.length}
          className={styles["upload-btn"]}
        >
          <IoAddCircleOutline
            style={{
              fontSize: "30px",
            }}
          />
          <Heading size="sm">اضافة صورة</Heading>
          <input
            type="file"
            id="1"
            hidden
            onChange={HandleChange}
            accept="image/*"
            multiple={true}
          />
        </Button>
        {images?.length >= 2 && (
          <Button
            justifyContent="center"
            alignItems="center"
            w="200px"
            h="200px"
            borderRadius="lg"
            colorScheme="red"
            flexDir="column"
            gap="3"
            transition="0.3s"
            onClick={onRemoveAllItems}
          >
            <ImBin2
              style={{
                fontSize: "30px",
              }}
            />
            <Heading size="sm">مسح جميع الصور</Heading>
          </Button>
        )}
      </Flex>
    </>
  );
};
