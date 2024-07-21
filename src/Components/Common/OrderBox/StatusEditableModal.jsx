import React, { useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Heading,
  Select,
} from "@chakra-ui/react";
export const StatusEditableModal = ({ status, onChangeStatus, isLoading }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const selectRef = useRef();
  const getStatusInArabic = () => {
    if (status === "pending") {
      return "معلق";
    } else if (status === "processing") {
      return "يتم التحضير";
    } else if (status === "completed") {
      return "تم الانتهاء";
    }
  };
  const onSubmit = () => {
    onChangeStatus(selectRef.current.value);
    onClose();
  };
  return (
    <>
      <Button
        isLoading={isLoading}
        onClick={onOpen}
        flexGrow="1"
        colorScheme="teal"
      >
        الحالة :{getStatusInArabic()}
      </Button>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent m="10px">
          <ModalHeader>تعديل حالة الاوردر</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading
              borderBottom="1px"
              borderBottomColor="gray.600"
              p="3"
              size="md"
            >
              حالة الاودر : {getStatusInArabic()}
            </Heading>
            <Select
              defaultValue={status}
              ref={selectRef}
              cursor="pointer"
              mt="3"
            >
              <option value="pending">معلق</option>
              <option value="processing">يتم التحضير</option>
              <option value="completed">تم الانتهاء</option>
            </Select>
          </ModalBody>
          <ModalFooter gap="3">
            <Button colorScheme="red" mr={3} onClick={onClose}>
              غلق
            </Button>
            <Button onClick={onSubmit} colorScheme="blue">
              تحديث
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
