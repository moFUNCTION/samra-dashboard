import { Flex } from "@chakra-ui/react";
import React from "react";
import {
  IconButton,
  Stack,
  HStack,
  Heading,
  Button,
  Divider,
  Tooltip,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
export const Outcome = () => {
  return (
    <Stack
      p="3"
      gap="3"
      borderRadius="xl"
      alignItems="start"
      transition="0.3s"
      bgColor="green.500"
      color="white"
      _hover={{
        bgColor: `green.700`,
      }}
      pos="relative"
      zIndex="2"
      overflow="hidden"
      _before={{
        content: `""`,
        pos: "absolute",
        w: "150px",
        h: "150px",
        opacity: 0.2,
        bgColor: "gray.100",
        left: "-40px",
        bottom: "-40px",
        zIndex: "1",
        borderRadius: "full",
      }}
      _after={{
        content: `""`,
        pos: "absolute",
        w: "100px",
        h: "100px",
        opacity: 0.2,
        bgColor: "gray.100",
        left: "-20px",
        bottom: "-20px",
        zIndex: "1",
        borderRadius: "full",
      }}
    >
      <HStack justifyContent="space-between" w="100%">
        <HStack>
          <Tooltip label="الدخل في شهر">
            <IconButton
              colorScheme={colorScheme}
              variant="outline"
              bgColor="white"
              borderRadius="full"
            >
              {icon}
            </IconButton>
          </Tooltip>

          <Heading size="md">{title}</Heading>
        </HStack>
        <Button
          colorScheme={colorScheme}
          variant="outline"
          bgColor="white"
          as={Link}
          to={href}
        >
          فحص
        </Button>
      </HStack>
      <Heading size="md">{textHelper}</Heading>
      <Divider color="gray.50" />
      <Heading
        size="lg"
        bgColor="rgba(255, 255, 255, 0.195)"
        borderRadius="md"
        p="2"
      >
        {count}
      </Heading>
    </Stack>
  );
};
