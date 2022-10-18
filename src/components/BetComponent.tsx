import {
  Box,
  Button,
  Center,
  Heading,
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
import { calculatePriceCuts, formatEther } from "../utils/helpers";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";
import { TooltipHolder } from "./core/Tooltip";
import { Raffle } from "./Raffle";
import Lottie from "react-lottie";
import confetti from "../assets/lottie/confetti.json";

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
  isWinnerPicked,
  amountWinned,
  isMining,
  players,
}: DetailCardProps) => {
  const lottieOption = {
    loop: true,
    autoplay: true,
    animationData: confetti,
    renderSettings: {
      preserveAspectRation: "xMidYMid slice",
    },
  };
  return (
    <Box
      px={["2", "50px"]}
      pt="45px"
      pb="35px"
      position="relative"
      w={["99%", "95%", "70%", "410px"]}
      h={["auto"]}
      bg="lightGray"
      shadow="md"
      rounded="md"
    >
      <Center
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
        <TooltipHolder label={`${currentBettingValue} ETH`}>
          <Text
            variant="truncated"
            color="white"
            fontFamily={fonts.Jost}
            fontWeight="bold"
          >
            {currentBettingValue}
          </Text>
        </TooltipHolder>
      </Center>

      <Text
        fontSize={["lg", "xl", "2xl", "32px"]}
        fontWeight="medium"
        fontFamily={fonts.Montserrat}
        as="h2"
      >
        {type}
      </Text>

      {isWinnerPicked ? (
        <>
          <Box position="absolute" top="-60" left="-52">
            <Lottie options={lottieOption} />
          </Box>
          <Box mt="20">
            <Raffle />
          </Box>
        </>
      ) : (
        <UnorderedList
          mx="0"
          my="10"
          experimental_spaceY="3"
          listStyleType="none"
        >
          <ListItem display="flex" justifyContent="space-between">
            <Text>Total Amount</Text>
            <Skeleton isLoaded={Boolean(totalAmount)}>
              <TooltipHolder label={`${totalAmount} ETH`}>
                <Text
                  px="4"
                  w="24"
                  textAlign="center"
                  py="0.5"
                  fontWeight="normal"
                  fontFamily={fonts.Jost}
                  rounded="md"
                  bg="white"
                  variant="truncated"
                >
                  {totalAmount}
                </Text>
              </TooltipHolder>
            </Skeleton>
          </ListItem>
          <ListItem display="flex" justifyContent="space-between">
            <Center experimental_spaceX="1">
              <Text>Wining Prize</Text>
              <TooltipHolder label="The winning prize without gas fee!">
                <Box>
                  {" "}
                  <HiOutlineQuestionMarkCircle cursor="pointer" />
                </Box>
              </TooltipHolder>
            </Center>
            <Skeleton isLoaded={Boolean(totalAmount)}>
              <TooltipHolder
                label={`${calculatePriceCuts(totalAmount, priceCut)} ETH`}
              >
                <Text
                  px="4"
                  w="24"
                  textAlign="center"
                  py="0.5"
                  fontWeight="normal"
                  fontFamily={fonts.Jost}
                  rounded="md"
                  bg="white"
                  variant="truncated"
                >
                  {calculatePriceCuts(totalAmount, priceCut)}
                </Text>
              </TooltipHolder>
            </Skeleton>
          </ListItem>
          <ListItem display="flex" justifyContent="space-between">
            <Text>Current Betting Value</Text>
            <Skeleton isLoaded={Boolean(currentBettingValue)}>
              <TooltipHolder label={`${currentBettingValue} ETH`}>
                <Text
                  px="4"
                  w="24"
                  textAlign="center"
                  py="0.5"
                  fontWeight="normal"
                  fontFamily={fonts.Jost}
                  rounded="md"
                  bg="white"
                  variant="truncated"
                >
                  {currentBettingValue}
                </Text>
              </TooltipHolder>
            </Skeleton>
          </ListItem>
        </UnorderedList>
      )}

      <Center my={isWinnerPicked ? "5" : "12"}>
        <Timer
          isLoading={isFetchingData}
          timeLimit={timeLimit}
          updatedAt={updatedAt}
          uuid4={uuid4()}
          addingFunction={addingFunction}
          players={players}
          currentBettingValue={currentBettingValue}
        />
      </Center>
      <Center>
        {isWinnerPicked ? (
          <Heading
            fontFamily={fonts.Montserrat}
            fontWeight="semibold"
            fontSize={["20px"]}
            textAlign="center"
            lineHeight="8"
          >
            Winner prize
            <Text
              bgClip="text"
              bgGradient="linear-gradient(180deg, #BE4DFA 16%, #33D1FA 90%)"
              display="block"
              fontWeight="extrabold"
              fontSize={["24px"]}
            >
              {formatEther(amountWinned)} ETH
            </Text>
          </Heading>
        ) : (
          <Button
            isLoading={isSendingFunds ? isSendingFunds : isMining}
            loadingText={isMining ? "Mining..." : "Sending..."}
            onClick={sendFund}
            variant="primary"
            colorScheme="primary"
            _hover={{
              colorScheme: "primary",
            }}
          >
            Bet
          </Button>
        )}
      </Center>
    </Box>
  );
};
