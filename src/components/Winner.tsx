import {
  Box,
  Button,
  Center,
  Heading,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { scatterdBg } from "../assets/images";
import { fonts } from "../utils/theme";

interface Props {
  winnerAddress: string | undefined;
}
export const Winner = ({ winnerAddress }: Props) => {
  return (
    <Center
      overflow="hidden"
      w="100%"
      position="relative"
      mb="6"
      justifyContent="space-between"
    >
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
        <Text
          variant="truncated"
          w="60%"
          lineHeight="10"
          fontFamily={fonts.Montserrat}
          fontWeight="medium"
        >
          {winnerAddress}
        </Text>
      </Box>
      <Button
        px="8"
        zIndex="10"
        shadow="lg"
        color="white"
        colorScheme="facebook"
        bg="#14113D"
      >
        <Link
          href={`https://goerli.etherscan.io/address/${winnerAddress}`}
          target="_blank"
          color="inherit"
        >
          Link
        </Link>
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
