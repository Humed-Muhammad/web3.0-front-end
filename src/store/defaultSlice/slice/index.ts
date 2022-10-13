import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LOTTERY_TYPE } from "../../../utils/constants";
import { TableDataTypes } from "../../../utils/types";
import { MessageTypes } from "../../commonTypes";
import {
  CommonDefaultDataTypes,
  ContractListTypes,
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
  // contractAddress: "",
  abi: undefined,
  connectedAccount: undefined,
  isWalletConnected: false,
  connectingWallet: false,
  checkingIfWalletIsConnected: false,
  message: {
    type: "success",
    content: "",
  },
  updatingDailyLottery: false,
  updatingWeeklyLottery: false,
  updatingMonthlyLottery: false,
  fetchingWinners: false,
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
      state.isWalletConnected = true;
    },
    checkIfWalletIsConnected: (state) => {
      state.checkingIfWalletIsConnected = true;
    },
    setConnectedWallet: (state, action: PayloadAction<string>) => {
      state.connectedAccount = action.payload;
      state.checkingIfWalletIsConnected = false;
    },
    setIsWalletIsConnected: (state, action: PayloadAction<boolean>) => {
      state.isWalletConnected = action.payload;
    },
    requestContarct: (state) => {
      state.gettingContarct = true;
    },
    setContract: (state, action: PayloadAction<ContractListTypes>) => {
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
      state.defaultLotteryDatas[action.payload.type]?.players?.push(
        action.payload.player
      );
    },
    updateSingleLottery: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _action: PayloadAction<keyof typeof LOTTERY_TYPE>
    ) => {
      state.updatingDailyLottery = true;
    },

    setUpdateSingleLottery: (
      state,
      action: PayloadAction<{
        data: CommonDefaultDataTypes;
        type: "daily" | "weekly" | "monthly";
      }>
    ) => {
      state.defaultLotteryDatas[action.payload.type] = {
        ...state.defaultLotteryDatas[action.payload.type],
        lotteryPrize: action.payload.data.lotteryPrize,
        players: action.payload.data.players,
      };
    },
    getWinners: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      action: PayloadAction<"daily" | "weekly" | "monthly" | undefined>
    ) => {
      state.fetchingWinners = true;
    },
    setWinners: (
      state,
      action: PayloadAction<{
        data: [string];
        type: "daily" | "weekly" | "monthly";
      }>
    ) => {
      state.defaultLotteryDatas[action.payload.type] = {
        ...state.defaultLotteryDatas[action.payload.type],
        winners: action.payload.data,
      };
      state.fetchingWinners = true;
    },
    updateTime: (
      state,
      action: PayloadAction<"daily" | "weekly" | "monthly">
    ) => {
      state.defaultLotteryDatas[action.payload] = {
        ...state.defaultLotteryDatas[action.payload],
        updatedAt: new Date(),
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const actions = defaultSlice.actions;

export const defaultReducer = defaultSlice.reducer;
