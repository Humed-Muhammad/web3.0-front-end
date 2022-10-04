import React from "react";
import {
  Alert,
  AlertIcon,
  AlertStatus,
  Box,
  Button,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { TableDataTypes } from "../utils/types";
import { ChakraTable } from "./Table";
import { BiHistory } from "react-icons/bi";
import Lottie from "react-lottie";
import lottie404 from "../assets/lottery-json.json";
import { useDispatch, useSelector } from "react-redux";

import { actions } from "../store/Daily/slice";
import { actions as defaultActions } from "../store/defaultSlice/slice";
import {
  selectConnectedAccount,
  selectConnectingWallet,
  selectMessage,
} from "../store/defaultSlice/slice/selector";
import { selectDailySendingFunds } from "../store/Daily/slice/selector";

interface Props {
  data: TableDataTypes[] | undefined;
  title: string;
  openModal?: () => void;
  bettingValue: number | undefined;
  previouseWinners: [] | undefined;
  lotteryPrize: string | undefined;
}
export const Lottery = ({
  data,
  openModal,
  title,
  bettingValue,
  lotteryPrize,
  previouseWinners,
}: Props) => {
  const dispatch = useDispatch();
  const message = useSelector(selectMessage);
  const connectedAccount = useSelector(selectConnectedAccount);
  const isSendingFunds = useSelector(selectDailySendingFunds);
  const connectingWallet = useSelector(selectConnectingWallet);

  const lottieDefaultOptions = {
    loop: true,
    autoplay: true,
    animationData: lottie404,
    renderSettings: {
      preserveAspectRation: "xMidYMid slice",
    },
  };
  return (
    <Box w="full">
      {message.content ? (
        <Alert status={message.type as AlertStatus}>
          <AlertIcon />
          There was an error processing your request
        </Alert>
      ) : null}
      <Flex
        direction={["column", "column", "column", "column", "row"]}
        justify="center"
        align="center"
        mt="10"
        w="full"
        h={["auto", "auto", "auto", "auto", "270px"]}
        experimental_spaceY="10"
      >
        <Box w={["full", "full", "full", "60%", "50%"]}>
          <Flex justify="space-between" px="5" pb="5">
            <Heading fontSize="xl" fontWeight="normal">
              {title}
            </Heading>
            <Flex
              display="flex"
              justifyContent="center"
              alignItems="center"
              onClick={openModal}
            >
              <Text fontSize="md" fontWeight="medium" color="gray.600">
                History
              </Text>
              <BiHistory size={25} color="#319795" />
            </Flex>
          </Flex>
          {data ? <ChakraTable data={data} /> : "Loding..."}
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-end"
          mx="20"
          ml="24"
          w={["full", "full", "full", "60%", "30%"]}
          h={["auto", "auto", "auto", "auto", "full"]}
        >
          <Box experimental_spaceY="12">
            <Flex experimental_spaceX="12">
              <Text>Current betting value</Text>
              <Text fontWeight="bold">{bettingValue} ETH</Text>
            </Flex>
            <Flex experimental_spaceX="12">
              <Text>Total winners count</Text>
              <Text fontWeight="bold">{previouseWinners?.length}</Text>
            </Flex>
          </Box>
          {connectedAccount ? (
            <Button
              isLoading={isSendingFunds}
              onClick={() => {
                dispatch(actions.sendFunds());
              }}
              h="9"
              py="2"
              mt="24"
              w="full"
              bg="primary"
            >
              Bet
            </Button>
          ) : (
            <Button
              isLoading={connectingWallet}
              onClick={() => {
                dispatch(defaultActions.requestWalletConnection());
              }}
              h="9"
              py="2"
              mt="24"
              w="full"
              colorScheme="blue"
            >
              Connect your wallet
            </Button>
          )}
        </Box>
        <Flex
          h={["auto", "auto", "auto", "auto", "full"]}
          w={["full", "full", "full", "50%", "30%"]}
          direction="column"
          justify="flex-end"
          align="center"
        >
          <Heading fontSize="lg">{lotteryPrize} ETH</Heading>
          <Text fontSize="md" color="gray.500">
            Lottery Prize
          </Text>
          <Lottie options={lottieDefaultOptions} width="50%" />

          <Flex experimental_spaceX="5" mt="5">
            <TimeList showSeparate text="Days" time="00" />
            <TimeList showSeparate text="Hours" time="23" />
            <TimeList showSeparate text="Minutes" time="45" />
            <TimeList text="Seconds" time="56" />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

const TimeList = ({
  time,
  text,
  showSeparate,
}: {
  time: string;
  text: string;
  showSeparate?: boolean;
}) => {
  return (
    <Box>
      <Heading
        fontSize={["xl", "xl", "2xl", "2xl", "2xl"]}
        fontWeight="normal"
        color="gray.600"
      >
        {time} {showSeparate && " :"}
      </Heading>
      <Text color="gray.600">{text}</Text>
    </Box>
  );
};
