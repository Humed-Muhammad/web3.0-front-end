import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../..";
import { MessageTypes } from "../../commonTypes";

import { DefaultLotteryTypes, DefaultSliceTypes } from "./types";

const selectDefaultLottery = (state: RootState) => state.defaultReducer;

export const selectAllDefaultLottery: (state: RootState) => DefaultSliceTypes =
  createSelector([selectDefaultLottery], (state) => state);
export const selectLotteryDatas: (state: RootState) => DefaultLotteryTypes =
  createSelector([selectDefaultLottery], (state) => state.defaultLotteryDatas);

export const selectContracts = createSelector(
  [selectDefaultLottery],
  (state) => {
    return {
      dailyContract: state.dailyContract,
      monthlyContract: state.monthlyContract,
      weeklyContract: state.weeklyContract,
    };
  }
);

export const selectConnectedAccount: (state: RootState) => string =
  createSelector([selectDefaultLottery], (state) => state.connectedAccount);

export const selectMessage: (state: RootState) => MessageTypes = createSelector(
  [selectDefaultLottery],
  (state) => state.message
);

export const selectConnectingWallet: (state: RootState) => boolean =
  createSelector([selectDefaultLottery], (state) => state.connectingWallet);
