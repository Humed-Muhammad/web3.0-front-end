import {
  Box,
  Button,
  Center,
  IconButton,
  ListItem,
  Skeleton,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import React from "react";
import { fonts } from "../utils/theme";
import { Timer } from "./core/Timer";
import { v4 as uuid4 } from "uuid";
import { DetailCardProps } from "../utils/types";
import { calculatePriceCuts } from "../utils/helpers";
import { BsPatchQuestion } from "react-icons/bs";
export const BetComponent = ({
  currentBettingValue,
  totalAmount,
  type,
  isFetchingData,
  isSendingFunds,
  sendFund,
  updatedAt,
  addingFunction,
  timeLimit,
  priceCut,
}: DetailCardProps) => {
  return (
    <Box
      px={["2", "50px"]}
      pt="45px"
      position="relative"
      w={["99%", "95%", "70%", "410px"]}
      h={["499px"]}
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
        fontSize={["lg", "xl", "2xl", "32px"]}
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
          <Skeleton isLoaded={!isFetchingData}>
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
          </Skeleton>
        </ListItem>
        <ListItem display="flex" justifyContent="space-between">
          <Text>
            <Center>
              Wining Prize
              <BsPatchQuestion cursor="pointer" />
            </Center>
          </Text>
          <Skeleton isLoaded={!isFetchingData}>
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
              {calculatePriceCuts(totalAmount, priceCut)}
            </Text>
          </Skeleton>
        </ListItem>
        <ListItem display="flex" justifyContent="space-between">
          <Text>Current Betting Value</Text>
          <Skeleton isLoaded={!isFetchingData}>
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
          </Skeleton>
        </ListItem>
      </UnorderedList>
      <Center my="12">
        <Timer
          isLoading={isFetchingData}
          timeLimit={timeLimit}
          updatedAt={updatedAt}
          uuid4={uuid4()}
          addingFunction={addingFunction}
        />
      </Center>
      <Center>
        <Button onClick={sendFund} variant="primary">
          Bet
        </Button>
      </Center>
    </Box>
  );
};
