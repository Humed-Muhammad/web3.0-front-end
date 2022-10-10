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
  Center,
} from "@chakra-ui/react";
import { bg, token } from "../assets/images";
import { SectionContainer } from "../components/core/SectionContainer";
import { fonts } from "../utils/theme";

import { ethereum } from "../utils/constants";
import { actions as defaultActions } from "../store/defaultSlice/slice";
import { useDispatch, useSelector } from "react-redux";
import { Hourly } from "../components/Hourly";
import {
  selectConnectedAccount,
  selectConnectingWallet,
} from "../store/defaultSlice/slice/selector";
import { id } from "date-fns/locale";
export const Home = () => {
  const connectedAccount = useSelector(selectConnectedAccount);
  // const isSendingFunds = useSelector(selectDailySendingFunds);
  const connectingWallet = useSelector(selectConnectingWallet);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(defaultActions.checkIfWalletIsConnected());

    ethereum.on("accountsChanged", () => {
      dispatch(defaultActions.checkIfWalletIsConnected());
      dispatch(defaultActions.getDefaultData());
    });
  }, [ethereum]);
  return (
    <Box h="auto" w="full" bg="white">
      <SectionContainer
        justify="center"
        direction="column"
        align="center"
        bgImage={bg}
        h="93vh"
        position="relative"
        backgroundPosition="center"
        overflowX="hidden"
      >
        <Text
          fontWeight="bold"
          color="white"
          fontFamily={fonts.MontserratAlt}
          fontSize="32px"
          position="absolute"
          top="10"
        >
          TOMBOLA{" "}
          <Highlight
            query={["O"]}
            styles={{
              bgGradient: "linear-gradient(to-b, #B97AED, #0157A3)",
              bgClip: "text",
              fontSize: "4xl",
            }}
          >
            WOT
          </Highlight>
        </Text>

        <Flex w="62%" align="center">
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
              fontWeight="normal"
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
            <Button
              onClick={() => {
                if (!connectedAccount) {
                  dispatch(defaultActions.requestWalletConnection());
                }
              }}
              variant="large"
            >
              {connectedAccount ? "Connected" : "Connect your wallet"}
            </Button>
          </Box>
          <Image
            ml="10"
            display={["none", null, null, "initial"]}
            src={token}
            alt="token coin"
          />
        </Flex>
      </SectionContainer>

      <Center h="94vh" position="relative">
        <Box top="-6" position="absolute">
          <Hourly />
        </Box>
      </Center>
      <SectionContainer py="32" justify="center" bg="meduimGray">
        <Hourly />
      </SectionContainer>
    </Box>
  );
};
