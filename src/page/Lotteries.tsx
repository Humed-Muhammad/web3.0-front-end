import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";

export const Lotteries = () => {
  const lotteries = [
    {
      icon: "https://cdn-icons-png.flaticon.com/512/3803/3803388.png",
      title: "Hourly",
      desc: "An event that will be renewed every 1hr",
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/5166/5166987.png",
      title: "Daily",
      desc: "An event that will be renewed every 24hr",
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/2413/2413649.png",
      title: "Monthly",
      desc: "An event that will be renewed every 24hr",
    },
  ];
  return (
    <Flex direction="column" justify="center" align="center" w="full" h="100vh">
      <Heading bgClip="text" bgGradient="linear(to-l, white, cyan.200)" my="10">
        Lotteries
      </Heading>
      <Flex>
        {lotteries.map((item) => (
          <Flex
            direction="column"
            justify="center"
            h="52"
            w="64"
            p={5}
            shadow="md"
            borderWidth="1px"
            cursor="pointer"
            transition={"all .5s ease-in-out"}
            _hover={{
              bgGradient: "linear(to-l, green.200, white)",
            }}
            bgGradient="linear(to-l, whiteAlpha.800, white)"
            m={2}
            rounded="sm"
          >
            <Image mb="2" width="12" height="12" src={item.icon} />
            <Heading color="gray.500" fontSize="xl">
              {item.title}
            </Heading>
            <Text mt={4}>{item.desc}</Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};
