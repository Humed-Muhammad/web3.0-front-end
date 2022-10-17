import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WeeklyLotteryTypes } from "./types";

const initialState: WeeklyLotteryTypes = {
  bettingWeeklyLottery: false,
  weeklyWinnerIsPicked: false,
  miningWeeklyLottery: false,
};

export const weeklySlice = createSlice({
  name: "weekly",
  initialState,
  reducers: {
    sendWeeklyFunds: (state) => {
      state.bettingWeeklyLottery = true;
    },
    finishedBetting: (state) => {
      state.bettingWeeklyLottery = false;
    },
    setIsWeeklyLotteryWinnerPicked: (state, action: PayloadAction<boolean>) => {
      state.weeklyWinnerIsPicked = action.payload;
    },
    setMiningWeeklyLottery: (state, action: PayloadAction<boolean>) => {
      state.miningWeeklyLottery = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const actions = weeklySlice.actions;

export const weeklyReducer = weeklySlice.reducer;
