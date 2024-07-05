import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Text,
  Heading,
  Stack,
  Divider,
  ButtonGroup,
  Button,
  IconButton,
  Box,
  Flex,
  useDisclosure,
  Skeleton,
  useToast,
} from "@chakra-ui/react";
import { IoQrCodeSharp } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./styles.css";
import { Pagination } from "swiper/modules";
import { QrCodeModal } from "../../../../../Components/Common/QrCodeModal/QrCodeModal";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { DeleteModal } from "../../../../../Components/Common/DeleteModal/DeleteModal";
import { Category } from "../../../../../Firebase/Utils/Categories/Category";
import { useCollectionCount } from "../../../../../Firebase/Hooks/UseCollectionCount/useCollectionCount";
export const CategoryBox = ({
  title,
  images,
  description,
  availabilityType,
  createdAt,
  updatedAt,
  id,
}) => {
  const toast = useToast({
    position: "top-right",
    duration: 3000,
    isClosable: true,
  });
  const Navigate = useNavigate();
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
  const handleDeleteCategory = async () => {
    const category_init = new Category({});
    await category_init.delete({ id });
    return;
  };
  const { count, loading, error } = useCollectionCount({
    collectionName: "Products",
    GetQuery: `categoryId == ${id}`,
  });
  return (
    <>
      <DeleteModal
        isOpen={isOpenedDeleteModal}
        onClose={onCloseDeleteModal}
        onSubmit={handleDeleteCategory}
      />
      <QrCodeModal
        isOpen={isOpenedQrCodeReader}
        onClose={onCloseQrCodeReader}
        link={id}
      />
      <Card w="380px">
        <CardBody
          _hover={{
            bgColor: "gray.100",
            cursor: "pointer",
            transition: "0.1s",
          }}
          pos="relative"
          as={Link}
          to={id}
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
                      loading="lazy"
                      decoding="async"
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
            <Button colorScheme="teal" isLoading={loading}>
              عدد المنتجات في هذا الصنف : {count}
            </Button>
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
          </Stack>
        </CardBody>
        <Divider color="gray.200" />
        <CardFooter as={Stack}>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue">
              التوجه
            </Button>
            <Button onClick={onOpenQrCodeReader} colorScheme="teal" gap="3">
              نسخ qr code
              <IoQrCodeSharp />
            </Button>
            <Button variant="outline" colorScheme="blue">
              المزيد ...
            </Button>
          </ButtonGroup>
          <ButtonGroup spacing="3">
            <Button as={Link} to={`update/${id}`} gap="2" colorScheme="green">
              تحديث
              <BiEdit />
            </Button>
            <Button
              isLoading={loading}
              onClick={() => {
                if (count === 0) {
                  onOpenDeleteModal();
                  return;
                }
                Navigate(`${id}/products`);
                toast({
                  status: "error",
                  title: "يجب مسح جميع المنتجات من الصنف اولا",
                });
              }}
              gap="2"
              colorScheme="red"
            >
              مسح
              <MdDelete />
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </>
  );
};
