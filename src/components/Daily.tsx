import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  selectAllDefaultLottery,
  selectContract,
  selectLotteryDatas,
  selectMessage,
} from "../store/defaultSlice/slice/selector";
import { LOTTERY_TYPE, LOTTERY_TYPE2 } from "../utils/constants";
import { DetailCard } from "./DetailCard";
import { actions as defaultActions } from "../store/defaultSlice/slice";
import { actions as weeklyActions } from "../store/Weekly/slice";
import { selectWeeklySendingFunds } from "../store/Weekly/slice/selector";
export const Daily = () => {
  const dispatch = useDispatch();
  const { weekly } = useSelector(selectLotteryDatas);
  const isSendingFunds = useSelector(selectWeeklySendingFunds);
  const contract = useSelector((state: RootState) =>
    selectContract(state, LOTTERY_TYPE.weekly)
  );
  const { fetchingDatas } = useSelector(selectAllDefaultLottery);

  const message = useSelector(selectMessage);

  useEffect(() => {
    contract?.on("LogPlayers", () => {
      dispatch(defaultActions.updateSingleLottery(LOTTERY_TYPE.weekly));
    });
    contract?.on("LogWinner", (player: string) => {
      console.log(`Winner is picked ${player}`);

      dispatch(defaultActions.updateTime("daily"));
      dispatch(defaultActions.updateSingleLottery(LOTTERY_TYPE.daily));
      dispatch(
        defaultActions.setMessages({
          content: `Daily winner is picked ${player}`,
          type: "success",
        })
      );
    });
  }, [contract]);
  return (
    <DetailCard
      currentBettingValue={weekly?.currentBettingValue}
      totalAmount={weekly?.lotteryPrize}
      type={LOTTERY_TYPE2.Daily}
      winingPrize={weekly?.lotteryPrize}
      sendFund={() => dispatch(weeklyActions.sendFunds())}
      isSendingFunds={isSendingFunds}
      isFetchingData={fetchingDatas}
    />
  );
};
