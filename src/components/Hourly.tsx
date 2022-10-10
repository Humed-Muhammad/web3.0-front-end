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
import { actions as dailyActions } from "../store/Daily/slice";
import { selectDailySendingFunds } from "../store/Daily/slice/selector";

export const Hourly = () => {
  const dispatch = useDispatch();
  const { daily } = useSelector(selectLotteryDatas);
  const isSendingFunds = useSelector(selectDailySendingFunds);
  const contract = useSelector((state: RootState) =>
    selectContract(state, LOTTERY_TYPE.daily)
  );
  const { fetchingDatas } = useSelector(selectAllDefaultLottery);

  const message = useSelector(selectMessage);

  useEffect(() => {
    contract?.on("LogPlayers", () => {
      dispatch(defaultActions.updateSingleLottery(LOTTERY_TYPE.daily));
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
  console.log(daily);
  return (
    <DetailCard
      currentBettingValue={daily?.currentBettingValue}
      totalAmount={daily?.lotteryPrize}
      type={LOTTERY_TYPE2.Hourly}
      winingPrize={daily?.lotteryPrize}
      sendFund={() => dispatch(dailyActions.sendFunds())}
      isSendingFunds={isSendingFunds}
      isFetchingData={fetchingDatas}
      initialDepo={daily?.initialDepo}
      roundNumber={daily?.count}
      updatedAt={daily?.updatedAt}
    />
  );
};
