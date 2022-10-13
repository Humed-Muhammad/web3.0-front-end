import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DailyLotteryTypes } from "./types";

const initialState: DailyLotteryTypes = {
  sendingFunds: false,
  dailyWinnerIsPicked: false,
};

export const dailySlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    sendDailyFunds: (state) => {
      state.sendingFunds = true;
    },
    finishedSendingFunds: (state) => {
      state.sendingFunds = false;
    },
    setIsDailyLotteryWinnerPicked: (state, action: PayloadAction<boolean>) => {
      state.dailyWinnerIsPicked = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const actions = dailySlice.actions;

export const dailyReducer = dailySlice.reducer;
