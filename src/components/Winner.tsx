import { Box, Button, Center, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import { scatterdBg } from "../assets/images";
import { fonts } from "../utils/theme";

interface Props {
  winnerAddress: string | undefined;
}
export const Winner = ({ winnerAddress }: Props) => {
  return (
    <Center position="relative" mb="6" justifyContent="space-between">
      <Box zIndex="10">
        <Heading
          bgClip="text"
          bgGradient="linear(to-r, #BE4DFA, #33D1FA);"
          fontWeight="extrabold"
          fontSize={["24px"]}
          fontFamily={fonts.Montserrat}
        >
          Winner
        </Heading>
        <Text fontWeight="medium">{winnerAddress}</Text>
      </Box>
      <Button
        px="8"
        zIndex="10"
        shadow="lg"
        color="white"
        colorScheme="facebook"
        bg="#14113D"
      >
        Link
      </Button>
      <Image
        objectFit="contain"
        position="absolute"
        src={scatterdBg}
        alt="scatterd confetti"
      />
    </Center>
  );
};
