import {
  Button,
  Flex,
  Heading,
  Stack,
  Image,
  Box,
  AlertIcon,
  AlertTitle,
  Alert,
} from "@chakra-ui/react";
import React from "react";
import { Carousel } from "../../../../Components/Layout/Carousel/Carousel";
import { Link } from "react-router-dom";
import { EventSlider } from "./Components/EventSlider/EventSlider";
import { useGetEvents } from "../../../../Firebase/Hooks/Events/useGetEvents/useGetEvents";

export default function Index() {
  const { data, loading, error } = useGetEvents();
  return (
    <Stack p="2">
      <Heading size="lg" borderBottom="2px" borderBottomColor="gray.700" p="3">
        الاحداثيات و الاعلانات
      </Heading>

      {data.length === 0 && (
        <Stack w="100%">
          <Alert
            status="warning"
            h="fit-content"
            justifyContent="center"
            borderRadius="lg"
          >
            <AlertIcon />
            <AlertTitle>لا يوجد بيانات لعرضها</AlertTitle>
          </Alert>
          <Button colorScheme="teal" as={Link} to="add">
            اضافة حدث
          </Button>
        </Stack>
      )}
      {data.length >= 1 && (
        <Carousel
          isLoaded={!loading}
          breakpoints={{}}
          spaceBetween="20px"
          height="400px"
        >
          {data?.map((event) => {
            return (
              <EventSlider
                {...event}
                URL={event.images[0].URL}
                key={event.id}
              />
            );
          })}
        </Carousel>
      )}

      <Flex>
        <Button as={Link} to="add" colorScheme="blue">
          اضافة حدث
        </Button>
      </Flex>
    </Stack>
  );
}
