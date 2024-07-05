import React, { useCallback, useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Flex,
  HStack,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Logo } from "../../../Components/Common/Logo/Logo";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import { ErrorText } from "../../../Components/Common/ErrorText/ErrorText";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { AuthProviderModal } from "../../../Components/Common/AuthProviderModal/AuthProviderModal";
import {
  FacebookRegisteration,
  GoogleRegisteration,
} from "../../../Firebase/Utils/Auth/Registeration/RegisterWithProvider/RegisterWithProvider";
import { LoginWithEmail } from "../../../Firebase/Utils/Auth/Login/Login";
import { UseUserData } from "../../../Context/UserDataProvider/UserDataProvider";
import { CenteredCircularProgress } from "../../../Components/Common/CenteredCircularProgress/CenteredCircularProgress";

export default function Index() {
  const { state } = useLocation();
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
    setError,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });
  const onSubmitWithEmail = async (data) => {
    try {
      const email_login = new LoginWithEmail(data);
      const req = await email_login.loginrRequist();
      HandleRender();
    } catch (err) {
      setError("root", { message: err.message });
      toast({
        title: err.message,
        description: "بيانات خاطئة",
        status: "error",
      });
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
      setError("root", { message: err.message });
      toast({
        title: err.message,
        description: "بيانات خاطئة",
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
        p="3"
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
        >
          <Logo w="100px" />
          <Heading
            borderBottom="1px"
            borderBottomColor="gray.500"
            as="h2"
            size="md"
            p="3"
            color="gray.700"
          >
            اهلا بك في سيستم Samra
          </Heading>
          <Heading
            size="sm"
            borderBottom="1px"
            borderBottomColor="gray.500"
            as="h2"
            p="1"
            color="gray.700"
          >
            تسجيل الدخول
          </Heading>
          {errors.root && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>{errors.root.message}</AlertTitle>
              <AlertDescription>بيانات خاطئة</AlertDescription>
            </Alert>
          )}
          {state?.from === "/" && (
            <Alert status="warning">
              <AlertIcon />
              يجب عليك التسجيل اولا لتصفح نظام المشرفين
            </Alert>
          )}

          <Input
            isInvalid={errors.email}
            {...register("email")}
            placeholder="البريد الالكتروني"
            _placeholder={{ color: errors.email && "red.600" }}
          />
          <ErrorText errors={errors} path="email" ml="auto" />
          <Input
            isInvalid={errors.password}
            _placeholder={{ color: errors.password && "red.600" }}
            {...register("password")}
            placeholder="الرقم السري"
          />
          <ErrorText errors={errors} path="password" ml="auto" />
          <Button as={Link} variant="link" ml="auto" mr="10px">
            نسيت الرقم السري ؟ الرجاء الضغط هنا
          </Button>
          <Button as={Link} to="/register" variant="link" ml="auto" mr="10px">
            ليس لديك حساب ؟ الرجاء الضغط هنا لانشاء حساب
          </Button>
          <Button
            isLoading={isSubmitting}
            onClick={handleSubmit(onSubmitWithEmail)}
            colorScheme="orange"
            w="100%"
          >
            تسجيل الدخول
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
