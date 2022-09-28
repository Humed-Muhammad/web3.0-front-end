import React from "react";
import {
  Image,
  Flex,
  List,
  ListItem,
  Link,
  Container,
  Text,
  Highlight,
  Heading,
} from "@chakra-ui/react";
import reactLogo from "../assets/react.svg";
import { NavLink } from "react-router-dom";
export const Navbar = () => {
  return (
    <nav style={{ width: "100%", height: "60px" }}>
      <Flex
        justify="space-between"
        px="10"
        width="full"
        height="full"
        align="center"
      >
        <NavLink to="/">
          <Flex justify="center" align="center" experimental_spaceX="5">
            <Image
              w="10"
              src="https://cdn-icons-png.flaticon.com/128/6826/6826311.png"
            />
            <Heading fontSize="3xl" color="white" lineHeight="tall">
              Botus
            </Heading>
          </Flex>
        </NavLink>
        <List
          display="flex"
          justifyContent="space-around"
          experimental_spaceX="10"
          color="white"
          as="ul"
        >
          <NavLink to="/lotteries">
            <ListItem
              color="white"
              _hover={{
                color: "green.500",
              }}
              cursor="pointer"
              as="li"
            >
              Lotteries
            </ListItem>
          </NavLink>
        </List>
      </Flex>
    </nav>
  );
};
