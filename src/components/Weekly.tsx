import React, { useEffect } from "react";
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
import { selectWeeklySendingFunds } from "../store/Weekly/slice/selector";
import { addHours } from "date-fns";

export const Weekly = () => {
  const dispatch = useDispatch();
  const { weekly } = useSelector(selectLotteryDatas);
  const isSendingFunds = useSelector(selectWeeklySendingFunds);
  const contract = useSelector((state: RootState) =>
    selectContract(state, LOTTERY_TYPE.weekly)
  );
  const { fetchingDatas } = useSelector(selectAllDefaultLottery);

  useEffect(() => {
    contract?.on("LogPlayers", () => {
      dispatch(defaultActions.updateSingleLottery(LOTTERY_TYPE.weekly));
    });
    contract?.on("LogWinner", (player: string) => {
      console.log(`Winner is picked ${player}`);

      dispatch(defaultActions.updateTime("weekly"));
      dispatch(defaultActions.updateSingleLottery(LOTTERY_TYPE.weekly));
      dispatch(
        defaultActions.setMessages({
          content: `Weekly winner is picked ${player}`,
          type: "success",
        })
      );
    });
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
    />
  );
};
