// import { SetStateAction, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { LOTTERY_TYPE } from "../constants";
// import {actions as defaultActions} from "../../store/defaultSlice/slice";
// import { CaseReducerActions } from "@reduxjs/toolkit";
// import { BigNumber, Contract } from "ethers";
// import { dailyReducer } from "../../store/Daily/slice";
// import { defaultReducer } from "../../store/defaultSlice/slice";
// import { weeklyReducer } from "../../store/Weekly/slice";
// import { monthlyReducer } from "../../store/Monthly/slice";

// interface Props{
//     type: keyof typeof LOTTERY_TYPE,
//     specifcActions: typeof dailyReducer
//     setWinnerData: (data:{
//         address: string | undefined,
//         amount:BigNumber | undefined
//     }) => void
//     contract: Contract
// }
// export const useListner = ({specifcActions,type, setWinnerData, contract}: Props) => {
// const dispatch = useDispatch()
//     useEffect(() => {
//         let timeOut: number;
//         contract?.on("LogPlayers", () => {
//           dispatch(defaultActions.updateSingleLottery(LOTTERY_TYPE.daily));
//         });
//         contract?.on("LogResetTimer", () => {
//           dispatch(defaultActions.updateSingleLottery(LOTTERY_TYPE.daily));
//         });
//         contract?.on("LogWinner", (player: string, amountWinned: BigNumber) => {
//           setWinnerData({
//             address: player,
//             amount: amountWinned,
//           });
//           dispatch(specifcActions.setIsDailyLotteryWinnerPicked(true));
//           dispatch(defaultActions.updateTime("daily"));
//           dispatch(defaultActions.updateSingleLottery(LOTTERY_TYPE.daily));
//           dispatch(
//             defaultActions.setMessages({
//               content: `Daily winner is picked ${player}`,
//               type: "success",
//             })
//           );
//           timeOut = setTimeout(() => {
//             dispatch(specifcActions.setIsDailyLotteryWinnerPicked(false));
//             dispatch(
//               defaultActions.setMessages({
//                 content: "",
//                 type: null,
//               })
//             );
//             setWinnerData({
//               address: "",
//               amount: undefined,
//             });
//           }, 10000);
//         });
//         return () => {
//           clearTimeout(timeOut);
//         };
//       }, [contract]);
// }
export {};
