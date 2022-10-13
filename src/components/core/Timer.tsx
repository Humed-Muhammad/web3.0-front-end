import { Center, Flex, Heading, Skeleton, Text } from "@chakra-ui/react";

import React from "react";
import Countdown, { CountdownRenderProps } from "react-countdown";
import { useSelector } from "react-redux";
import { selectIfWalletIsConnected } from "../../store/defaultSlice/slice/selector";
import { fonts } from "../../utils/theme";

interface Props {
  timeLimit: number;
  updatedAt: Date | undefined;
  isLoading: boolean;
  uuid4: string;
  addingFunction: (startTime: Date, timeLimit: number) => Date;
}
export const Timer = ({
  timeLimit,
  updatedAt,
  isLoading,
  uuid4,
  addingFunction,
}: Props) => {
  // const gameLimit = timeLimit;
  const startTime = (updatedAt && new Date(updatedAt)) as Date;
  const isWalletConnected = useSelector(selectIfWalletIsConnected);
  const [endTime, setEndTime] = React.useState<Date | number>(
    addingFunction(startTime, timeLimit)
  );
  React.useEffect(() => {
    if (startTime && timeLimit) {
      setEndTime(addingFunction(startTime, timeLimit));
    }
  }, [timeLimit, updatedAt]);
  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: CountdownRenderProps) => {
    if (completed) {
      // Render a completed state
      return <Text fontWeight="semibold">Time Endined</Text>;
    } else {
      // Render a countdown
      return (
        <>
          <Skeleton w="12" isLoaded={!isLoading && isWalletConnected}>
            <TimeList showSeparate text="Days" time={days} />
          </Skeleton>
          <Center>
            <p>:</p>
          </Center>
          <Skeleton w="12" isLoaded={!isLoading && isWalletConnected}>
            <TimeList showSeparate text="Hours" time={hours} />
          </Skeleton>
          <Center>
            <p>:</p>
          </Center>
          <Skeleton w="12" isLoaded={!isLoading && isWalletConnected}>
            <TimeList showSeparate text="Minutes" time={minutes} />
          </Skeleton>
          <Center>
            <p>:</p>
          </Center>
          <Skeleton w="12" isLoaded={!isLoading && isWalletConnected}>
            <TimeList text="Seconds" time={seconds} />
          </Skeleton>
        </>
      );
    }
  };
  return (
    <Flex experimental_spaceX={["3", "5"]} mt="5">
      <Countdown key={uuid4} date={endTime} renderer={renderer} />
    </Flex>
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
        fontSize={["lg", "xl", "2xl", "2xl", "24px"]}
        fontWeight="normal"
        color="gray.600"
        fontFamily={fonts.Digital}
      >
        {time}
      </Heading>
      <Text fontSize="xx-small" fontFamily={fonts.Digital} color="#B8C0C7">
        {text}
      </Text>
    </Flex>
  );
};
