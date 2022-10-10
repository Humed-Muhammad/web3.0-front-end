import {
  Box,
  Button,
  Divider,
  Flex,
  ListItem,
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
      px="20"
      bg="white"
      shadow="md"
      w="7xl"
      h="3xl"
      rounded="md"
    >
      <Box top="-12" left="-10" position="absolute">
        <BetComponent {...props} />
      </Box>
      <Flex
        experimental_spaceY="16"
        h="full"
        justify="space-around"
        align="flex-end"
        direction="column"
        pt="16"
      >
        <UnorderedList
          experimental_spaceY="2"
          w="60%"
          listStyleType="none"
          mx="0"
        >
          <Divider w="full" borderColor="gray.400" />
          <ListItem display="flex" justifyContent="space-between">
            <Text>Round Number</Text>
            <Button variant="small">01</Button>
          </ListItem>
          <Divider w="full" borderColor="gray.400" />
          <ListItem display="flex" justifyContent="space-between">
            <Text>Initial Pot</Text>
            <Button variant="small">0.9 ETH</Button>
          </ListItem>
          <Divider w="full" borderColor="gray.400" />
          <ListItem display="flex" justifyContent="space-between">
            <Text>Next Round initial pot</Text>
            <Button variant="small">0.7 ETH</Button>
          </ListItem>
          <Divider w="full" borderColor="gray.400" />
          <ListItem display="flex" justifyContent="space-between">
            <Text>Participants</Text>
            <Button variant="small">42</Button>
          </ListItem>
          <Divider w="full" borderColor="gray.400" />
        </UnorderedList>
        <Flex justify="space-around" w="full">
          <UnorderedList w="35%" mt="36" experimental_spaceY="3">
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
            w="60%"
            data={[
              { address: "9489374897389473897489374897" },
              { address: "9489374897389473897489374897" },
              { address: "9489374897389473897489374897" },
              { address: "9489374897389473897489374897" },
            ]}
          />
        </Flex>
      </Flex>
    </Box>
  );
};
