import React, { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Stack,
  Select,
  Input,
} from "@chakra-ui/react";
import { ErrorText } from "../ErrorText/ErrorText";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";

export const AuthProviderModal = ({ onClose, isOpen, onSubmit }) => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });
  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
      size="xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>الرجاء اكمال الحقول التالية</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack>
            <Select
              {...register("role")}
              placeholder="الدور الوظيفي"
              cursor="pointer"
              color={errors.role && "red.600"}
              isInvalid={errors.role}
            >
              <option value="Admin">مشرف</option>
              <option value="Editor">محرر</option>
              <option value="Accountant">محاسب</option>
              <option value="Delivery">عامل توصيل</option>
            </Select>
            <ErrorText errors={errors} path="role" ml="auto" mt="10px" />
            <Input
              isInvalid={errors.phoneNumber}
              {...register("phoneNumber", {
                valueAsNumber: true,
              })}
              type="number"
              placeholder="رقم الهاتف"
              _placeholder={{ color: errors.phoneNumber && "red.600" }}
            />
            <ErrorText errors={errors} path="phoneNumber" ml="auto" mt="10px" />
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" ml={3} onClick={handleSubmit(onSubmit)}>
            تأكيد
          </Button>
          <Button onClick={onClose} colorScheme="red" variant="outline">
            الغاء
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
