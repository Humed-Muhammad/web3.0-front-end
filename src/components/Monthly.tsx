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
import { actions as monthlyActions } from "../store/Monthly/slice";
import { selectMonthlySendingFunds } from "../store/Monthly/slice/selector";
import { addDays } from "date-fns";

export const Monthly = () => {
  const dispatch = useDispatch();
  const { monthly } = useSelector(selectLotteryDatas);
  const isSendingFunds = useSelector(selectMonthlySendingFunds);
  const contract = useSelector((state: RootState) =>
    selectContract(state, LOTTERY_TYPE.monthly)
  );
  const { fetchingDatas } = useSelector(selectAllDefaultLottery);

  useEffect(() => {
    contract?.on("LogPlayers", () => {
      dispatch(defaultActions.updateSingleLottery(LOTTERY_TYPE.monthly));
    });
    contract?.on("LogWinner", (player: string) => {
      console.log(`Winner is picked ${player}`);

      dispatch(defaultActions.updateTime("monthly"));
      dispatch(defaultActions.updateSingleLottery(LOTTERY_TYPE.monthly));
      dispatch(
        defaultActions.setMessages({
          content: `Monthly winner is picked ${player}`,
          type: "success",
        })
      );
    });
  }, [contract]);
  return (
    <DetailCard
      currentBettingValue={monthly?.currentBettingValue}
      totalAmount={monthly?.lotteryPrize}
      type={LOTTERY_TYPE_TITLE.Monthly}
      winingPrize={monthly?.lotteryPrize}
      sendFund={() => dispatch(monthlyActions.sendMonthlyFunds())}
      isSendingFunds={isSendingFunds}
      isFetchingData={fetchingDatas}
      roundNumber={monthly?.count}
      updatedAt={monthly?.updatedAt}
      initialPotValue={monthly?.initialPotValue}
      timeLimit={7}
      addingFunction={addDays}
      participants={monthly?.players?.length}
      players={monthly?.players}
      priceCut={monthly?.priceCut}
    />
  );
};
