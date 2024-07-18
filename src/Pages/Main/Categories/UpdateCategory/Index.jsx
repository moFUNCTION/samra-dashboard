import {
  Button,
  Input,
  Select,
  Stack,
  Textarea,
  Text,
  Heading,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { MultiImageUploader } from "../../../../Components/Common/MultiImageUploader/MultiImageUploader";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import { ErrorText } from "../../../../Components/Common/ErrorText/ErrorText";
import { Category } from "../../../../Firebase/Utils/Categories/Category";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { LoadingModal } from "../../../../Components/Common/LoadingModal/LoadingModal";
export default function Index() {
  const [UploadProgressPercent, setUploadProgressPercent] = useState(0);
  const {
    isOpen: isOpenendProgressModal,
    onOpen: onOpenProgressModal,
    onClose: onCloseProgressModal,
  } = useDisclosure();
  const { categoryId } = useParams();
  const toast = useToast({
    position: "top-right",
    duration: 3000,
    isClosable: true,
  });
  const Navigate = useNavigate();
  const {
    formState: { errors, isSubmitting, isLoading },
    register,
    control,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: async () => {
      const category_init = new Category({});
      const category_res = await category_init.get({ id: categoryId });
      return category_res;
    },
  });
  const { append, fields, remove } = useFieldArray({
    control,
    name: "images",
  });
  const HandleAddImage = (files) => {
    Array.from(files).forEach((file) => {
      append({
        value: file,
      });
    });
  };
  const HandleRemoveItem = ({ index }) => {
    remove(index);
  };
  const HandleRemoveAll = () => {
    remove();
  };
  const onSubmit = async (data) => {
    try {
      onOpenProgressModal();
      const category_init = new Category({ ...data, images: fields });

      const addCategoryReq = await category_init.update({
        id: categoryId,
        onUploadProgress: ({ progress, state }) => {
          setUploadProgressPercent(progress);
        },
      });
      toast({
        status: "success",
        title: "تم تحديث الصنف بنجاح يزعيم",
      });
      Navigate("/categories");
      onCloseProgressModal();
    } catch (err) {
      toast({
        status: "error",
        title: "حدث خطأ الرجاء التحدث مع الدعم",
        description: err.message,
      });
      console.log(err);
    }
  };
  return (
    <>
      <LoadingModal
        progress={UploadProgressPercent}
        isOpen={isOpenendProgressModal}
        onClose={() => {
          window.location.reload();
        }}
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
          images={fields.map((field) => {
            return { value: field.URL, Path: field.Path, ...field };
          })}
          bgColor={errors.images ? "red.500" : "blue.600"}
          isLoaded={!isLoading}
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
          placeholder="اسم الصنف"
          border="1px"
          borderColor="gray.300"
          isDisabled={isLoading}
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
          isDisabled={isLoading}
        />
        <ErrorText errors={errors} path="description" ml="auto" />

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
          isDisabled={isLoading}
        >
          <option value="local">في المطعم فقط</option>
          <option value="delivery">للتوصيل فقط</option>
          <option value="puplic">متاح للتوصيل وللطلب بالمطعم</option>
        </Select>
        <ErrorText errors={errors} path="availabilityType" ml="auto" />

        <Button
          isLoading={isSubmitting || isLoading}
          colorScheme="blue"
          onClick={handleSubmit(onSubmit)}
        >
          تعديل الصنف
        </Button>
      </Stack>
    </>
  );
}
