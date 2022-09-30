import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Lottery, PlayersTypes, RootLotteryTypes } from "./types";

const initialState: RootLotteryTypes = {
  abi: undefined,
  contractAddress: undefined,
  lottery: undefined,
  fetchingPlayers: false,
  fetchingLotteries: false,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    requestPlayers: (state) => {
      state.fetchingPlayers = true;
    },
    setPlayers: (state, action: PayloadAction<PlayersTypes[]>) => {
      state.players = action.payload;
    },
    requestLottery: (state) => {
      state.fetchingLotteries = true;
    },
    setlottery: (state, action: PayloadAction<Lottery[]>) => {
      state.lottery = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const actions = counterSlice.actions;

export default counterSlice.reducer;
