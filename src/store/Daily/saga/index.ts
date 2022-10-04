import { put, select, takeLatest } from "redux-saga/effects";
import { actions } from "../slice";
import { actions as defaultActions } from "../../defaultSlice/slice";
import { BigNumber, ethers, ContractTransaction } from "ethers";

import {
  DailyContractTypes,
  DefaultLotteryTypes,
} from "../../defaultSlice/slice/types";
import {
  selectConnectedAccount,
  selectDailyContarct,
  selectLotteryDatas,
} from "../../defaultSlice/slice/selector";

interface EtherWindow extends Window {
  ethereum?: any;
}

// function* requestPlayersSaga() {
//   try {
//     const { ethereum }: EtherWindow = yield window;
//     if (!ethereum) return alert("Please install metamask!");
//     const { contract }: ContractTypes = yield select(selectContarct);
//     const players: string[] = yield contract?.getPlayers();
//     // yield put(actions.setPlayers(players))
//   } catch (error) {
//     console.log(error);
//   }
// }

function* sendingFundsSaga() {
  const connectedAccount: string = yield select(selectConnectedAccount);
  try {
    yield put(
      defaultActions.setMessages({
        content: "",
        type: null,
      })
    );
    const { ethereum }: EtherWindow = yield window;
    if (!ethereum) return alert("Please install metamask!");
    const { dailyContract }: DailyContractTypes = yield select(
      selectDailyContarct
    );
    const defaultLotteryData: DefaultLotteryTypes = yield select(
      selectLotteryDatas
    );
    const parsedAmount: BigNumber = yield ethers.utils.parseEther(
      `${defaultLotteryData.daily?.currentBettingValue}`
    );
    console.log(parsedAmount);

    const transactionResponse: ContractTransaction = yield dailyContract?.bet({
      from: connectedAccount,
      value: parsedAmount,
      gasLimit: 300000,
    });
    yield transactionResponse.wait();
    console.log(transactionResponse);

    if (transactionResponse) {
      yield put(actions.finishedSendingFunds());
      yield put(
        defaultActions.setMessages({
          content: "Your transaction was successfully transfered.",
          type: "success",
        })
      );
    }
  } catch (error: any) {
    yield put(actions.finishedSendingFunds());
    yield put(
      defaultActions.setMessages({
        content: error.message as string,
        type: "error",
      })
    );
    console.log(error);
  }
}

export function* dailyLotterySaga() {
  yield takeLatest(actions.sendFunds.type, sendingFundsSaga);
}
