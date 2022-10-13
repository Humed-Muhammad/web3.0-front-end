import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../..";
// import { MessageTypes } from "";

const selectLottery = (state: RootState) => state.dailyReducer;

export const selectDailySendingFunds: (state: RootState) => boolean =
  createSelector([selectLottery], (state) => state.sendingFunds);

export const selectIfDailyLotteryWinnerIsSelected: (
  state: RootState
) => boolean = createSelector(
  [selectLottery],
  (state) => state.dailyWinnerIsPicked
);
