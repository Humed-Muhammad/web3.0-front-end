import React, { useEffect } from "react";
import {
  Button,
  Box,
  Heading,
  Highlight,
  Text,
  Flex,
  Divider,
  Image,
  useToast,
} from "@chakra-ui/react";
import { bg, token } from "../assets/images";
import { SectionContainer } from "../components/core/SectionContainer";
import { fonts } from "../utils/theme";

import { ethereum } from "../utils/constants";
import {
  actions,
  actions as defaultActions,
} from "../store/defaultSlice/slice";
import { useDispatch, useSelector } from "react-redux";
import { Daily } from "../components/Daily";
import {
  selectConnectedAccount,
  selectConnectingWallet,
  selectMessage,
} from "../store/defaultSlice/slice/selector";
import { Weekly } from "../components/Weekly";
import { Monthly } from "../components/Monthly";
export const Home = () => {
  const toast = useToast();
  const connectedAccount = useSelector(selectConnectedAccount);
  const message = useSelector(selectMessage);
  const connectingWallet = useSelector(selectConnectingWallet);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(defaultActions.checkIfWalletIsConnected());

    ethereum?.on("accountsChanged", () => {
      dispatch(defaultActions.checkIfWalletIsConnected());
    });
  }, [ethereum]);
  useEffect(() => {
    if (message.content) {
      switch (message.type) {
        case "error":
          toast({
            description: message.content,
            variant: "left-accent",
            status: "error",
          });
          break;
        case "success":
          toast({
            description: message.content,
            variant: "left-accent",
            status: "success",
          });
          break;
        case "warning":
          toast({
            description: message.content,
            variant: "left-accent",
            status: "warning",
          });
          break;
        case "info":
          toast({
            description: message.content,
            variant: "left-accent",
            status: "info",
          });
          break;
      }
    }
    return () => {
      dispatch(
        actions.setMessages({
          content: "",
          type: null,
        })
      );
    };
  }, [message.content]);
  return (
    <Box h="auto" w="full" bg="white">
      <SectionContainer
        justify="center"
        direction="column"
        align="center"
        bgImage={bg}
        h={["auto", "auto", "auto", "93vh"]}
        position="relative"
        backgroundPosition="center"
        overflowX="hidden"
        py={["24"]}
        bgPosition="top"
        bgRepeat="no-repeat"
        bg="black"
      >
        <Text
          fontWeight="bold"
          color="white"
          fontFamily={fonts.MontserratAlt}
          fontSize={["xl", "3xl", "32px"]}
          position="absolute"
          top={["5", "10"]}
        >
          TOMBOLA{" "}
          <Highlight
            query={["O"]}
            styles={{
              bgGradient: "linear-gradient(to-b, #B97AED, #0157A3)",
              bgClip: "text",
              fontSize: ["3xl", "4xl"],
              fontWeight: ["medium", "inherit"],
            }}
          >
            WOT
          </Highlight>
        </Text>

        <Flex
          w={["80%", "80%", "75%", "62%"]}
          justify={["center", "center", "center", "initial"]}
          align="center"
        >
          <Flex
            align={["center", "center", "center", "flex-start"]}
            flexDirection="column"
            mt="5"
            w={["full"]}
          >
            <Heading
              fontFamily={fonts.Montserrat}
              color="white"
              as="h1"
              fontSize={["3xl", "4xl", "7xl", "96px"]}
              fontWeight="normal"
              lineHeight={["60px", "40px", "90px"]}
            >
              <Highlight
                query="Smart"
                styles={{
                  fontSize: "inherit",
                  color: "white",
                  display: ["initial", "inline", "inline", "block"],
                  fontWeight: "bold",
                }}
              >
                Smart Lottery
              </Highlight>
            </Heading>
            <Image
              ml="10"
              display={["initial", null, null, "none"]}
              src={token}
              alt="token coin"
            />
            <Text
              mt="3"
              color="white"
              fontFamily={fonts.Montserrat}
              fontWeight="normal"
              lineHeight="7"
              textAlign={["center", "left", "justify"]}
              fontSize={["sm", "md"]}
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
              <Button
                fontWeight={["normal", "bold"]}
                color="secondary"
                variant="link"
              >
                Hourly
              </Button>
              <Divider
                border="1px"
                color="white"
                orientation="vertical"
                h="35px"
              />
              <Button
                fontWeight={["normal", "bold"]}
                color="secondary"
                variant="link"
              >
                Daily
              </Button>
              <Divider
                color="white"
                orientation="vertical"
                h="35px"
                border="1px"
              />
              <Button
                fontWeight={["normal", "bold"]}
                color="secondary"
                variant="link"
              >
                Monthly
              </Button>
            </Flex>
            <Button
              isLoading={connectingWallet}
              loadingText="Connecting to wallet..."
              onClick={() => {
                if (!connectedAccount) {
                  dispatch(defaultActions.requestWalletConnection());
                }
              }}
              variant="large"
            >
              {connectedAccount ? "Connected" : "Connect your wallet"}
            </Button>
          </Flex>
          <Image
            ml="10"
            display={["none", null, null, "initial"]}
            src={token}
            alt="token coin"
            width={["48", "56", "44", "initial"]}
          />
        </Flex>
      </SectionContainer>

      <SectionContainer
        h={["auto", "auto", "auto", "100vh"]}
        py={["0", "32"]}
        justify="center"
        bg="white"
        position="relative"
      >
        <Flex
          justify="center"
          h="auto"
          w="full"
          top="-6"
          position={["initial", "initial", "absolute"]}
        >
          <Daily />
        </Flex>
      </SectionContainer>
      <SectionContainer py="32" justify="center" bg="meduimGray">
        <Weekly />
      </SectionContainer>

      <SectionContainer py="32" justify="center" bg="white">
        <Monthly />
      </SectionContainer>
    </Box>
  );
};
