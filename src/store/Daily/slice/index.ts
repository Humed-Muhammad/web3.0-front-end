import { createSlice } from "@reduxjs/toolkit";
import { RootLotteryTypes } from "./types";

const initialState: RootLotteryTypes = {
  sendingFunds: false,
};

export const counterSlice = createSlice({
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
export const actions = counterSlice.actions;

export const dailyReducer = counterSlice.reducer;
