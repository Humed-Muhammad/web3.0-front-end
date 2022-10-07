import React from "react";
import {
  Button,
  Box,
  Heading,
  Highlight,
  Text,
  Flex,
  Divider,
} from "@chakra-ui/react";
import { bg } from "../assets/images";
import { SectionContainer } from "../components/core/SectionContainer";
import { fonts } from "../utils/theme";

export const Home = () => {
  return (
    <Box h="auto" w="full" bg="white">
      <SectionContainer
        justify="center"
        direction="column"
        align="center"
        bgImage={bg}
        h="94vh"
        position="relative"
      >
        <Text
          fontWeight="bold"
          color="white"
          fontFamily={fonts.MontserratAlt}
          fontSize="4xl"
          position="absolute"
          top="10"
        >
          TOMBOLA{" "}
          <Highlight
            query={["O"]}
            styles={{
              bgGradient: "linear-gradient(to-b, #B97AED, #0157A3)",
              bgClip: "text",
              fontSize: "42px",
              // fontWeight: "bol",
            }}
          >
            WOT
          </Highlight>
        </Text>

        <Flex w="60%" align="center">
          <Box mt="5" w={["96"]}>
            <Heading
              fontFamily={fonts.Montserrat}
              color="white"
              as="h1"
              fontSize="96px"
              fontWeight="normal"
              lineHeight="90px"
            >
              <Highlight
                query="Smart"
                styles={{
                  fontSize: "96px",
                  color: "white",
                  display: "block",
                  fontWeight: "bold",
                }}
              >
                Smart Lottery
              </Highlight>
            </Heading>
            <Text
              mt="3"
              color="white"
              fontFamily={fonts.Montserrat}
              fontWeight="medium"
              lineHeight="7"
              textAlign="justify"
            >
              <Highlight
                query={["blockchain", "cryptocurrecy", "equal chance"]}
                styles={{
                  fontWeight: "bold",
                  color: "inherit",
                  fontFamily: "inherit",
                }}
              >
                Based on blockchain technology that uses cryptocurrecy,
                specially designed to create fun and equal chance to win a prize
              </Highlight>
            </Text>
            <Flex mb="10" mt="6" experimental_spaceX="5">
              <Button fontWeight="bold" color="secondary" variant="link">
                Hourly
              </Button>
              <Divider
                border="1px"
                color="white"
                orientation="vertical"
                h="35px"
              />
              <Button fontWeight="bold" color="secondary" variant="link">
                Daily
              </Button>
              <Divider
                color="white"
                orientation="vertical"
                h="35px"
                border="1px"
              />
              <Button fontWeight="bold" color="secondary" variant="link">
                Monthly
              </Button>
            </Flex>
            <Button variant="large">Connect your wallet</Button>
          </Box>
        </Flex>
      </SectionContainer>
    </Box>
  );
};
