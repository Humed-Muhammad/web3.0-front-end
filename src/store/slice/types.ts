export interface Lottery {
  count: number;
  initialDepo: number;
  type: string;
  winners: string[];
  updatedAt: string;
}

export interface RootLotteryTypes {
  lottery?: Lottery[] | undefined;
  players?: PlayersTypes[] | undefined;
  contractAddress?: string | undefined;

  abi?: JSON | undefined;
  fetchingPlayers: boolean;
  fetchingLotteries: boolean;
}

export interface PlayersTypes {
  address: string | undefined;
  joinedTime: string | undefined;
}
