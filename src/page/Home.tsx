import React, { useContext } from "react";
import { Box, Button, Flex, Heading, Highlight, Text } from "@chakra-ui/react";
import { LotteryContext } from "../context/LotteryContext";

export const Home = () => {
  const { connectWallet, connectedAccount, isLoading, sendFunds } =
    useContext(LotteryContext);
  return (
    <Flex justify="space-around" alignItems="center" width="full" flexGrow={1}>
      <Box>
        <Heading width="auto" color="white">
          <Highlight
            query="High Yields"
            styles={{
              px: "2",
              py: "1",
              rounded: "xl",
              bg: "blue.300",
              color: "white",
            }}
          >
            Deposite and, Get High Yields
          </Highlight>
        </Heading>
        <Text
          fontSize="lg"
          fontWeight="semibold"
          color="white"
          mt="5"
          mb="12"
          w="60%"
        >
          <Highlight
            query={["Dapp", "Etherium network"]}
            styles={{
              px: "2",
              py: "1",
              rounded: "xl",
              bg: "green.200",
              color: "gray.700",
            }}
          >
            A new era of lottery Dapp, using blockchain technologies, On the
            Etherium network, transparent, confidential, and secure lottery
          </Highlight>
        </Text>
        {connectedAccount ? (
          <Button
            onClick={sendFunds}
            _hover={{
              bg: "green.300",
            }}
            color="white"
            bg="green.400"
          >
            Deposite
          </Button>
        ) : (
          <Button
            onClick={connectWallet}
            _hover={{
              bg: "blue.300",
            }}
            color="white"
            bg="blue.400"
          >
            Connect your wallet
          </Button>
        )}
      </Box>
    </Flex>
  );
};
