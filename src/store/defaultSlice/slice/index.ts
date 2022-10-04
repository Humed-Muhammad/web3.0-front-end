import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TableDataTypes } from "../../../utils/types";
import { MessageTypes } from "../../commonTypes";
import {
  ContractSetterTypes,
  DefaultLotteryTypes,
  DefaultSliceTypes,
} from "./types";

const initialState: DefaultSliceTypes = {
  defaultLotteryDatas: {
    daily: undefined,
    weekly: undefined,
    monthly: undefined,
  },
  fetchingDatas: false,
  gettingContarct: false,
  dailyContract: undefined,
  weeklyContract: undefined,
  monthlyContract: undefined,
  contractAddress: "",
  abi: undefined,
  connectedAccount: "",
  connectingWallet: false,
  checkingIfWalletIsConnected: false,
  message: {
    type: "success",
    content: "",
  },
};

export const defaultSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    requestWalletConnection: (state) => {
      state.connectingWallet = true;
    },
    finishedWalletConnection: (state) => {
      state.connectingWallet = false;
    },
    checkIfWalletIsConnected: (state) => {
      state.checkingIfWalletIsConnected = true;
    },
    setConnectedWallet: (state, action: PayloadAction<string>) => {
      state.connectedAccount = action.payload;
      state.checkingIfWalletIsConnected = false;
    },
    requestContarct: (state) => {
      state.gettingContarct = true;
    },
    setContract: (state, action: PayloadAction<ContractSetterTypes>) => {
      state.dailyContract = action.payload.dailyContract;
      state.weeklyContract = action.payload.weeklyContract;
      state.monthlyContract = action.payload.monthlyContract;
      state.gettingContarct = false;
    },
    getDefaultData: (state) => {
      state.fetchingDatas = true;
    },
    setDefaultDatas: (state, action: PayloadAction<DefaultLotteryTypes>) => {
      state.defaultLotteryDatas = action.payload;
      state.fetchingDatas = false;
    },
    setMessages: (state, action: PayloadAction<MessageTypes>) => {
      state.message = action.payload;
    },
    setNewPlayer: (
      state,
      action: PayloadAction<{
        player: TableDataTypes;
        type: "daily" | "weekly" | "monthly";
      }>
    ) => {
      state.defaultLotteryDatas[action.payload.type]?.players.push(
        action.payload.player
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const actions = defaultSlice.actions;

export const defaultReducer = defaultSlice.reducer;
