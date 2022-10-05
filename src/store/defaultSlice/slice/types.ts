import { Contract } from "ethers";
import { TableDataTypes } from "../../../utils/types";
import { MessageTypes } from "../../commonTypes";

export type Mutable<Type> = {
  -readonly [Key in keyof Type]: Type[Key];
};
export interface CommonDefaultDataTypes {
  currentBettingValue?: string;
  players?: TableDataTypes[];
  lotteryPrize?: string;
  updatedAt?: Date;
  type?: "daily" | "weekly" | "monthly";
  winners?: [string];
}

export interface DefaultLotteryTypes {
  daily?: CommonDefaultDataTypes | undefined;
  weekly?: CommonDefaultDataTypes | undefined;
  monthly?: CommonDefaultDataTypes | undefined;
}

export interface ContractListTypes {
  dailyContract: Contract | undefined;
  monthlyContract: Contract | undefined;
  weeklyContract: Contract | undefined;
}
export interface DefaultSliceTypes {
  defaultLotteryDatas: DefaultLotteryTypes;
  contractAddress: string;
  abi: JSON | undefined;
  connectedAccount: string;
  fetchingDatas: boolean;
  gettingContarct: boolean;
  dailyContract: Omit<Contract, "none"> | undefined;
  weeklyContract: Omit<Contract, "none"> | undefined;
  monthlyContract: Omit<Contract, "none"> | undefined;
  connectingWallet: boolean;
  checkingIfWalletIsConnected: boolean;
  message: MessageTypes;
  updatingDailyLottery: boolean;
  updatingWeeklyLottery: boolean;
  updatingMonthlyLottery: boolean;
  fetchingWinners: boolean;
}
