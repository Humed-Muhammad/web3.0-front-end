import { BigNumber, Contract } from "ethers";
import { FetchedLottery } from "../store/commonTypes";

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
