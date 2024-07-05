import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination } from "swiper/modules";
import { Flex, Skeleton } from "@chakra-ui/react";
import styles from "./styles.module.css";
export const Carousel = ({
  children,
  breakpoints,
  spaceBetween,
  isLoaded,
  height,
  ...rest
}) => {
  const renderedChildren = Array.isArray(children) ? children : [children];
  return (
    <>
      {isLoaded ? (
        <Swiper
          pagination={true}
          spaceBetween={spaceBetween}
          breakpoints={
            breakpoints || {
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 30,
              },
            }
          }
          modules={[Pagination]}
          className={`${styles.swiper}`}
          {...rest}
        >
          {renderedChildren?.map((child, index) => {
            return (
              <SwiperSlide className={styles["swiper-slide"]} key={index}>
                {child}
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <Skeleton fadeDuration={1} h={height} borderRadius="lg" bgColor="red" />
      )}
    </>
  );
};
