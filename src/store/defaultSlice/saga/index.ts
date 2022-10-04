import { put, select, takeLatest } from "redux-saga/effects";
import { actions } from "../slice";
import { BigNumber, Contract, ethers, Signer } from "ethers";

import { contarctABI, contractAddress } from "../../../utils";
import { selectDailyContarct } from "../slice/selector";
import { DailyContractTypes } from "../slice/types";
import { TableDataTypes } from "../../../utils/types";

interface EtherWindow extends Window {
  ethereum?: any;
}

function* checkIfWalletIsConnectedSaga() {
  try {
    const { ethereum }: EtherWindow = yield window;
    if (!ethereum) return alert("Please install metamask!");
    const accounts: string[] = yield ethereum.request({
      method: "eth_accounts",
    });
    yield put(actions.setConnectedWallet(accounts[0]));
  } catch (error) {
    console.log(error);
  }
}

function* requestWalletConnectionsSaga() {
  try {
    const { ethereum }: EtherWindow = yield window;
    if (!ethereum) return alert("Please install metamask!");
    yield ethereum.request({
      method: "eth_requestAccounts",
    });
    yield put(actions.finishedWalletConnection());
  } catch (error) {
    yield put(actions.finishedWalletConnection());
    alert(error);
  }
}

function* requestContarctSaga() {
  try {
    const { ethereum }: EtherWindow = yield window;

    const provider: { getSigner: () => void } =
      yield new ethers.providers.Web3Provider(ethereum);
    const signer: Signer = yield provider.getSigner();
    const dailyContract: Contract = yield new ethers.Contract(
      contractAddress,
      contarctABI,
      signer
    );

    yield put(
      actions.setContract({
        dailyContract: {
          provider,
          signer,
          dailyContract,
        },
        weeklyContract: {
          provider,
          signer,
          weeklyContract: "",
        },
        monthlyContract: {
          provider,
          signer,
          monthlyContract: "",
        },
      })
    );
  } catch (error) {
    console.log(error);
  }
}

function* requestDefaultLottryDatasSaga() {
  try {
    const { dailyContract }: DailyContractTypes = yield select(
      selectDailyContarct
    );
    const dailyPlayers: [] = yield dailyContract.getPlayers();
    const dailyBettingValue: BigNumber = yield dailyContract.getBettingValue();
    const dailyBalance: BigNumber = yield dailyContract.getBalance();

    const formatedDailyPlayers = dailyPlayers.reduce(
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
    yield put(
      actions.setDefaultDatas({
        daily: {
          currentBettingValue: parseInt(dailyBettingValue._hex),
          lotteryPrize: ethers.utils.formatEther(dailyBalance._hex),
          players: formatedDailyPlayers,
          updatedAt: "",
          previousWinners: [""],
        },
      })
    );

    console.log(
      formatedDailyPlayers,
      parseInt(dailyBettingValue._hex),
      ethers.utils.formatEther(dailyBalance._hex)
    );
  } catch (error) {
    console.log(error);
  }
}

export function* defaultLotterySaga() {
  yield takeLatest(actions.getDefaultData.type, requestDefaultLottryDatasSaga);
  yield takeLatest(actions.requestContarct.type, requestContarctSaga);
  yield takeLatest(
    actions.requestWalletConnection.type,
    requestWalletConnectionsSaga
  );
  yield takeLatest(
    actions.checkIfWalletIsConnected.type,
    checkIfWalletIsConnectedSaga
  );
}
