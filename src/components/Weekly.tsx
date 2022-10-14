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
import { actions as weeklyActions } from "../store/Weekly/slice";
import {
  selectIfWeeklyLotteryWinnerIsSelected,
  selectIsWeeklyMining,
  selectWeeklySendingFunds,
} from "../store/Weekly/slice/selector";
import { addHours } from "date-fns";
import { BigNumber } from "ethers";

export const Weekly = () => {
  const [winnerData, setWinnerData] = useState<{
    amount: BigNumber | undefined;
    address: string;
  }>({
    address: "",
    amount: undefined,
  });

  const dispatch = useDispatch();
  const { weekly } = useSelector(selectLotteryDatas);
  const isMining = useSelector(selectIsWeeklyMining);
  const isSendingFunds = useSelector(selectWeeklySendingFunds);
  const isWeeklyWinnerPicked = useSelector(
    selectIfWeeklyLotteryWinnerIsSelected
  );
  const contract = useSelector((state: RootState) =>
    selectContract(state, LOTTERY_TYPE.weekly)
  );
  const { fetchingDatas } = useSelector(selectAllDefaultLottery);

  useEffect(() => {
    let timeOut: number;
    contract?.on("LogPlayers", () => {
      dispatch(defaultActions.updateSingleLottery(LOTTERY_TYPE.weekly));
    });
    contract?.on("LogResetTimer", () => {
      dispatch(defaultActions.updateSingleLottery(LOTTERY_TYPE.weekly));
    });
    contract?.on("LogWinner", (player: string, amountWinned: BigNumber) => {
      setWinnerData({
        address: player,
        amount: amountWinned,
      });
      dispatch(weeklyActions.setIsWeeklyLotteryWinnerPicked(true));
      dispatch(defaultActions.updateTime("weekly"));
      dispatch(defaultActions.updateSingleLottery(LOTTERY_TYPE.weekly));
      dispatch(
        defaultActions.setMessages({
          content: `Weekly winner is picked ${player}`,
          type: "success",
        })
      );
      timeOut = setTimeout(() => {
        dispatch(weeklyActions.setIsWeeklyLotteryWinnerPicked(false));
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
      currentBettingValue={weekly?.currentBettingValue}
      totalAmount={weekly?.lotteryPrize}
      type={LOTTERY_TYPE_TITLE.Daily}
      winingPrize={weekly?.lotteryPrize}
      sendFund={() => dispatch(weeklyActions.sendWeeklyFunds())}
      isSendingFunds={isSendingFunds}
      isFetchingData={fetchingDatas}
      roundNumber={weekly?.count}
      updatedAt={weekly?.updatedAt}
      initialPotValue={weekly?.initialPotValue}
      timeLimit={24}
      addingFunction={addHours}
      participants={weekly?.players?.length}
      players={weekly?.players}
      priceCut={weekly?.priceCut}
      gasCut={weekly?.gasCut}
      isWinnerPicked={isWeeklyWinnerPicked}
      amountWinned={winnerData.amount}
      winnerAddress={winnerData.address}
      isMining={isMining}
    />
  );
};
