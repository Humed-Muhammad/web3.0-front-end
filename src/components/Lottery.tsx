import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useDisclosure,
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
} from "../store/defaultSlice/slice/selector";
import { selectDailySendingFunds } from "../store/Daily/slice/selector";
import { ChakraModal } from "./Modal";
import { WinnersTable } from "./WinnersTable";
import Countdown, { CountdownRenderProps } from "react-countdown";

import { addMinutes } from "date-fns/esm";
interface Props {
  data: TableDataTypes[] | undefined;
  title: string;
  bettingValue: string | undefined;
  lotteryPrize: string | undefined;
  type: "daily" | "weekly" | "monthly" | undefined;
  winners: [string] | undefined;
  timeLimit: number;
  updatedAt: Date;
  isLoading: boolean;
  uuid4: string;
}

export const Lottery = ({
  data,
  title,
  bettingValue,
  lotteryPrize,
  type,
  winners,
  timeLimit,
  updatedAt,
  isLoading,
  uuid4,
}: Props) => {
  // console.log(updatedAt, isLoading);
  const gameLimit = timeLimit;
  const startTime = updatedAt && new Date(updatedAt);

  const [endTime, setEndTime] = React.useState<Date | number>(
    addMinutes(startTime, gameLimit)
  );
  React.useEffect(() => {
    if (startTime && gameLimit) {
      setEndTime(addMinutes(startTime, gameLimit));
    }
  }, [timeLimit, updatedAt]);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const dispatch = useDispatch();
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
  useEffect(() => {
    dispatch(defaultActions.checkIfWalletIsConnected());

    // console.log(ethereum);
    // ethereum.on("connect", (connectInfo: ConnectionInfo) => {
    //   console.log(connectInfo);
    //   dispatch(defaultActions.checkIfWalletIsConnected());
    // });
    // ethereum.on("disconnect", (error) => {
    //   console.log(error);
    //   dispatch(defaultActions.checkIfWalletIsConnected());
    // });
  }, []);

  // useEffect(() => {
  //   if (updatedAt) {
  //     setCurrentTime(parseInt(format(new Date(updatedAt), "T")));
  //   }
  // }, [updatedAt]);
  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: CountdownRenderProps) => {
    if (completed) {
      // Render a completed state
      return <div>Time Endined</div>;
    } else {
      // Render a countdown
      return (
        <>
          {isLoading ? (
            <div>Fetching</div>
          ) : (
            <>
              <TimeList showSeparate text="Days" time={days} />
              <p>:</p>
              <TimeList showSeparate text="Hours" time={hours} />
              <p>:</p>
              <TimeList showSeparate text="Minutes" time={minutes} />
              <p>:</p>
              <TimeList text="Seconds" time={seconds} />
            </>
          )}
        </>
      );
    }
  };
  return (
    <Box w="full">
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

            <Button
              aria-label="History"
              rightIcon={<BiHistory size={25} color="#319795" />}
              variant="ghost"
              fontWeight="normal"
              _hover={{
                shadow: "sm",
              }}
              onClick={() => {
                dispatch(defaultActions.getWinners(type));
                onOpen();
              }}
            >
              History
            </Button>
          </Flex>
          <ChakraTable data={data ? Array.from(data).reverse() : undefined} />
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
              <Text>Total players count</Text>
              <Text fontWeight="bold">{data?.length}</Text>
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
            <Countdown key={uuid4} date={endTime} renderer={renderer} />
          </Flex>
        </Flex>
      </Flex>
      <ChakraModal
        title={"Previouse Winners"}
        isOpen={isOpen}
        onClose={onClose}
        Body={<WinnersTable data={winners} />}
      />
    </Box>
  );
};

const TimeList = ({
  time,
  text,
}: {
  time: number;
  text: string;
  showSeparate?: boolean;
}) => {
  return (
    <Flex direction="column" justify="center" align="center">
      <Heading
        fontSize={["xl", "xl", "2xl", "2xl", "2xl"]}
        fontWeight="normal"
        color="gray.600"
      >
        {time}
      </Heading>
      <Text color="gray.600">{text}</Text>
    </Flex>
  );
};
