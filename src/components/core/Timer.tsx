import { Flex, Heading, Text } from "@chakra-ui/react";
import { addMinutes } from "date-fns";
import React from "react";
import Countdown, { CountdownRenderProps } from "react-countdown";
import { fonts } from "../../utils/theme";

interface Props {
  timeLimit: number;
  updatedAt: Date;
  isLoading: boolean;
  uuid4: string;
}
export const Timer = ({ timeLimit, updatedAt, isLoading, uuid4 }: Props) => {
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
    <Flex experimental_spaceX="5" mt="5">
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
        fontSize={["xl", "xl", "2xl", "2xl", "24px"]}
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
