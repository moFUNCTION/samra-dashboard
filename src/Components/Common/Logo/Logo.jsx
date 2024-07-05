import React from "react";
import { Image } from "@chakra-ui/react";
import LogoImage from "../../../Assests/Logo/SAMRA__1_-removebg-preview.png";
export const Logo = ({ ...rest }) => {
  return <Image src={LogoImage} loading="lazy" decoding="async" {...rest} />;
};
