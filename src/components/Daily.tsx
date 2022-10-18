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
import { actions as dailyActions } from "../store/Daily/slice";
import {
  selectDailySendingFunds,
  selectIfDailyLotteryWinnerIsSelected,
  selectIsDailyMining,
} from "../store/Daily/slice/selector";
import { addMinutes } from "date-fns";
import { BigNumber } from "ethers";
import { useEventListener } from "../utils/customHooks";

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
  useEventListener({
    contract: contract,
    setWinnerData: setWinnerData,
    type: LOTTERY_TYPE.daily,
    winnerStateDispatcher: dailyActions.setIsDailyLotteryWinnerPicked,
  });
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
      timeLimit={20}
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
