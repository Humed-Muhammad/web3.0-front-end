import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ContractTypes, MessageTypes } from "./types";

const selectLottery = (state: RootState) => state;

export const selectConnectedAccount: (state: RootState) => string =
  createSelector([selectLottery], (state) => state.connectedAccount);

export const selectContarct: (state: RootState) => ContractTypes =
  createSelector([selectLottery], (state) => state.transactionContract);

export const selectMessage: (state: RootState) => MessageTypes = createSelector(
  [selectLottery],
  (state) => state.message
);

export const selectSendingFunds: (state: RootState) => boolean = createSelector(
  [selectLottery],
  (state) => state.sendingFunds
);
