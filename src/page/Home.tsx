import React, { useEffect } from "react";
import { Flex, Heading } from "@chakra-ui/react";
// import { LotteryContext } from "../context/LotteryContext";
import { Lottery } from "../components/Lottery";
import { TableDataTypes } from "../utils/types";
import { useDispatch } from "react-redux";
import { actions } from "../store/slice";

export const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(actions.checkIfWalletIsConnected());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    dispatch(actions.requestContarct());
    dispatch(actions.requestPlayers());
  }, []);

  const data: TableDataTypes[] = [
    {
      address: "537825378278dgwe78t2786e7826",
      timestamp: "12/34/4",
    },
    {
      address: "537825378278dgwe78t2786e7826",
      timestamp: "12/34/4",
    },
    {
      address: "537825378278dgwe78t2786e7826",
      timestamp: "12/34/4",
    },
    {
      address: "537825378278dgwe78t2786e7826",
      timestamp: "12/34/4",
    },
    {
      address: "537825378278dgwe78t2786e7826",
      timestamp: "12/34/4",
    },
  ];
  return (
    <Flex
      py="10"
      px="5"
      alignItems="center"
      width="full"
      flexGrow={1}
      direction="column"
      h="auto"
    >
      <Heading color="gray.600" mb="10">
        Lottery
      </Heading>
      <Lottery data={data} title="Daily slot" />
    </Flex>
  );
};
