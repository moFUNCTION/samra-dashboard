import React, { useRef, useState } from "react";
import {
  Image,
  useToast,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
export const DeleteModal = ({ isOpen, onClose, onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const DeleteItem = async () => {
    try {
      setLoading(true);
      const req = await onSubmit();
      onClose();
      toast({
        title: "تم الحذف بنجاح",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      setLoading(false);
    } catch (err) {
      onClose();
      toast({
        title: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      setLoading(false);
    }
  };
  return (
    <Modal
      motionPreset="slideInBottom"
      isCentered
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay backdropFilter="blur(2px)" />

      <ModalContent m="10px" alignItems="center">
        <ModalHeader>تأكيد عملية الحذف ⛔</ModalHeader>
        <ModalCloseButton />
        <ModalBody>هل انت متأكد من اتمام عملية الحذف</ModalBody>
        <ModalFooter gap="10px">
          <Button
            isLoading={loading}
            colorScheme="blue"
            mr={3}
            onClick={onClose}
          >
            التراجع
          </Button>
          <Button isLoading={loading} colorScheme="red" onClick={DeleteItem}>
            حذف
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
