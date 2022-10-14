import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  selectAllDefaultLottery,
  selectContract,
  selectLotteryDatas,
} from "../store/defaultSlice/slice/selector";
import { LOTTERY_TYPE, LOTTERY_TYPE_TITLE } from "../utils/constants";
import { DetailCard } from "./DetailCard";
import { actions as defaultActions } from "../store/defaultSlice/slice";
import { actions as dailyActions } from "../store/Daily/slice";
import {
  selectDailySendingFunds,
  selectIfDailyLotteryWinnerIsSelected,
  selectIsDailyMining,
} from "../store/Daily/slice/selector";
import { addMinutes } from "date-fns";
import { BigNumber } from "ethers";

export const Daily = () => {
  const [winnerData, setWinnerData] = useState<{
    amount: BigNumber | undefined;
    address: string;
  }>({
    address: "",
    amount: undefined,
  });
  const dispatch = useDispatch();
  const { daily } = useSelector(selectLotteryDatas);
  const isSendingFunds = useSelector(selectDailySendingFunds);
  const isMining = useSelector(selectIsDailyMining);
  const isDailyWinnerPicked = useSelector(selectIfDailyLotteryWinnerIsSelected);
  const contract = useSelector((state: RootState) =>
    selectContract(state, LOTTERY_TYPE.daily)
  );
  const { fetchingDatas } = useSelector(selectAllDefaultLottery);

  useEffect(() => {
    let timeOut: number;
    contract?.on("LogPlayers", () => {
      dispatch(defaultActions.updateSingleLottery(LOTTERY_TYPE.daily));
    });
    contract?.on("LogResetTimer", () => {
      dispatch(defaultActions.updateSingleLottery(LOTTERY_TYPE.daily));
    });
    contract?.on("LogWinner", (player: string, amountWinned: BigNumber) => {
      setWinnerData({
        address: player,
        amount: amountWinned,
      });
      dispatch(dailyActions.setIsDailyLotteryWinnerPicked(true));
      dispatch(defaultActions.updateTime("daily"));
      dispatch(defaultActions.updateSingleLottery(LOTTERY_TYPE.daily));
      dispatch(
        defaultActions.setMessages({
          content: `Daily winner is picked ${player}`,
          type: "success",
        })
      );
      timeOut = setTimeout(() => {
        dispatch(dailyActions.setIsDailyLotteryWinnerPicked(false));
        dispatch(
          defaultActions.setMessages({
            content: "",
            type: null,
          })
        );
        setWinnerData({
          address: "",
          amount: undefined,
        });
      }, 10000);
    });
    return () => {
      clearTimeout(timeOut);
    };
  }, [contract]);
  return (
    <DetailCard
      w={["6xl", "7xl"]}
      mx="3"
      currentBettingValue={daily?.currentBettingValue}
      totalAmount={daily?.lotteryPrize}
      type={LOTTERY_TYPE_TITLE.Hourly}
      winingPrize={daily?.lotteryPrize}
      sendFund={() => dispatch(dailyActions.sendDailyFunds())}
      isSendingFunds={isSendingFunds}
      isFetchingData={fetchingDatas}
      initialPotValue={daily?.initialPotValue}
      roundNumber={daily?.count}
      updatedAt={daily?.updatedAt}
      participants={daily?.players?.length}
      addingFunction={addMinutes}
      timeLimit={60}
      players={daily?.players}
      priceCut={daily?.priceCut}
      gasCut={daily?.gasCut}
      isWinnerPicked={isDailyWinnerPicked}
      amountWinned={winnerData.amount}
      winnerAddress={winnerData.address}
      isMining={isMining}
    />
  );
};
