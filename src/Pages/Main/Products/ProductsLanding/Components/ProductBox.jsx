import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Heading,
  Stack,
  Divider,
  ButtonGroup,
  Button,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { IoArrowUp, IoLogoVimeo, IoQrCodeSharp } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./styles.css";
import { Pagination } from "swiper/modules";
import { QrCodeModal } from "../../../../../Components/Common/QrCodeModal/QrCodeModal";
import { MdDelete, MdLocalShipping } from "react-icons/md";
import { BiComment, BiEdit, BiLike } from "react-icons/bi";
import { Link } from "react-router-dom";
import { DeleteModal } from "../../../../../Components/Common/DeleteModal/DeleteModal";
import { TranslateSize } from "../../../../../Utils/TranslateSize/TranslateSize";
import { BsEyeFill } from "react-icons/bs";
import { Product } from "../../../../../Firebase/Utils/Products/Product";
export const ProductBox = ({
  title,
  images,
  description,
  availabilityType,
  createdAt,
  updatedAt,
  id,
  sizes,
  likesCount,
  categoryId,
}) => {
  const PuplishedDate = new Date(
    createdAt?.seconds * 1000 + createdAt?.nanoseconds / 1000000
  ).toLocaleString();
  const UpdatedDate = new Date(
    updatedAt?.seconds * 1000 + updatedAt?.nanoseconds / 1000000
  ).toLocaleString();
  const {
    isOpen: isOpenedQrCodeReader,
    onOpen: onOpenQrCodeReader,
    onClose: onCloseQrCodeReader,
  } = useDisclosure();
  const {
    isOpen: isOpenedDeleteModal,
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal,
  } = useDisclosure();
  const {
    isOpen: isOpenedPrices,
    onOpen: onOpenPrices,
    onClose: onClosePrices,
  } = useDisclosure();
  const handleDeleteProduct = async () => {
    const product_init = new Product({});
    await product_init.delete({ id });
  };
  return (
    <>
      <DeleteModal
        onSubmit={handleDeleteProduct}
        isOpen={isOpenedDeleteModal}
        onClose={onCloseDeleteModal}
      />
      <QrCodeModal
        isOpen={isOpenedQrCodeReader}
        onClose={onCloseQrCodeReader}
        link={id}
      />
      <Card w="380px">
        <CardBody
          _hover={{
            bgColor: "gray.50",
            cursor: "pointer",
          }}
          transition="0.2s"
          pos="relative"
        >
          <Flex
            overflow="hidden"
            borderRadius="lg"
            pos="relative"
            w="100%"
            h="250px"
            bgColor="gray.50"
          >
            <Swiper
              pagination={true}
              modules={[Pagination]}
              className="mySwiper"
            >
              {images?.map((image, index) => {
                return (
                  <SwiperSlide key={index}>
                    <Image
                      src={image.URL}
                      alt="Green double couch with wooden legs"
                      transition="0.3s"
                      w="100%"
                      h="100%"
                      objectFit="cover"
                      _hover={{
                        transform: "scale(1.10)",
                        filter: "saturate(1.1)",
                      }}
                      decoding="async"
                      loading="lazy"
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Flex>

          <Stack mt="6" spacing="3">
            <Heading size="md">{title}</Heading>
            <Heading size="sm">{description}</Heading>
            <Heading size="sm">التوافر {availabilityType}</Heading>
            <Heading size="sm">الاسعار</Heading>
            <Heading size="xs">
              تاريخ الانشاء
              <span style={{ marginRight: "10px" }}>{PuplishedDate}</span>
            </Heading>
            {updatedAt && (
              <Heading size="xs">
                تاريخ التحديث
                <span style={{ marginRight: "10px" }}>{UpdatedDate}</span>
              </Heading>
            )}
            {!isOpenedPrices && (
              <Button colorScheme="teal" onClick={onOpenPrices}>
                اضغط هنا لاظهار الاسعار
              </Button>
            )}
            {isOpenedPrices && (
              <>
                <Stack
                  key={isOpenedPrices}
                  className=""
                  p="2"
                  bgColor="teal.500"
                  color="white"
                  borderRadius="lg"
                >
                  <Heading
                    mb="3"
                    borderBottom="2px"
                    borderBottomColor="gray.50"
                    size="md"
                    p="2"
                  >
                    الاسعار
                  </Heading>

                  {sizes?.map((child, index) => {
                    const { size, price } = child;
                    return (
                      <Heading
                        size="sm"
                        borderBottom="2px"
                        borderBottomColor="gray.50"
                        p="1"
                        key={index}
                      >
                        {TranslateSize({ title: size })} : {price}
                      </Heading>
                    );
                  })}
                </Stack>
                <Button gap="2" onClick={onClosePrices} colorScheme="red">
                  غلق <IoArrowUp />
                </Button>
              </>
            )}
          </Stack>
        </CardBody>
        <Divider color="gray.200" />
        <CardFooter as={Stack}>
          <ButtonGroup
            sx={{
              "> *": {
                flexGrow: 1,
              },
            }}
            spacing="2"
          >
            <Button onClick={onOpenQrCodeReader} colorScheme="teal" gap="3">
              نسخ qr code
              <IoQrCodeSharp />
            </Button>
            <Button variant="outline" colorScheme="blue">
              المزيد ...
            </Button>
          </ButtonGroup>
          <Flex
            sx={{
              "> *": {
                flexGrow: 1,
              },
            }}
            alignItems="stretch"
            gap="3"
          >
            <Button
              as={Link}
              to={`/categories/${categoryId}/products/${id}`}
              flexGrow="1"
              gap="2"
              variant="solid"
              colorScheme="blue"
            >
              عرض <BsEyeFill />
            </Button>
            <Button
              as={Link}
              to={`/categories/${categoryId}/products/updateProduct/${id}/`}
              gap="2"
              colorScheme="green"
            >
              تحديث
              <BiEdit />
            </Button>
            <Button onClick={onOpenDeleteModal} gap="2" colorScheme="red">
              مسح
              <MdDelete />
            </Button>
          </Flex>
          <Flex
            sx={{
              "> *": {
                flexGrow: 1,
              },
            }}
            flexWrap="wrap"
            gap="2"
          >
            <Button gap="2" colorScheme="blue" variant="outline">
              اعجب من خلال {likesCount}
              <BiLike />
            </Button>
            <Button gap="2" colorScheme="teal">
              التعليقات {10}
              <BiComment />
            </Button>
            <Button gap="2" colorScheme="blue">
              عملية شراء {12}
              <MdLocalShipping />
            </Button>
          </Flex>
        </CardFooter>
      </Card>
    </>
  );
};
