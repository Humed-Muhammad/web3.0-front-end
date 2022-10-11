import {
  Box,
  Button,
  Divider,
  Flex,
  ListItem,
  Skeleton,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import React from "react";
import { DetailCardProps } from "../utils/types";
import { BetComponent } from "./BetComponent";
import { ChakraTable } from "./core/Table";

export const DetailCard = (props: DetailCardProps) => {
  return (
    <Box
      position="relative"
      px={["2", "2", "3", "20"]}
      bg="white"
      shadow="md"
      w={["full", "full", "full", "7xl"]}
      h={["auto", "auto", "auto", "3xl"]}
      rounded="md"
    >
      <Flex
        top="-12"
        left={["", "5", "5", "-2", "-4", "-10"]}
        position={["initial", "initial", "initial", "absolute"]}
        justify="center"
      >
        <BetComponent {...props} />
      </Flex>
      <Flex
        experimental_spaceY={["2", "2", "2", "16"]}
        h={["auto", "auto", "auto", "full"]}
        justify={["center", "center", "center", "space-around"]}
        align={["center", "center", "center", "flex-end"]}
        direction="column"
        pt="16"
        ml={["initial", "initial", "initial", "5"]}
      >
        <UnorderedList
          experimental_spaceY="2"
          w={["95%", "95%", "95%", "60%"]}
          listStyleType="none"
          mx="0"
        >
          <Divider w="full" borderColor="gray.400" />
          <ListItem display="flex" justifyContent="space-between">
            <Text>Round Number</Text>
            <Skeleton isLoaded={!props.isFetchingData}>
              <Button variant="small">{props.roundNumber}</Button>
            </Skeleton>
          </ListItem>
          <Divider w="full" borderColor="gray.400" />
          <ListItem display="flex" justifyContent="space-between">
            <Text>Initial Pot</Text>
            <Skeleton isLoaded={!props.isFetchingData}>
              <Button variant="small">{props.initialPotValue} ETH</Button>
            </Skeleton>
          </ListItem>
          <Divider w="full" borderColor="gray.400" />
          <ListItem display="flex" justifyContent="space-between">
            <Text>Next Round initial pot</Text>
            <Skeleton isLoaded={!props.isFetchingData}>
              <Button variant="small">0.7 ETH</Button>
            </Skeleton>
          </ListItem>
          <Divider w="full" borderColor="gray.400" />
          <ListItem display="flex" justifyContent="space-between">
            <Text>Participants</Text>
            <Skeleton isLoaded={!props.isFetchingData}>
              <Button variant="small">{props.participants}</Button>
            </Skeleton>
          </ListItem>
          <Divider w="full" borderColor="gray.400" />
        </UnorderedList>
        <Flex
          direction={["column", "column", "column", "row"]}
          justify="space-around"
          w="full"
          align={["center", "center", "center", "initial"]}
        >
          <UnorderedList
            w={["auto", "auto", "auto", "35%"]}
            mt="36"
            experimental_spaceY="3"
          >
            <Text fontWeight="semibold">Playing rules</Text>
            <ListItem>
              <Text>
                20 % of this round will be placed as initial value for next
                round
              </Text>
            </ListItem>
            <ListItem>
              <Text>The Hourly will be drown each 1 hour</Text>
            </ListItem>
          </UnorderedList>
          <ChakraTable
            border="none"
            w={["95%", "95%", "95%", "60%"]}
            data={props.players}
          />
        </Flex>
      </Flex>
    </Box>
  );
};
