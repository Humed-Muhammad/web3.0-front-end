import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WeeklyLotteryTypes } from "./types";

const initialState: WeeklyLotteryTypes = {
  bettingMonthlyLottery: false,
  monthlyWinnerIsPicked: false,
  miningMonthlyLottery: false,
};

export const weeklySlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    sendMonthlyFunds: (state) => {
      state.bettingMonthlyLottery = true;
    },
    finishedBetting: (state) => {
      state.bettingMonthlyLottery = false;
    },
    setIsMonthlyLotteryWinnerPicked: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.monthlyWinnerIsPicked = action.payload;
    },
    setMiningMonthlyLottery: (state, action: PayloadAction<boolean>) => {
      state.miningMonthlyLottery = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const actions = weeklySlice.actions;

export const monthlyReducer = weeklySlice.reducer;
