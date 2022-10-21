import { Dispatch, SetStateAction, useEffect } from "react";
import { useDispatch } from "react-redux";
import { LOTTERY_TYPE } from "../constants";
import { actions as defaultActions } from "../../store/defaultSlice/slice";
import { BigNumber, Contract } from "ethers";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { add, compareAsc } from "date-fns";

interface Props {
  type: keyof typeof LOTTERY_TYPE;
  winnerStateDispatcher: ActionCreatorWithPayload<boolean>;
  setWinnerData: Dispatch<
    SetStateAction<{ amount: BigNumber | undefined; address: string }>
  >;
  contract: Omit<Contract, "none"> | undefined;
}
export const useEventListener = ({
  winnerStateDispatcher,
  type,
  setWinnerData,
  contract,
}: Props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    let timeOut: any;
    contract?.on("LogPlayers", () => {
      dispatch(defaultActions.updateSingleLottery(type));
    });
    contract?.on("LogResetTimer", () => {
      dispatch(defaultActions.updateSingleLottery(type));
    });
    contract?.on(
      "LogWinner",
      (player: string, amountWinned: BigNumber, timestamp: BigNumber) => {
        dispatch(defaultActions.updateTime(type));
        const updatedAt = new Date(parseInt(timestamp._hex) * 1000);
        const updatedAtAdded = add(updatedAt, {
          seconds: 25,
        });

        const getComparedDate = compareAsc(updatedAtAdded, new Date());

        if (getComparedDate === 1) {
          setWinnerData({
            address: player,
            amount: amountWinned,
          });

          dispatch(winnerStateDispatcher(true));
          dispatch(defaultActions.updateSingleLottery(type));
          dispatch(
            defaultActions.setMessages({
              content: `${type.toUpperCase()} winner is picked ${player}`,
              type: "success",
            })
          );
        }
        timeOut = setTimeout(() => {
          dispatch(winnerStateDispatcher(false));
          dispatch(
            defaultActions.setMessages({
              content: "",
              type: null,
            })
          );
          setWinnerData({
            address: "",
            amount: undefined,
          });
        }, 20000);
      }
    );
    return () => {
      clearTimeout(timeOut);
    };
  }, [contract]);
};
