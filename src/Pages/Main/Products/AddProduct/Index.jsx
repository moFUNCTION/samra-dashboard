import {
  Button,
  Input,
  Select,
  Stack,
  Textarea,
  Text,
  Heading,
  useToast,
  Flex,
  HStack,
  Box,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  IconButton,
  useMediaQuery,
  useDisclosure,
} from "@chakra-ui/react";
import { MultiImageUploader } from "../../../../Components/Common/MultiImageUploader/MultiImageUploader";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import { ErrorText } from "../../../../Components/Common/ErrorText/ErrorText";
import { useNavigate, useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { Product } from "./../../../../Firebase/Utils/Products/Product";
import { LoadingModal } from "../../../../Components/Common/LoadingModal/LoadingModal";
import { useState } from "react";
export default function Index() {
  const [UploadProgressPercent, setUploadProgressPercent] = useState(0);
  const {
    isOpen: isOpenendProgressModal,
    onOpen: onOpenProgressModal,
    onClose: onCloseProgressModal,
  } = useDisclosure();
  const { categoryId } = useParams();
  const [isPhoneQuery] = useMediaQuery("(max-width: 800px)");
  const toast = useToast({
    position: "top-right",
    duration: 3000,
    isClosable: true,
  });
  const Navigate = useNavigate();
  const {
    formState: { errors, isSubmitting },
    register,
    control,
    handleSubmit,
    getValues,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      images: [],
    },
  });
  const {
    append: appendImage,
    fields: images,
    remove: removeImage,
  } = useFieldArray({
    control,
    name: "images",
  });
  const HandleAddImage = async (files) => {
    await Array.from(files).forEach((file) => {
      appendImage({
        value: file,
      });
    });
  };
  const HandleRemoveItem = ({ index }) => {
    removeImage(index);
  };
  const HandleRemoveAll = () => {
    removeImage();
  };
  const {
    append: appendSize,
    remove: removeSize,
    fields: sizes,
  } = useFieldArray({ control, name: "sizes" });
  const HandleAddNewSize = async () => {
    const [size, price] = getValues(["size", "price"]);
    if (!isNaN(price) && price !== undefined && price >= 0) {
      await appendSize({
        size,
        price,
      });
      reset({
        size: "2xl",
        price: 0,
      });
      return;
    }
    toast({
      status: "error",
      title: "خطأ",
      description: "السعر يجب ان يكون رقم اكثر من صفر",
    });
  };
  const HandleDeleteSize = (index) => {
    removeSize(index);
  };
  const onSubmit = async (data) => {
    try {
      onOpenProgressModal();
      const product_init = new Product({ ...data, categoryId, images, sizes });
      const add_product_req = await product_init.add({
        onUploadProgress: ({ progress, state }) => {
          setUploadProgressPercent(progress);
        },
      });
      toast({
        status: "success",
        title: "تم اضافة المنتج بنجاح",
      });
      Navigate(`/categories/${categoryId}/products`);
      return add_product_req;
    } catch (err) {
      toast({
        status: "error",
        title: "حدث خطأ الرجاء التحدث مع الدعم",
        description: err.message,
      });
    }
  };

  return (
    <>
      <LoadingModal
        isOpen={isOpenendProgressModal}
        onClose={onCloseProgressModal}
        progress={UploadProgressPercent}
      />
      <Stack
        gap="3"
        p="3"
        sx={{
          " > *": {
            flexGrow: 0,
          },
        }}
      >
        <MultiImageUploader
          onChange={HandleAddImage}
          onRemoveItem={HandleRemoveItem}
          onRemoveAllItems={HandleRemoveAll}
          images={images}
          bgColor={errors.images ? "red.500" : "blue.600"}
          isLoaded
        />
        <ErrorText
          errors={errors}
          path="images"
          ml="auto"
          mb="10px"
          pb="5px"
          borderBottom="2px"
          borderBottomColor="red.600"
          fontSize="20px"
          w="100%"
        />
        <Input
          isInvalid={errors.title}
          _placeholder={{ color: errors.title && "red.600" }}
          {...register("title")}
          placeholder="اسم المنتج"
          border="1px"
          borderColor="gray.300"
        />
        <ErrorText errors={errors} path="title" ml="auto" />

        <Textarea
          isInvalid={errors.description}
          _placeholder={{ color: errors.description && "red.600" }}
          {...register("description")}
          placeholder="الوصف"
          border="1px"
          borderColor="gray.300"
          maxH="200px"
        />
        <ErrorText errors={errors} path="description" ml="auto" />
        <Stack borderRadius="lg" gap="4" bgColor="gray.50" p="3">
          <Heading mr="1" size="sm">
            الاحجام بالسعر
          </Heading>
          {sizes.length !== 0 && (
            <Stack
              p="3"
              bgColor={errors?.sizes?.root ? "red.300" : "gray.200"}
              borderRadius="lg"
            >
              {sizes.map((size, index) => {
                return (
                  <Flex
                    flexWrap={isPhoneQuery && "wrap"}
                    key={size.id}
                    gap="2"
                    alignItems="end"
                  >
                    <Stack w="100%">
                      <HStack gap="3">
                        <Heading mr="1" size="sm">
                          الحجم {index + 1}
                        </Heading>
                        {errors?.sizes?.[index]?.size && (
                          <Heading size="sm" color="red.600">
                            {errors.sizes[index]?.size?.message}
                          </Heading>
                        )}
                      </HStack>

                      <Select
                        bgColor="white"
                        {...register(`sizes.${index}.size`)}
                        cursor="pointer"
                        placeholder="الحجم"
                        color={errors?.sizes?.[index]?.size && "red.600"}
                        isInvalid={errors?.sizes?.[index]?.size}
                      >
                        <option value="2xl">عائلي</option>
                        <option value="xl">فردين</option>
                        <option value="lg">كبير</option>
                        <option value="md">وسط</option>
                        <option value="sm">صغير</option>
                      </Select>
                      <ErrorText
                        errors={errors}
                        path={`sizes.${index}.size`}
                        ml="auto"
                      />
                    </Stack>
                    <Stack w="100%">
                      {errors?.sizes?.[index]?.price && (
                        <Heading size="sm" color="red.600">
                          {errors.sizes[index]?.price?.message}
                        </Heading>
                      )}
                      <Input
                        placeholder="السعر"
                        bgColor="white"
                        {...register(`sizes.${index}.price`, {
                          valueAsNumber: true,
                        })}
                        type="number"
                        isInvalid={errors?.sizes?.[index]?.price}
                      />
                    </Stack>

                    <IconButton
                      onClick={() => HandleDeleteSize(index)}
                      colorScheme="red"
                      flexGrow="1"
                    >
                      <MdDelete />
                    </IconButton>
                  </Flex>
                );
              })}
            </Stack>
          )}
          <ErrorText errors={errors?.sizes} path="root" ml="auto" />

          <Flex flexWrap={isPhoneQuery && "wrap"} gap="2" alignItems="end">
            <Stack w="100%">
              <Heading mr="1" size="sm">
                الحجم الذي سيتم اضافته
              </Heading>
              <Select cursor="pointer" bgColor="white" {...register(`size`)}>
                <option value="2xl">عائلي</option>
                <option value="xl">فردين</option>
                <option value="lg">كبير</option>
                <option value="md">وسط</option>
                <option value="sm">صغير</option>
              </Select>
            </Stack>
            <Input
              placeholder="السعر"
              bgColor="white"
              type="number"
              {...register(`price`, { valueAsNumber: true })}
            />

            <Button
              onClick={HandleAddNewSize}
              flexShrink="0"
              flexGrow="1"
              colorScheme="teal"
            >
              اضافة
            </Button>
          </Flex>
        </Stack>
        <Heading
          size="sm"
          pr="2"
          color={errors.availabilityType ? "red.500" : "blue.600"}
        >
          التوافر*
        </Heading>
        <Select
          {...register("availabilityType", { value: "puplic" })}
          cursor="pointer"
          placeholder="التوافر"
          border="1px"
          borderColor="gray.300"
          color={errors.availabilityType && "red.600"}
          isInvalid={errors.availabilityType}
        >
          <option value="local">في المطعم فقط</option>
          <option value="delivery">للتوصيل فقط</option>
          <option value="puplic">متاح للتوصيل وللطلب بالمطعم</option>
        </Select>
        <ErrorText errors={errors} path="availabilityType" ml="auto" />
        <InputGroup>
          <Input
            {...register("time", {
              valueAsNumber: true,
            })}
            isInvalid={errors.time}
            _placeholder={{ color: errors.time && "red.600" }}
            placeholder="مدة التحضير"
            bgColor="white"
            type="number"
          />
          <InputRightAddon>بالدقيقة</InputRightAddon>
        </InputGroup>
        <ErrorText errors={errors} path="time" ml="auto" />

        <Button
          isLoading={isSubmitting}
          colorScheme="blue"
          onClick={handleSubmit(onSubmit)}
        >
          اضافة المنتج
        </Button>
      </Stack>
    </>
  );
}
