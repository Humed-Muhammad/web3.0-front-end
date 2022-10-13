import { createSelector } from "@reduxjs/toolkit";
import { Contract } from "ethers";
import { RootState } from "../..";
import { LOTTERY_TYPE } from "../../../utils/constants";
import { MessageTypes } from "../../commonTypes";

import { DefaultLotteryTypes, DefaultSliceTypes } from "./types";

const selectDefaultLottery = (state: RootState) => state.defaultReducer;

export const selectAllDefaultLottery: (state: RootState) => DefaultSliceTypes =
  createSelector([selectDefaultLottery], (state) => state);
export const selectLotteryDatas: (state: RootState) => DefaultLotteryTypes =
  createSelector([selectDefaultLottery], (state) => state.defaultLotteryDatas);

export const selectContract: (
  state: RootState,
  type: keyof typeof LOTTERY_TYPE
) => Omit<Contract, "none"> | undefined = createSelector(
  [selectDefaultLottery, (_, type: keyof typeof LOTTERY_TYPE) => type],
  (state, type) => {
    if (type === LOTTERY_TYPE.daily) {
      return state.dailyContract as Contract;
    } else if (type === LOTTERY_TYPE.weekly) {
      return state.weeklyContract as Contract;
    } else if (type === LOTTERY_TYPE.monthly) {
      return state.monthlyContract as Contract;
    } else {
      throw new Error(`Invalid type ${type}`);
    }
  }
);

export const selectConnectedAccount: (state: RootState) => string | undefined =
  createSelector([selectDefaultLottery], (state) => state.connectedAccount);

export const selectIfWalletIsConnected: (state: RootState) => boolean =
  createSelector([selectDefaultLottery], (state) => state.isWalletConnected);

export const selectMessage: (state: RootState) => MessageTypes = createSelector(
  [selectDefaultLottery],
  (state) => state.message
);

export const selectConnectingWallet: (state: RootState) => boolean =
  createSelector([selectDefaultLottery], (state) => state.connectingWallet);
