import React, { useEffect } from "react";
import { Flex, Heading } from "@chakra-ui/react";

import { Lottery } from "../components/Lottery";
import { useDispatch, useSelector } from "react-redux";

import { actions as defaultActions } from "../store/defaultSlice/slice";
import { selectDefaultLotteryDatas } from "../store/defaultSlice/slice/selector";
import { Contract, ethers, Signer } from "ethers";
import { contarctABI, contractAddress } from "../utils";
interface EtherWindow extends Window {
  ethereum?: any;
}
export const Home = () => {
  const dispatch = useDispatch();
  const defaultLotteryDatas = useSelector(selectDefaultLotteryDatas);
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(defaultActions.checkIfWalletIsConnected());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    dispatch(defaultActions.requestContarct());
    dispatch(defaultActions.getDefaultData());

    const { ethereum }: EtherWindow = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer: Signer = provider.getSigner();
    const dailyContract = new ethers.Contract(
      contractAddress,
      contarctABI,
      signer
    );
    dailyContract.filters;
    dailyContract.on("LogPLayers", (player) => {
      console.log(player);
      dispatch(defaultActions.getDefaultData());
    });
  }, []);

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
      <Lottery
        bettingValue={defaultLotteryDatas?.daily?.currentBettingValue}
        lotteryPrize={defaultLotteryDatas?.daily?.lotteryPrize}
        previouseWinners={[]}
        data={defaultLotteryDatas?.daily?.players}
        title="Daily slot"
      />
    </Flex>
  );
};
