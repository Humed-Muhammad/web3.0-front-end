import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WeeklyLotteryTypes } from "./types";

const initialState: WeeklyLotteryTypes = {
  bettingMonthlyLottery: false,
  monthlyWinnerIsPicked: false,
  miningMonthlyLottery: false,
};

export const monthly = createSlice({
  name: "monthly",
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
export const actions = monthly.actions;

export const monthlyReducer = monthly.reducer;
