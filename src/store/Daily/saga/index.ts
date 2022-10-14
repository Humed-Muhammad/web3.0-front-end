import { put, select, takeLatest } from "redux-saga/effects";
import { actions } from "../slice";
import { actions as defaultActions } from "../../defaultSlice/slice";
import { BigNumber, ethers, ContractTransaction, Contract } from "ethers";

import { DefaultLotteryTypes } from "../../defaultSlice/slice/types";
import {
  selectConnectedAccount,
  selectContract,
  selectLotteryDatas,
} from "../../defaultSlice/slice/selector";
import { RootState } from "../..";
import { LOTTERY_TYPE } from "../../../utils/constants";

interface EtherWindow extends Window {
  ethereum?: any;
}

function* sendingDailyFundsSaga() {
  const connectedAccount: string = yield select(selectConnectedAccount);
  try {
    const { ethereum }: EtherWindow = yield window;
    if (!ethereum) return alert("Please install metamask!");
    const dailyContract: Contract = yield select((state: RootState) =>
      selectContract(state, LOTTERY_TYPE.daily)
    );
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
    yield put(actions.finishedBetting());
    yield put(actions.setMiningDailyLottery(true));

    yield transactionResponse.wait();
    if (transactionResponse) {
      yield put(
        defaultActions.setMessages({
          content: "Your transaction was successfully transfered.",
          type: "success",
        })
      );
      yield put(actions.setMiningDailyLottery(false));
    }
  } catch (error: any) {
    console.log(error);
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
          content: "Something went wrong transaction reverted!",
          type: "error",
        })
      );
    }
    yield put(actions.finishedBetting());
  }
}

export function* dailyLotterySaga() {
  yield takeLatest(actions.sendDailyFunds.type, sendingDailyFundsSaga);
}
