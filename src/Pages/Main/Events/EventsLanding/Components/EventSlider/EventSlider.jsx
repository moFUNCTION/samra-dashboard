import {
  Heading,
  Stack,
  Image,
  Button,
  ButtonGroup,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { HiArrowUpLeft } from "react-icons/hi2";
import { MdDelete, MdEdit } from "react-icons/md";
import { DeleteModal } from "../../../../../../Components/Common/DeleteModal/DeleteModal";
import { Event } from "../../../../../../Firebase/Utils/Events/Event";
import { Link } from "react-router-dom";
export const EventSlider = ({ URL, title, description, href, id }) => {
  const { isOpen: isImageCompletlyViewed, onToggle } = useDisclosure();
  const {
    isOpen: isOpenedDeleteModal,
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal,
  } = useDisclosure();
  const handleDeleteEvent = async () => {
    const product_init = new Event({});
    await product_init.delete({ id });
  };
  return (
    <>
      <DeleteModal
        onSubmit={handleDeleteEvent}
        isOpen={isOpenedDeleteModal}
        onClose={onCloseDeleteModal}
      />
      <Stack borderRadius="lg" overflow="hidden" h="400px" pos="relative">
        <ButtonGroup zIndex="15" pos="absolute" gap="2" top="2" left="2">
          <Button
            as={Link}
            to={`update/${id}`}
            gap="2"
            colorScheme="green"
            alignItems="center"
          >
            تعديل
            <MdEdit />
          </Button>
          <Button
            onClick={onOpenDeleteModal}
            colorScheme="red"
            gap="2"
            alignItems="center"
          >
            مسح <MdDelete />
          </Button>
          <Button colorScheme="blue" onClick={onToggle}>
            {isImageCompletlyViewed ? "غلق الصورة" : "اظهار الصورة"}
          </Button>
        </ButtonGroup>

        <Image src={URL} w="100%" h="100%" objectFit="cover" />
        <Stack
          pos="absolute"
          bottom="0px"
          left="0"
          bgColor=" rgba(0, 0, 0, 0.191)"
          w="100%"
          h={isImageCompletlyViewed ? "0%" : "100%"}
          overflow="hidden"
          backdropFilter="blur(10px)"
          color="white"
          as="article"
          className="text-container"
          transition="0.5s"
          alignItems="start"
          zIndex="10"
        >
          <Heading p="4" size="lg" w="100%" textAlign="right">
            {title}
          </Heading>
          <Heading p="4" size="md" textAlign="right" w="100%">
            {description}
          </Heading>
          <Flex marginInline="4" gap="1">
            <Button
              variant="outline"
              colorScheme="teal"
              bgColor="white"
              gap="3"
              as={Link}
              to={href}
              target="_blank"
            >
              التوجه
              <HiArrowUpLeft />
            </Button>
            <Button
              variant="outline"
              colorScheme="blue"
              bgColor="white"
              gap="3"
            >
              عرض الاعلان كامل
              <HiArrowUpLeft />
            </Button>
          </Flex>
        </Stack>
      </Stack>
    </>
  );
};
