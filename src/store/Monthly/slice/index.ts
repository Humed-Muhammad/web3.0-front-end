import { createSlice } from "@reduxjs/toolkit";
import { WeeklyLotteryTypes } from "./types";

const initialState: WeeklyLotteryTypes = {
  sendingMonthlyFunds: false,
};

export const weeklySlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    sendMonthlyFunds: (state) => {
      state.sendingMonthlyFunds = true;
    },
    finishedSendingMonthlyFunds: (state) => {
      state.sendingMonthlyFunds = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const actions = weeklySlice.actions;

export const monthlyReducer = weeklySlice.reducer;
