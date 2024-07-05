import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Select,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Logo } from "../../../Components/Common/Logo/Logo";
import React, { useCallback, useState } from "react";
import { ImageUploader } from "../../../Components/Common/ImageUploader/ImageUploader";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import { Email_Registeration } from "../../../Firebase/Utils/Auth/Registeration/RegisterWithEmail/RegisterWithEmail";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { AuthProviderModal } from "../../../Components/Common/AuthProviderModal/AuthProviderModal";
import { ErrorText } from "../../../Components/Common/ErrorText/ErrorText";
import { Link, Navigate } from "react-router-dom";
import {
  FacebookRegisteration,
  GoogleRegisteration,
} from "../../../Firebase/Utils/Auth/Registeration/RegisterWithProvider/RegisterWithProvider";
import { UseUserData } from "../../../Context/UserDataProvider/UserDataProvider";
import { CenteredCircularProgress } from "./../../../Components/Common/CenteredCircularProgress/CenteredCircularProgress";
export default function Index() {
  const { user, HandleRender } = UseUserData();
  const toast = useToast({
    position: "top-right",
    duration: 3000,
    isClosable: true,
  });
  const {
    register,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });
  const image = useWatch({ control, name: "image" });
  const HandleChangeImage = (file) => {
    setValue("image", file);
  };
  const HandleRemoveImage = () => {
    setValue("image", "");
  };
  const onSubmitWithEmail = async (data) => {
    try {
      const registeration = new Email_Registeration(data);
      const req = await registeration.createUserRequiest();
      HandleRender();
    } catch (err) {
      toast({
        title: err.message,
        description: "الرجاء المحاولة لاحقا او محادثة الدعم",
        status: "error",
      });
      console.log(err);
    }
  };
  const [AuthProviderType, setAuthProviderType] = useState();
  const {
    isOpen: isAuthProviderModalOpened,
    onOpen: onOpenAuthProviderModal,
    onClose: onCloseAuthProviderModal,
  } = useDisclosure();
  const onSubmitWithProvider = async (data) => {
    try {
      if (AuthProviderType === "google") {
        const google_regsiter = new GoogleRegisteration(data);
        const req = await google_regsiter.SignToProviderRequist();
        HandleRender();
      } else if (AuthProviderType === "facebook") {
        const facebook_register = new FacebookRegisteration(data);
        const req = await facebook_register.SignToProviderRequist();
        HandleRender();
      }
    } catch (err) {
      toast({
        title: err.message,
        description: "الرجاء المحاولة لاحقا او محادثة الدعم",
        status: "error",
      });
    }
  };
  if (user.loading) {
    return <CenteredCircularProgress />;
  }
  if (user.data) {
    return <Navigate to="/" state={{ from: "register" }} />;
  }
  return (
    <>
      <AuthProviderModal
        isOpen={isAuthProviderModalOpened}
        onClose={onCloseAuthProviderModal}
        onSubmit={onSubmitWithProvider}
      />
      <Stack
        alignItems="center"
        justifyContent="center"
        minH="100vh"
        bgColor="orange.800"
        p="10px"
      >
        <Stack
          p="10px"
          w="100%"
          maxW="600px"
          bgColor="white"
          borderRadius="lg"
          alignItems="center"
          pos="relative"
          gap="3"
          as="form"
        >
          <Logo w="100px" />
          <Heading
            borderBottom="1px"
            borderBottomColor="gray.500"
            as="h2"
            size="md"
            p="3"
          >
            اهلا بك في سيستم Samra
          </Heading>
          <ImageUploader
            image={image}
            onChange={HandleChangeImage}
            onRemove={HandleRemoveImage}
            label="رفع صورة للملف الشخصي"
          />
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
          <ErrorText errors={errors} path="role" ml="auto" />
          <Input
            isInvalid={errors.email}
            {...register("email")}
            placeholder="البريد الالكتروني"
            _placeholder={{ color: errors.email && "red.600" }}
          />
          <ErrorText errors={errors} path="email" ml="auto" />
          <Input
            isInvalid={errors.username}
            {...register("username")}
            placeholder="اسم المستخدم"
            _placeholder={{ color: errors.username && "red.600" }}
          />
          <ErrorText errors={errors} path="username" ml="auto" />
          <Input
            isInvalid={errors.phoneNumber}
            {...register("phoneNumber", {
              valueAsNumber: true,
            })}
            placeholder="رقم الهاتف"
            _placeholder={{ color: errors.phoneNumber && "red.600" }}
            type="number"
          />
          <ErrorText errors={errors} path="phoneNumber" ml="auto" />
          <Input
            isInvalid={errors.password}
            _placeholder={{ color: errors.password && "red.600" }}
            {...register("password")}
            placeholder="الرقم السري"
          />
          <ErrorText errors={errors} path="password" ml="auto" />

          <Input
            isInvalid={errors.confirmPassword}
            _placeholder={{ color: errors.confirmPassword && "red.600" }}
            {...register("confirmPassword")}
            placeholder="نأكيد الرقم السري "
          />
          <ErrorText errors={errors} path="confirmPassword" ml="auto" />

          <Button
            whiteSpace="wrap"
            as={Link}
            to="/login"
            variant="link"
            ml="auto"
            mr="10px"
          >
            لديك حساب بالفعل ؟ الرجاء الضغط هنا لتسجيل الدخول
          </Button>
          <Button
            isLoading={isSubmitting}
            onClick={handleSubmit(onSubmitWithEmail)}
            colorScheme="orange"
            w="100%"
          >
            انشاء حساب
          </Button>
          <Button
            alignItems="center"
            gap="3"
            colorScheme="blue"
            variant="outline"
            w="100%"
            isLoading={isSubmitting}
            onClick={() => {
              setAuthProviderType("google");
              onOpenAuthProviderModal();
            }}
          >
            تسجيل الدخول بجوجل
            <FcGoogle style={{ fontSize: "20px", marginTop: "1px" }} />
          </Button>
          <Button
            isLoading={isSubmitting}
            colorScheme="blue"
            w="100%"
            alignItems="center"
            gap="3"
            onClick={() => {
              setAuthProviderType("facebook");
              onOpenAuthProviderModal();
            }}
            isDisabled
          >
            تسجيل الدخول بفيسبوك
            <FaFacebook style={{ fontSize: "20px", marginTop: "1px" }} />
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
