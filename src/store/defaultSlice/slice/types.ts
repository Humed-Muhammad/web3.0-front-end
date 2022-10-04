import { Signer } from "ethers";
import { TableDataTypes } from "../../../utils/types";
import { MessageTypes } from "../../commonTypes";

export type Mutable<Type> = {
  -readonly [Key in keyof Type]: Type[Key];
};

export interface CommonDefaultDataTypes {
  currentBettingValue: number;
  players: TableDataTypes[];
  previousWinners: [string];
  lotteryPrize: string;
  updatedAt: string;
}
export type DailyContractTypes = {
  provider: {
    getSigner?: () => void;
  };
  signer: Signer | undefined;
  dailyContract: any;
};
export type WeeklyContractTypes = {
  provider: {
    getSigner?: () => void;
  };
  signer: Signer | undefined;
  weeklyContract: any;
};

export type MonthlyContractTypes = {
  provider: {
    getSigner?: () => void;
  };
  signer: Signer | undefined;
  monthlyContract: any;
};
export interface DefaultLotteryTypes {
  daily?: CommonDefaultDataTypes | undefined;
  weekly?: CommonDefaultDataTypes | undefined;
  monthly?: CommonDefaultDataTypes | undefined;
}
export interface ContractSetterTypes {
  dailyContract: DailyContractTypes;
  weeklyContract: WeeklyContractTypes;
  monthlyContract: MonthlyContractTypes;
}
export interface DefaultSliceTypes {
  defaultLotteryDatas: DefaultLotteryTypes;
  contractAddress: string;
  abi: JSON | undefined;
  connectedAccount: string;
  fetchingDatas: boolean;
  gettingContarct: boolean;
  dailyContract: DailyContractTypes | undefined;
  weeklyContract: WeeklyContractTypes | undefined;
  monthlyContract: MonthlyContractTypes | undefined;
  connectingWallet: boolean;
  checkingIfWalletIsConnected: boolean;
  message: MessageTypes;
}
