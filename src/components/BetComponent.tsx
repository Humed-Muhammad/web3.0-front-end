import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import React from "react";
import { LOTTERY_TYPE2 } from "../utils/constants";
import { fonts } from "../utils/theme";
import { Timer } from "./core/Timer";
import { v4 as uuid4 } from "uuid";
import { DetailCardProps } from "../utils/types";

export const BetComponent = ({
  currentBettingValue,
  totalAmount,
  type,
  winingPrize,
  isFetchingData,
  isSendingFunds,
  sendFund,
}: DetailCardProps) => {
  return (
    <Box
      px="50px"
      pt="45px"
      position="relative"
      w="410px"
      h="499px"
      bg="lightGray"
      shadow="md"
      rounded="md"
    >
      <Text
        position="absolute"
        w="20"
        color="white"
        bg="primary"
        h="89px"
        px="1"
        right="45px"
        top="0"
        fontFamily={fonts.Jost}
        fontWeight="bold"
        roundedBottom="base"
      >
        <Center h="full">{currentBettingValue}</Center>
      </Text>

      <Text
        fontSize="32px"
        fontWeight="medium"
        fontFamily={fonts.Montserrat}
        as="h2"
      >
        {type}
      </Text>

      <UnorderedList
        mx="0"
        my="10"
        experimental_spaceY="3"
        listStyleType="none"
      >
        <ListItem display="flex" justifyContent="space-between">
          <Text>Total Amount</Text>
          <Text
            px="4"
            w="24"
            textAlign="center"
            py="0.5"
            fontWeight="normal"
            fontFamily={fonts.Jost}
            rounded="md"
            bg="white"
          >
            {totalAmount}
          </Text>
        </ListItem>
        <ListItem display="flex" justifyContent="space-between">
          <Text>Wining Prize</Text>
          <Text
            px="4"
            w="24"
            textAlign="center"
            py="0.5"
            fontWeight="normal"
            fontFamily={fonts.Jost}
            rounded="md"
            bg="white"
          >
            4 ETH
          </Text>
        </ListItem>
        <ListItem display="flex" justifyContent="space-between">
          <Text>Current Betting Value</Text>
          <Text
            px="4"
            w="24"
            textAlign="center"
            py="0.5"
            fontWeight="normal"
            fontFamily={fonts.Jost}
            rounded="md"
            bg="white"
          >
            {currentBettingValue}
          </Text>
        </ListItem>
      </UnorderedList>
      <Center my="12">
        <Timer
          isLoading={false}
          timeLimit={60}
          updatedAt={new Date()}
          uuid4={uuid4()}
        />
      </Center>
      <Center>
        <Button variant="primary">Bet</Button>
      </Center>
    </Box>
  );
};
