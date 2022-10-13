import { put, select, takeLatest } from "redux-saga/effects";
import { actions } from "../slice";
import { BigNumber, Contract, ethers, Signer } from "ethers";

import { ethereum, LOTTERY_TYPE } from "../../../utils/constants";
import { selectContract } from "../slice/selector";
import {
  formatEther,
  formatPlayers,
  getLotteryData,
} from "../../../utils/helpers";
import makeCall from "../../../API/makeCalls";
import { FetchedApiRespose } from "../../commonTypes";
import { PayloadAction } from "@reduxjs/toolkit";
import { GetLotteryTypeRes } from "../../../utils/types";
import { RootState } from "../..";

/* This function is responsible for checking if the user has connected their wallet. */
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
      yield put(actions.setIsWalletIsConnected(false));
      yield put(
        actions.setMessages({
          content: "Please connect your wallet to continue",
          type: "info",
        })
      );
    } else {
      yield put(actions.setConnectedWallet(accounts[0]));
      yield put(actions.getDefaultData());
      yield put(actions.setIsWalletIsConnected(true));
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

/* This function is responsible for requesting the user to connect their wallet. */
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
  } catch ({ message }) {
    yield put(
      actions.setMessages({
        content: message as string,
        type: "error",
      })
    );
    yield put(actions.finishedWalletConnection());
  }
}

/* This function is responsible for getting the default data for the lottery. */
function* requestDefaultLottryDatasSaga() {
  try {
    const response: FetchedApiRespose = yield makeCall({
      method: "GET",
      route: "",
      isSecureRoute: true,
    });

    /* Creating a provider for the ethers.js library. */
    const provider: { getSigner: () => object } =
      yield new ethers.providers.Web3Provider(ethereum);

    /* Getting the signer from the provider. */
    const signer: Signer = yield provider.getSigner();

    /***@Daily */
    const daily: GetLotteryTypeRes = yield getLotteryData({
      lotteryData: response,
      signer: signer,
      type: LOTTERY_TYPE.daily,
    });

    /**@END */

    /***@Wekkly  This section*/
    const weekly: GetLotteryTypeRes = yield getLotteryData({
      lotteryData: response,
      signer: signer,
      type: LOTTERY_TYPE.weekly,
    });
    /**@END */

    /***@Monthly  This section*/
    const monthly: GetLotteryTypeRes = yield getLotteryData({
      lotteryData: response,
      signer: signer,
      type: LOTTERY_TYPE.monthly,
    });
    /**@END */

    /* Setting the contracts in the redux store for each lottery type. */
    yield put(
      actions.setContract({
        dailyContract: daily.contract,
        weeklyContract: weekly.contract,
        monthlyContract: monthly.contract,
      })
    );

    /* Setting the default data for the lottery. */
    yield put(
      actions.setDefaultDatas({
        daily: {
          currentBettingValue: daily.bettingValue,
          lotteryPrize: daily.lotteryPrize,
          players: daily.players,
          updatedAt: daily.lotteryFromDB?.updatedAt,
          type: LOTTERY_TYPE.daily,
          count: daily.lotteryFromDB?.count,
          priceCut: daily.lotteryFromDB?.priceCut,
          gasCut: daily.lotteryFromDB?.gasCut,
          initialPotValue: daily.lotteryFromDB?.initialPotValue,
        },
        weekly: {
          currentBettingValue: weekly.bettingValue,
          lotteryPrize: weekly.lotteryPrize,
          players: weekly.players,
          updatedAt: weekly.lotteryFromDB?.updatedAt,
          type: LOTTERY_TYPE.weekly,
          count: weekly.lotteryFromDB?.count,
          priceCut: weekly.lotteryFromDB?.priceCut,
          gasCut: weekly.lotteryFromDB?.gasCut,
          initialPotValue: weekly.lotteryFromDB?.initialPotValue,
        },
        monthly: {
          currentBettingValue: monthly.bettingValue,
          lotteryPrize: monthly.lotteryPrize,
          players: monthly.players,
          updatedAt: monthly.lotteryFromDB?.updatedAt,
          type: LOTTERY_TYPE.monthly,
          count: monthly.lotteryFromDB?.count,
          priceCut: monthly.lotteryFromDB?.priceCut,
          gasCut: monthly.lotteryFromDB?.gasCut,
          initialPotValue: monthly.lotteryFromDB?.initialPotValue,
        },
      })
    );
  } catch (error) {
    console.log(error);
  }
}

/* This function is responsible for updating single lottery data by it type. */
function* updateSingleLotterySaga(
  action: PayloadAction<keyof typeof LOTTERY_TYPE>
) {
  try {
    const contract: Contract = yield select((state: RootState) =>
      selectContract(state, action.payload)
    );
    const players: [] = yield contract?.getPlayers();
    const lotteryBalance: BigNumber = yield contract?.getBalance();
    const bettingValue: BigNumber = yield contract?.bettingValue();

    const formatedDailyPlayers = formatPlayers(players);
    yield put(
      actions.setUpdateSingleLottery({
        data: {
          lotteryPrize: formatEther(lotteryBalance),
          players: formatedDailyPlayers,
          currentBettingValue: formatEther(bettingValue),
        },
        type: action.payload,
      })
    );
  } catch (error) {
    console.log(error);
  }
}

function* getWinnersSaga(action: PayloadAction<keyof typeof LOTTERY_TYPE>) {
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
  yield takeLatest(actions.getDefaultData.type, requestDefaultLottryDatasSaga);
  yield takeLatest(
    actions.requestWalletConnection.type,
    requestWalletConnectionsSaga
  );
  yield takeLatest(
    actions.checkIfWalletIsConnected.type,
    checkIfWalletIsConnectedSaga
  );
  yield takeLatest(actions.updateSingleLottery.type, updateSingleLotterySaga);
  yield takeLatest(actions.getWinners.type, getWinnersSaga);
}
