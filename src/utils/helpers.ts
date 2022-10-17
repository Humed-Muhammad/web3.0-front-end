import { useToast } from "@chakra-ui/react";
import { format } from "date-fns";
import { BigNumber, Contract, ethers, Signer } from "ethers";
import { useState } from "react";
import { FetchedApiRespose } from "../store/commonTypes";
import { LOTTERY_TYPE } from "./constants";
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

export const formatEther = (value: BigNumber | undefined) => {
  if (value) {
    const result = ethers.utils.formatEther(value?._hex);
    return result;
  }
};

export interface GetLotteryResponseType {
  type: keyof typeof LOTTERY_TYPE;
  signer: Signer;
  lotteryData: FetchedApiRespose;
}
/**
 * @param  {GetLotteryResponseType} data
 * @returns formatedPlayers
 */
export const getLotteryData = async (data: GetLotteryResponseType) => {
  const lotteryFromDB = data.lotteryData.lottery.find(
    (lott) => lott.type === data.type
  );
  const contract: Contract = new ethers.Contract(
    lotteryFromDB?.contractAddress as string,
    data.lotteryData.abi,
    data.signer
  );
  const players: [] = await contract?.getPlayers();
  const bettingValue = formatEther(await contract?.bettingValue());
  const lotteryPrize = formatEther(await contract?.getBalance());
  const formatedPlayers = formatPlayers(players);

  return {
    contract,
    bettingValue,
    lotteryPrize,
    players: formatedPlayers,
    lotteryFromDB,
  };
};

export const calculatePriceCuts = (
  tobeCutted: number | string | undefined,
  cuttingAmount: number | undefined
) => {
  if (tobeCutted && cuttingAmount) {
    const result =
      Number(tobeCutted) - Number(tobeCutted) * (cuttingAmount / 100);
    return result;
  }
};

export const useCopyToClipboard = () => {
  const toast = useToast();
  const [copyed, setCopyed] = useState(false);
  const copyToClipboard = (value: string | undefined) => {
    try {
      if (value) {
        navigator.clipboard.writeText(value);
        setCopyed(true);
        setTimeout(() => {
          setCopyed(false);
        }, 1500);
      } else {
        throw new Error();
      }
    } catch (error) {
      toast({
        description: "There is noting to copy",
        status: "error",
        variant: "left-accent",
      });
      setCopyed(false);
    }
  };
  return {
    copyed,
    copyToClipboard,
  };
};
