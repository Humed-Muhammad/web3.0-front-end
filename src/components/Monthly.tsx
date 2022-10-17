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
import { actions as monthlyActions } from "../store/Monthly/slice";
import {
  selectIfMonthlyLotteryWinnerIsSelected,
  selectIsMonthlyMining,
  selectMonthlySendingFunds,
} from "../store/Monthly/slice/selector";
import { addDays } from "date-fns";
import { BigNumber } from "ethers";
import { useEventListener } from "../utils/customHooks";

export const Monthly = () => {
  const [winnerData, setWinnerData] = useState<{
    amount: BigNumber | undefined;
    address: string;
  }>({
    address: "",
    amount: undefined,
  });
  const dispatch = useDispatch();
  const { monthly } = useSelector(selectLotteryDatas);
  const isMining = useSelector(selectIsMonthlyMining);
  const isSendingFunds = useSelector(selectMonthlySendingFunds);
  const isMonthlyWinnerPicked = useSelector(
    selectIfMonthlyLotteryWinnerIsSelected
  );
  const contract = useSelector((state: RootState) =>
    selectContract(state, LOTTERY_TYPE.monthly)
  );
  const { fetchingDatas } = useSelector(selectAllDefaultLottery);

  useEventListener({
    contract: contract,
    setWinnerData: setWinnerData,
    type: LOTTERY_TYPE.monthly,
    winnerStateDispatcher: monthlyActions.setIsMonthlyLotteryWinnerPicked,
  });
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
      gasCut={monthly?.gasCut}
      isWinnerPicked={isMonthlyWinnerPicked}
      amountWinned={winnerData.amount}
      winnerAddress={winnerData.address}
      isMining={isMining}
    />
  );
};
