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
  Stack,
  CircularProgress,
  CircularProgressLabel,
  Text,
} from "@chakra-ui/react";
export const LoadingModal = ({ onClose, isOpen, progress, label }) => {
  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{label}</ModalHeader>

        <ModalCloseButton />
        <ModalBody>
          <Stack alignItems="center" justifyContent="center">
            <CircularProgress
              color={
                progress > 50
                  ? "green.500"
                  : progress < 10
                  ? "red.500"
                  : "blue.500"
              }
              value={progress}
              isIndeterminate={!progress || progress === 100}
              size={180}
            >
              {progress !== undefined && (
                <CircularProgressLabel>{progress}%</CircularProgressLabel>
              )}
            </CircularProgress>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button isDisabled={progress > 90} colorScheme="blue">
            تراجع
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
