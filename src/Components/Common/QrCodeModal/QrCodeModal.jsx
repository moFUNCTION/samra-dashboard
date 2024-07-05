import {
  useToast,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Tooltip,
  Stack,
  Flex,
} from "@chakra-ui/react";
import html2canvas from "html2canvas";
import { useRef } from "react";
import QRCode from "react-qr-code";
export const QrCodeModal = ({ isOpen, onClose, link }) => {
  const toast = useToast();
  const qrCodeRef = useRef();
  const handleDownload = async () => {
    const canvas = await html2canvas(qrCodeRef.current);
    const dataUrl = canvas.toDataURL("image/png");
    const linkTag = document.createElement("a");
    linkTag.href = dataUrl;
    linkTag.download = "qr-code.png";
    document.body.appendChild(linkTag);
    linkTag.click();
    document.body.removeChild(linkTag);
  };

  const HandleCopyLink = () => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        toast({
          title: "تم نسخ الرابط بنجاح",
          position: "top-right",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal
      motionPreset="slideInBottom"
      isCentered
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay backdropFilter="blur(2px)" />
      <ModalContent p="10px" m="10px" alignItems="center">
        <ModalHeader>رمز ال Qr-code</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          p="20px"
          bgColor="gray.200"
          borderRadius="lg"
          w="100%"
          alignItems="center"
          as={Stack}
        >
          <div ref={qrCodeRef}>
            <QRCode value={link} size={256} />
          </div>
          <Flex justifyContent="center" mt="4" gap="3" w="100%">
            <Button onClick={handleDownload} colorScheme="teal">
              تحميل صورة لل qr code
            </Button>
            <Tooltip label="copy the link">
              <Button onClick={HandleCopyLink} colorScheme="blue">
                نسخ الرابط
              </Button>
            </Tooltip>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
