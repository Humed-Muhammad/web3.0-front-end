import { put, select, takeLatest } from "redux-saga/effects";
import { actions } from "../slice";
import { BigNumber, Contract, ContractInterface, ethers, Signer } from "ethers";

import {
  contarctABI,
  contractAddress,
  ethereum,
} from "../../../utils/constants";
import { selectContracts } from "../slice/selector";
import { ContractListTypes } from "../slice/types";
import { formatEther, formatPlayers } from "../../../utils/helpers";
import makeCall from "../../../API/makeCalls";
import { FetchedApiRespose } from "../../commonTypes";
import { PayloadAction } from "@reduxjs/toolkit";

function* checkIfWalletIsConnectedSaga() {
  try {
    if (!ethereum) {
      yield put(
        actions.setMessages({
          content: "Please install metamask!",
          type: "warning",
        })
      );
    }
    const accounts: string[] = yield ethereum.request({
      method: "eth_accounts",
    });

    if (!accounts.length) {
      yield put(actions.setConnectedWallet(""));
      yield put(
        actions.setMessages({
          content: "Please connect your wallet to continue",
          type: "info",
        })
      );
    } else {
      yield put(actions.setConnectedWallet(accounts[0]));
      yield put(actions.getDefaultData());
      yield put(
        actions.setMessages({
          content: "",
          type: null,
        })
      );
    }
  } catch ({ message }) {
    yield put(
      actions.setMessages({
        content: message as string,
        type: null,
      })
    );
    console.log(message);
  }
}

function* requestWalletConnectionsSaga() {
  try {
    if (!ethereum) {
      yield put(
        actions.setMessages({
          content: "Please install metamask!",
          type: "warning",
        })
      );
    }
    yield ethereum.request({
      method: "eth_requestAccounts",
    });
    yield put(actions.finishedWalletConnection());
    yield put(actions.getDefaultData());
  } catch (error) {
    yield put(actions.finishedWalletConnection());
    alert(error);
  }
}
function* requestContarctSaga() {
  try {
    const provider: { getSigner: () => object } =
      yield new ethers.providers.Web3Provider(ethereum);
    const signer: Signer = yield provider.getSigner();
    const dailyContract: Contract = yield new ethers.Contract(
      contractAddress,
      contarctABI,
      signer
    );

    yield put(
      actions.setContract({
        dailyContract: dailyContract,
        weeklyContract: undefined,
        monthlyContract: undefined,
      })
    );
  } catch (error) {
    console.log(error);
  }
}

function* requestDefaultLottryDatasSaga() {
  try {
    // const { dailyContract }: ContractListTypes = yield select(selectContracts);
    const res: FetchedApiRespose = yield makeCall({
      method: "GET",
      route: "",
      isSecureRoute: true,
    });
    const dailyLottery = res.lottery.find((lott) => lott.type === "daily");
    const provider: { getSigner: () => object } =
      yield new ethers.providers.Web3Provider(ethereum);
    const signer: Signer = yield provider.getSigner();
    const dailyContract: Contract = yield new ethers.Contract(
      dailyLottery?.contractAddress as string,
      res.abi,
      signer
      // contractAddress,
      // contarctABI,
      // signer
    );
    const dailyPlayers: [] = yield dailyContract?.getPlayers();
    const dailyBettingValue: BigNumber = yield dailyContract?.bettingValue();
    const dailyBalance: BigNumber = yield dailyContract?.getBalance();

    yield put(
      actions.setContract({
        dailyContract: dailyContract,
        weeklyContract: undefined,
        monthlyContract: undefined,
      })
    );

    const formatedDailyPlayers = formatPlayers(dailyPlayers);

    yield put(
      actions.setDefaultDatas({
        daily: {
          currentBettingValue: formatEther(dailyBettingValue),
          lotteryPrize: formatEther(dailyBalance),
          players: formatedDailyPlayers,
          updatedAt: dailyLottery?.updatedAt,
          type: dailyLottery?.type,
        },
      })
    );
  } catch (error) {
    console.log(error);
  }
}

function* updateDailyLotterySaga() {
  try {
    const { dailyContract }: ContractListTypes = yield select(selectContracts);
    const dailyPlayers: [] = yield dailyContract?.getPlayers();
    const dailyBalance: BigNumber = yield dailyContract?.getBalance();
    const dailyBettingValue: BigNumber = yield dailyContract?.bettingValue();

    const formatedDailyPlayers = formatPlayers(dailyPlayers);
    yield put(
      actions.updateSingleLottery({
        data: {
          lotteryPrize: formatEther(dailyBalance),
          players: formatedDailyPlayers,
          currentBettingValue: formatEther(dailyBettingValue),
        },
        type: "daily",
      })
    );
  } catch (error) {
    console.log(error);
  }
}

function* getWinnersSaga(
  action: PayloadAction<"daily" | "weekly" | "monthly">
) {
  try {
    const res: [string] = yield makeCall({
      method: "GET",
      isSecureRoute: true,
      route: `winners/${action.payload}`,
    });
    yield put(actions.setWinners({ data: res, type: action.payload }));
  } catch (error) {
    console.log(error);
  }
}

export function* defaultLotterySaga() {
  yield takeLatest(actions.requestContarct.type, requestContarctSaga);
  yield takeLatest(actions.getDefaultData.type, requestDefaultLottryDatasSaga);
  yield takeLatest(
    actions.requestWalletConnection.type,
    requestWalletConnectionsSaga
  );
  yield takeLatest(
    actions.checkIfWalletIsConnected.type,
    checkIfWalletIsConnectedSaga
  );
  yield takeLatest(actions.updateDailyLottery.type, updateDailyLotterySaga);
  yield takeLatest(actions.getWinners.type, getWinnersSaga);
}
