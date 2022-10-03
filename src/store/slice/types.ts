import { AlertStatus } from "@chakra-ui/react";
import { Contract, Signer } from "ethers";

export interface Lottery {
  count: number;
  initialDepo: number;
  type: string;
  winners: string[];
  updatedAt: string;
}

export interface PlayersTypes {
  address: string | undefined;
  joinedTime: string | undefined;
}

export type ContractTypes = {
  provider: {
    getSigner?: () => void;
  };
  signer: Signer | undefined;
  contract: Contract | undefined;
};
export interface MessageTypes {
  type: AlertStatus | null;
  content: string;
}

export interface RootLotteryTypes {
  lottery: Lottery[] | undefined;
  players: PlayersTypes[] | undefined;
  contractAddress?: string | undefined;
  abi?: JSON | undefined;
  fetchingPlayers: boolean;
  gettingContarct: boolean;
  fetchingLotteries: boolean;
  connectedAccount: string;
  sendingFunds: boolean;
  connectingWallet: boolean;
  checkingIfWalletIsConnected: boolean;
  message: MessageTypes;
  transactionContract: ContractTypes;
}
