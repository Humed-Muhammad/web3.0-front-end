import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WeeklyLotteryTypes } from "./types";

const initialState: WeeklyLotteryTypes = {
  sendingWeeklyFunds: false,
  weeklyWinnerIsPicked: false,
};

export const weeklySlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    sendWeeklyFunds: (state) => {
      state.sendingWeeklyFunds = true;
    },
    finishedSendingFunds: (state) => {
      state.sendingWeeklyFunds = false;
    },
    setIsWeeklyLotteryWinnerPicked: (state, action: PayloadAction<boolean>) => {
      state.weeklyWinnerIsPicked = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const actions = weeklySlice.actions;

export const weeklyReducer = weeklySlice.reducer;
