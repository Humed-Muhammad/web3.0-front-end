import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DailyLotteryTypes } from "./types";

const initialState: DailyLotteryTypes = {
  bettingDailyLottery: false,
  dailyWinnerIsPicked: false,
  miningDailyLottery: false,
};

export const dailySlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    sendDailyFunds: (state) => {
      state.bettingDailyLottery = true;
    },
    finishedBetting: (state) => {
      state.bettingDailyLottery = false;
    },
    setIsDailyLotteryWinnerPicked: (state, action: PayloadAction<boolean>) => {
      state.dailyWinnerIsPicked = action.payload;
    },
    setMiningDailyLottery: (state, action: PayloadAction<boolean>) => {
      state.miningDailyLottery = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const actions = dailySlice.actions;

export const dailyReducer = dailySlice.reducer;
