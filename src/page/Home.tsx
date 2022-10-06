import React, { useEffect } from "react";
import { Alert, AlertIcon, AlertStatus, Flex, Heading } from "@chakra-ui/react";

import { Lottery } from "../components/Lottery";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid4 } from "uuid";
import { actions as defaultActions } from "../store/defaultSlice/slice";
import {
  selectAllDefaultLottery,
  selectContracts,
  selectLotteryDatas,
  selectMessage,
} from "../store/defaultSlice/slice/selector";
import { ethereum } from "../utils/constants";

export const Home = () => {
  const dispatch = useDispatch();
  const defaultLotteryDatas = useSelector(selectLotteryDatas);
  const { dailyContract } = useSelector(selectContracts);
  const { fetchingDatas } = useSelector(selectAllDefaultLottery);

  const message = useSelector(selectMessage);

  useEffect(() => {
    dispatch(defaultActions.checkIfWalletIsConnected());

    ethereum.on("accountsChanged", () => {
      dispatch(defaultActions.checkIfWalletIsConnected());
    });
  }, [ethereum]);
  useEffect(() => {
    dailyContract?.on("LogPlayers", () => {
      dispatch(defaultActions.updateDailyLottery());
    });
    dailyContract?.on("LogWinner", (player: string) => {
      console.log(`Winner is picked ${player}`);

      dispatch(defaultActions.updateTime("daily"));
      dispatch(defaultActions.updateDailyLottery());
      dispatch(
        defaultActions.setMessages({
          content: `Daily winner is picked ${player}`,
          type: "success",
        })
      );
    });
  }, [dailyContract]);

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
      {message.content ? (
        <Alert h="20" status={message.type as AlertStatus}>
          <AlertIcon />
          {message.content}
        </Alert>
      ) : null}
      <Lottery
        bettingValue={defaultLotteryDatas?.daily?.currentBettingValue}
        lotteryPrize={defaultLotteryDatas?.daily?.lotteryPrize}
        type="daily"
        // type={defaultLotteryDatas?.daily?.type}
        data={defaultLotteryDatas?.daily?.players}
        title="Daily slot"
        winners={defaultLotteryDatas.daily?.winners}
        timeLimit={60}
        updatedAt={defaultLotteryDatas.daily?.updatedAt as Date}
        isLoading={fetchingDatas}
        uuid4={uuid4()}
      />
    </Flex>
  );
};
