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
import { useNavigate, useParams } from "react-router-dom";
import { LoadingModal } from "../../../../Components/Common/LoadingModal/LoadingModal";
import { useRef, useState } from "react";
import { Event } from "../../../../Firebase/Utils/Events/Event";
export default function Index() {
  const { id } = useParams();
  const [UploadProgressPercent, setUploadProgressPercent] = useState(0);
  const {
    isOpen: isOpenendProgressModal,
    onOpen: onOpenProgressModal,
    onClose: onCloseProgressModal,
  } = useDisclosure();
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
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: async () => {
      const event_init = new Event({});
      const event_res = await event_init.get({ id });
      return event_res;
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
      const event_init = new Event({ ...data, images: fields });
      const add_event_req = await event_init.update({
        id,
        onUploadProgress: ({ progress, state }) => {
          setUploadProgressPercent(progress);
        },
      });
      toast({
        status: "success",
        title: "تم اضافة الحدث بنجاح يزعيم",
      });
      Navigate("/events");
      onCloseProgressModal();
    } catch (err) {
      onCloseProgressModal();
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
        label="يتم اضافة الحدث"
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
        <Heading
          borderBottom="2px"
          borderBottomColor="blue.700"
          color="blue.700"
          p="3"
          size="md"
        >
          تحديث حدث او اعلان
        </Heading>
        <MultiImageUploader
          onChange={HandleAddImage}
          onRemoveItem={HandleRemoveItem}
          onRemoveAllItems={HandleRemoveAll}
          images={fields.map((field) => {
            return { value: field.URL, Path: field.Path, ...field };
          })}
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
          placeholder="عنوان للحدث"
          border="1px"
          borderColor="gray.300"
        />
        <ErrorText errors={errors} path="title" ml="auto" />
        <Textarea
          isInvalid={errors.description}
          _placeholder={{ color: errors.description && "red.600" }}
          {...register("description")}
          placeholder="وصف الحدث"
          border="1px"
          borderColor="gray.300"
          maxH="200px"
        />
        <ErrorText errors={errors} path="description" ml="auto" />
        <Textarea
          isInvalid={errors.href}
          _placeholder={{ color: errors.href && "red.600" }}
          {...register("href")}
          placeholder="رابط الحدث"
          border="1px"
          borderColor="gray.300"
          maxH="200px"
        />
        <ErrorText errors={errors} path="href" ml="auto" />
        <Button
          isLoading={isSubmitting}
          colorScheme="blue"
          onClick={handleSubmit(onSubmit)}
        >
          تحديث الحدث او الاعلان
        </Button>
      </Stack>
    </>
  );
}
