import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  AspectRatio,
  useMediaQuery,
  Heading,
} from "@chakra-ui/react";
export const LocationModal = ({
  onClose,
  isOpen,
  location,
  title,
  size = "2xl",
}) => {
  const [isPhoneQuery] = useMediaQuery("(max-width: 900px)");
  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
      size={isPhoneQuery ? "full" : size}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {typeof location === "object" ? (
            <AspectRatio h="100%" ratio={isPhoneQuery ? 2 / 4 : 16 / 9}>
              <iframe
                style={{ border: 0, width: "100%", height: "100%" }}
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps?q=${location.latitude},${location.longitude}&hl=es;z=14&output=embed`}
              ></iframe>
            </AspectRatio>
          ) : (
            <Heading size="md" bgColor="gray.100" p="4" borderRadius="md">
              {location}
            </Heading>
          )}
        </ModalBody>
        <ModalFooter gap="2">
          <Button colorScheme="red" mr={3} onClick={onClose}>
            اغلاق
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
