import { createSlice } from "@reduxjs/toolkit";
import { DailyLotteryTypes } from "./types";

const initialState: DailyLotteryTypes = {
  sendingFunds: false,
};

export const weeklySlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    sendFunds: (state) => {
      state.sendingFunds = true;
    },
    finishedSendingFunds: (state) => {
      state.sendingFunds = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const actions = weeklySlice.actions;

export const weeklyReducer = weeklySlice.reducer;
