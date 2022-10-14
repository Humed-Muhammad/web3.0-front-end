import { BoxProps } from "@chakra-ui/react";
import { BigNumber, Contract } from "ethers";
import { FetchedLottery } from "../store/commonTypes";
import { LOTTERY_TYPE_TITLE } from "./constants";

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

export interface DetailCardProps extends BoxProps {
  type: keyof typeof LOTTERY_TYPE_TITLE;
  totalAmount: string | undefined;
  winingPrize: string | undefined;
  currentBettingValue: string | undefined;
  sendFund: () => void;
  isSendingFunds: boolean;
  isFetchingData: boolean;
  updatedAt: Date | undefined;
  roundNumber: number | undefined;
  initialPotValue: number | undefined;
  participants: number | undefined;
  timeLimit: number;
  addingFunction: (startTime: Date, timeLimit: number) => Date;
  players: TableDataTypes[] | undefined;
  priceCut: number | undefined;
  gasCut: number | undefined;
  isWinnerPicked: boolean;
  winnerAddress: string | undefined;
  amountWinned: BigNumber | undefined;
  isMining: boolean;
}
