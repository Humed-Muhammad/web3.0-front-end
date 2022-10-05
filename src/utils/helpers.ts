import { format } from "date-fns";
import { BigNumber, ethers } from "ethers";
import { TableDataTypes } from "./types";

export const dateFormater = (date: Date, formatType = "PPpp") => {
  if (date) {
    return format(new Date(date), formatType);
  }
  return "No date";
};

export const formatPlayers = (players: []) => {
  const formatedPlayers = players.reduce(
    (
      acc: TableDataTypes[],
      curr: {
        account: string;
        timestamp: {
          _hex: string;
          _isBigNumber: boolean;
        };
      }
    ) => {
      const date = new Date(parseInt(curr["timestamp"]?._hex) * 1000);
      acc.push({
        address: curr["account"],
        timestamp: date,
      });

      return acc;
    },
    []
  );

  return formatedPlayers;
};

export const formatEther = (value: BigNumber) => {
  const result = ethers.utils.formatEther(value._hex);
  return result;
};
