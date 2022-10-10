import { AlertStatus } from "@chakra-ui/react";
import { LOTTERY_TYPE } from "../utils/constants";

export interface MessageTypes {
  type: AlertStatus | null;
  content: string;
}
export interface FetchedLottery {
  winners: [string];
  updatedAt: Date;
  _id: string;
  type: keyof typeof LOTTERY_TYPE;
  contractAddress: string;
  currency: "ether";
  count: number;
  gasCut: number;
  priceCut: number;
  initialDepo: number;
}
export interface FetchedApiRespose {
  abi: object[];
  _id: string;
  lottery: FetchedLottery[];
}
