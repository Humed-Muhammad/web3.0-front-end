import { put, select, takeLatest } from "redux-saga/effects";
import { actions } from "../slice";
import { actions as defaultActions } from "../../defaultSlice/slice";
import { BigNumber, ethers, ContractTransaction } from "ethers";

import {
  ContractListTypes,
  DefaultLotteryTypes,
} from "../../defaultSlice/slice/types";
import {
  selectConnectedAccount,
  selectContract,
  selectLotteryDatas,
} from "../../defaultSlice/slice/selector";

interface EtherWindow extends Window {
  ethereum?: any;
}

function* sendingFundsSaga() {
  const connectedAccount: string = yield select(selectConnectedAccount);
  try {
    const { ethereum }: EtherWindow = yield window;
    if (!ethereum) return alert("Please install metamask!");
    const { dailyContract }: ContractListTypes = yield select(selectContract);
    const defaultLotteryData: DefaultLotteryTypes = yield select(
      selectLotteryDatas
    );
    const parsedAmount: BigNumber = yield ethers.utils.parseEther(
      `${defaultLotteryData.daily?.currentBettingValue}`
    );

    const transactionResponse: ContractTransaction = yield dailyContract?.bet({
      from: connectedAccount,
      value: parsedAmount,
      gasLimit: 300000,
    });
    yield transactionResponse.wait();
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
    if (!connectedAccount) {
      yield put(
        defaultActions.setMessages({
          content: "Make sure your wallet is connected",
          type: "error",
        })
      );
    }
    if (error?.code === "ACTION_REJECTED") {
      yield put(
        defaultActions.setMessages({
          content: "You have rejected the transaction!",
          type: "error",
        })
      );
    } else {
      yield put(
        defaultActions.setMessages({
          content: error.message,
          type: "error",
        })
      );
    }
    yield put(actions.finishedSendingFunds());
  }
}

export function* dailyLotterySaga() {
  yield takeLatest(actions.sendFunds.type, sendingFundsSaga);
}
