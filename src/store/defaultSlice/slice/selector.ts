import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../..";
import { MessageTypes } from "../../commonTypes";

import { DailyContractTypes, DefaultLotteryTypes } from "./types";

const selectDefaultLottery = (state: RootState) => state.defaultReducer;

export const selectLotteryDatas: (
  state: RootState
) => DefaultLotteryTypes | undefined = createSelector(
  [selectDefaultLottery],
  (state) => state.defaultLotteryDatas
);

export const selectDailyContarct: (
  state: RootState
) => DailyContractTypes | undefined = createSelector(
  [selectDefaultLottery],
  (state) => state.dailyContract
);
export const selectDefaultLotteryDatas: (
  state: RootState
) => DefaultLotteryTypes | undefined = createSelector(
  [selectLotteryDatas],
  (state) => state
);
export const selectConnectedAccount: (state: RootState) => string =
  createSelector([selectDefaultLottery], (state) => state.connectedAccount);

export const selectMessage: (state: RootState) => MessageTypes = createSelector(
  [selectDefaultLottery],
  (state) => state.message
);

export const selectConnectingWallet: (state: RootState) => boolean =
  createSelector([selectDefaultLottery], (state) => state.connectingWallet);
