import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  selectAllDefaultLottery,
  selectContract,
  selectLotteryDatas,
} from "../store/defaultSlice/slice/selector";
import { LOTTERY_TYPE, LOTTERY_TYPE_TITLE } from "../utils/constants";
import { DetailCard } from "./DetailCard";
import { actions as weeklyActions } from "../store/Weekly/slice";
import {
  selectIfWeeklyLotteryWinnerIsSelected,
  selectIsWeeklyMining,
  selectWeeklySendingFunds,
} from "../store/Weekly/slice/selector";
import { addHours } from "date-fns";
import { BigNumber } from "ethers";
import { useEventListener } from "../utils/customHooks";

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

  useEventListener({
    contract: contract,
    setWinnerData: setWinnerData,
    type: LOTTERY_TYPE.daily,
    winnerStateDispatcher: weeklyActions.setIsWeeklyLotteryWinnerPicked,
  });

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
