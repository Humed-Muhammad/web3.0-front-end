import { BigNumber, Contract } from "ethers";
import { FetchedLottery } from "../store/commonTypes";
import { LOTTERY_TYPE2 } from "./constants";

export interface TableDataTypes {
  address?: string;
  timestamp?: Date;
}

export interface GetLotteryTypeRes {
  contract: Contract;
  bettingValue: string;
  lotteryPrize: string;
  players: TableDataTypes[];
  lotteryFromDB: FetchedLottery | undefined;
}

export interface DetailCardProps {
  type: keyof typeof LOTTERY_TYPE2;
  totalAmount: string | undefined;
  winingPrize: string | undefined;
  currentBettingValue: string | undefined;
  sendFund: () => void;
  isSendingFunds: boolean;
  isFetchingData: boolean;
  updatedAt: string | undefined;
  roundNumber: number | undefined;
  initialDepo: number | undefined;
}
