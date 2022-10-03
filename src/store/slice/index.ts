import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  ContractTypes,
  Lottery,
  MessageTypes,
  PlayersTypes,
  RootLotteryTypes,
} from "./types";

const initialState: RootLotteryTypes = {
  abi: undefined,
  contractAddress: undefined,
  lottery: undefined,
  fetchingPlayers: false,
  gettingContarct: false,
  fetchingLotteries: false,
  connectedAccount: "",
  sendingFunds: false,
  connectingWallet: false,
  checkingIfWalletIsConnected: false,
  players: [],
  message: {
    type: "success",
    content: "",
  },
  transactionContract: {
    provider: {
      getSigner: undefined,
    },
    signer: undefined,
    contract: undefined,
  },
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    requestContarct: (state) => {
      state.gettingContarct = true;
    },
    setContract: (state, action: PayloadAction<ContractTypes>) => {
      state.transactionContract = action.payload;
      state.gettingContarct = false;
    },
    sendingFunds: (state) => {
      state.sendingFunds = true;
    },
    finishedSendingFunds: (state) => {
      state.sendingFunds = false;
    },
    requestPlayers: (state) => {
      state.fetchingPlayers = true;
    },
    setPlayers: (state, action: PayloadAction<PlayersTypes[]>) => {
      state.players = action.payload;
      state.fetchingPlayers = false;
    },
    requestLottery: (state) => {
      state.fetchingLotteries = true;
    },
    setlottery: (state, action: PayloadAction<Lottery[]>) => {
      state.lottery = action.payload;
      state.fetchingLotteries = false;
    },

    checkIfWalletIsConnected: (state) => {
      state.checkingIfWalletIsConnected = true;
    },
    setConnectedWallet: (state, action: PayloadAction<string>) => {
      state.connectedAccount = action.payload;
      state.checkingIfWalletIsConnected = false;
    },
    requestWalletConnection: (state) => {
      state.connectingWallet = true;
    },
    setMessages: (state, action: PayloadAction<MessageTypes>) => {
      state.message = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const actions = counterSlice.actions;

export const reducers = counterSlice.reducer;
