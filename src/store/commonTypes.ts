import { AlertStatus } from "@chakra-ui/react";

export interface MessageTypes {
  type: AlertStatus | null;
  content: string;
}
export interface FetchedLottery {
  winners: [string];
  updatedAt: Date;
  _id: string;
  type: "daily" | "weekly" | "monthly";
  contractAddress: string;
  currency: "ether";
}
export interface FetchedApiRespose {
  abi: object[];
  _id: string;
  lottery: FetchedLottery[];
}
