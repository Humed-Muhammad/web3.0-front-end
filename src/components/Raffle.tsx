import React from "react";
import { Box, Center, Image, Text } from "@chakra-ui/react";
import Lottie from "react-lottie";
import raffle from "../assets/lottie/lottery-json.json";
import { winningScatter } from "../assets/images";

interface Props {
  description?: string;
}
export const Raffle = ({ description }: Props) => {
  const lottieOption = {
    loop: true,
    autoplay: true,
    animationData: raffle,
    renderSettings: {
      preserveAspectRation: "xMidYMid slice",
    },
  };
  return (
    <Center w="full" flexDirection="column" position="relative">
      <Lottie width="50%" options={lottieOption} />
      <Text>{description}</Text>
      <Image
        w="full"
        position="absolute"
        src={winningScatter}
        alt="winning scatterd"
      />
    </Center>
  );
};
