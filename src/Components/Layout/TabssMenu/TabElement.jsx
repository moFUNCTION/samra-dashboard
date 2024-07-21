import React, { useState } from "react";
// react router =>{
import { Link } from "react-router-dom";
// }
// chakra componens =>{
import {
  Tab,
  AccordionIcon,
  Tabs,
  AccordionPanel,
  AccordionItem,
  AccordionButton,
  Accordion,
  Button,
  Icon,
} from "@chakra-ui/react";
// }
import { MdKeyboardArrowLeft } from "react-icons/md";
export const TabElement = ({ expand, title, href, icon, childLinks }) => {
  return childLinks && expand ? (
    <Tab {...styles.tab}>
      <Accordion w="100%" h="100%" allowToggle>
        <AccordionItem border="none">
          <AccordionButton
            as={Link}
            display="flex"
            justifyContent="center"
            gap="10px"
            to={href}
            p="17px"
          >
            <Icon fontSize="22px">{icon}</Icon>
            {expand && title}

            <AccordionIcon mr="auto" />
          </AccordionButton>

          <Tabs as={AccordionPanel} {...styles.tabs}>
            {childLinks?.map((child, index) => {
              const { href, title, Icon: ChildIcon } = child;
              return (
                <Tab
                  as={Link}
                  to={href}
                  key={index}
                  m="0"
                  w="100%"
                  borderTop="1px"
                  borderTopColor="gray.400"
                  justifyContent="right"
                  _hover={{
                    bgColor: "gray.300",
                  }}
                  _selected={{
                    bgColor: "gray.200",
                    color: "blue.800",
                    ".icon": {},
                  }}
                  overflow="hidden"
                  gap="3"
                >
                  <MdKeyboardArrowLeft />

                  {title}
                  <ChildIcon />
                </Tab>
              );
            })}
          </Tabs>
        </AccordionItem>
      </Accordion>
    </Tab>
  ) : (
    <Tab {...styles.tab}>
      <Link
        style={{
          display: "flex",
          justifyContent: expand ? "start" : "center",
          alignItems: "center",
          gap: "10px",
          width: "100%",
          height: "100%",
          padding: "17px",
        }}
        to={href}
      >
        <Icon fontSize="22px">{icon}</Icon>
        {expand && title}
      </Link>
    </Tab>
  );
};
const styles = {
  tab: {
    _selected: {
      bgColor: "gray.300",
      borderLeft: "2px",
      borderRightColor: "blue.800",
      color: "blue.900",
    },
    w: "100%",
    mb: "14px",
    bgColor: "gray.100",
    gap: "10px",
    fontWeight: "600",
    fontSize: "md",
    alignItems: "center",
    textOverflow: "ellipsis",
    p: "0px",
    flexShrink: "0",
    dir: "rtl",
    borderRadius: "0",
  },
  tabs: {
    orientation: "vertical",
    flexDirection: "column",
    alignItems: "center",
    h: "100%",
    w: "100%",
    p: "0",
    bgColor: "gray.100",
    overflowX: "hidden",
    overflowY: "auto",
    transition: "0.3s",
    borderLeft: "2px",
    borderLeftColor: "gray.200",
    className: "scrollable",
  },
};
