import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../..";
// import { MessageTypes } from "";

const selectLottery = (state: RootState) => state.weeklyReducer;

export const selectWeeklySendingFunds: (state: RootState) => boolean =
  createSelector([selectLottery], (state) => state.sendingWeeklyFunds);

export const selectIfWeeklyLotteryWinnerIsSelected: (
  state: RootState
) => boolean = createSelector(
  [selectLottery],
  (state) => state.weeklyWinnerIsPicked
);
