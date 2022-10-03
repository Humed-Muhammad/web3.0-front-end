import { put, select, takeLatest } from "redux-saga/effects";
import { actions } from "../slice";
import {
  BigNumber,
  Contract,
  ethers,
  ContractTransaction,
  Signer,
} from "ethers";

import { contarctABI, contractAddress } from "../../utils";
import { selectConnectedAccount, selectContarct } from "../slice/selector";
import { ContractTypes } from "../slice/types";
interface EtherWindow extends Window {
  ethereum?: any;
}

function* requestContarctSaga() {
  try {
    const { ethereum }: EtherWindow = yield window;

    const provider: { getSigner: () => void } =
      yield new ethers.providers.Web3Provider(ethereum);
    const signer: Signer = yield provider.getSigner();
    const contract: Contract = yield new ethers.Contract(
      contractAddress,
      contarctABI,
      signer
    );

    yield put(
      actions.setContract({
        provider,
        signer,
        contract,
      })
    );
  } catch (error) {
    console.log(error);
  }
}

function* requestPlayersSaga() {
  try {
    const { ethereum }: EtherWindow = yield window;
    if (!ethereum) return alert("Please install metamask!");
    const { contract }: ContractTypes = yield select(selectContarct);
    const players: string[] = yield contract?.getPlayers();

    console.log(players);
  } catch (error) {
    console.log(error);
  }
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
    yield put(actions.finishedSendingFunds());
  } catch (error) {
    yield put(actions.finishedSendingFunds());
    alert(error);
  }
}

function* sendingFundsSaga() {
  const connectedAccount: string = yield select(selectConnectedAccount);
  try {
    yield put(
      actions.setMessages({
        content: "",
        type: null,
      })
    );
    const { ethereum }: EtherWindow = yield window;
    if (!ethereum) return alert("Please install metamask!");
    const { contract }: ContractTypes = yield select(selectContarct);
    const bettingValue: BigNumber = yield contract?.getBettingValue();
    // yield bettingValue.wait();
    console.log(bettingValue);
    const parsedAmount: BigNumber = yield ethers.utils.parseEther("1");
    console.log(parsedAmount);

    const transactionResponse: ContractTransaction = yield contract?.bet({
      from: connectedAccount,
      value: parsedAmount,
      gasLimit: 300000,
    });
    yield transactionResponse.wait();

    // const players: string[] = yield contract?.listeners("LogPLayers");

    // const balance: ContractTransaction = yield contract?.getBalance();
    // yield balance.wait();
    console.log(transactionResponse);

    if (transactionResponse) {
      yield put(actions.finishedSendingFunds());
      yield put(
        actions.setMessages({
          content: "Your transaction was successfully transfered.",
          type: "success",
        })
      );
    }
  } catch (error: any) {
    yield put(actions.finishedSendingFunds());
    yield put(
      actions.setMessages({
        content: error.message as string,
        type: "error",
      })
    );
    console.log(error);
  }
}

export function* lotterySaga() {
  yield takeLatest(actions.requestPlayers.type, requestPlayersSaga);
  yield takeLatest(
    actions.checkIfWalletIsConnected.type,
    checkIfWalletIsConnectedSaga
  );
  yield takeLatest(
    actions.requestWalletConnection.type,
    requestWalletConnectionsSaga
  );
  yield takeLatest(actions.sendingFunds.type, sendingFundsSaga);
  yield takeLatest(actions.requestContarct.type, requestContarctSaga);
}
