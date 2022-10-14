import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../..";
// import { MessageTypes } from "";

const selectLottery = (state: RootState) => state.monthlyReducer;

export const selectMonthlySendingFunds: (state: RootState) => boolean =
  createSelector([selectLottery], (state) => state.bettingMonthlyLottery);

export const selectIfMonthlyLotteryWinnerIsSelected: (
  state: RootState
) => boolean = createSelector(
  [selectLottery],
  (state) => state.monthlyWinnerIsPicked
);
export const selectIsMonthlyMining: (state: RootState) => boolean =
  createSelector([selectLottery], (state) => state.miningMonthlyLottery);
