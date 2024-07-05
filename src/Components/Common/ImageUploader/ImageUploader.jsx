import { Button, Stack, Image, Box, ButtonGroup } from "@chakra-ui/react";
import Lottie from "lottie-react";
import React, { useMemo, useState } from "react";
import AnimationData from "../../../Assests/Image Uploader/Animation - 1717559728391.json";
export const ImageUploader = ({
  image,
  onChange,
  onRemove,
  label,
  colorScheme,
  ...rest
}) => {
  const renderedImage = useMemo(() => {
    return image instanceof File ? URL.createObjectURL(image) : image;
  }, [image]);
  const HandleChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChange(file);
    }
  };
  return (
    <Stack
      w="100%"
      bgColor={image ? "green.500" : "orange.700"}
      justifyContent="center"
      alignItems="center"
      borderRadius="xl"
      p="3"
      transition="0.3s"
      {...rest}
    >
      {renderedImage ? (
        <>
          <Box
            overflow="hidden"
            borderRadius="lg"
            _hover={{
              img: {
                transform: "scale(1.05)",
              },
            }}
          >
            <Image
              transition="0.3s"
              w="100%"
              maxW="250px"
              src={renderedImage}
              alt="image"
            />
          </Box>
          <ButtonGroup>
            <Button
              cursor="pointer"
              as="label"
              colorScheme="green"
              variant="outline"
              bgColor="white"
            >
              تعديل
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={HandleChangeImage}
              />
            </Button>
            <Button onClick={onRemove} colorScheme="red">
              حذف
            </Button>
          </ButtonGroup>
        </>
      ) : (
        <>
          <Lottie animationData={AnimationData} style={{ width: "100px" }} />
          <Button
            cursor="pointer"
            as="label"
            colorScheme="orange"
            variant="outline"
            bgColor="white"
          >
            {label}
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={HandleChangeImage}
            />
          </Button>
        </>
      )}
    </Stack>
  );
};
