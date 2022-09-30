import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { actions } from "../slice";
import { PlayersTypes } from "../slice/types";

function* requestPlayersSaga(action: PayloadAction<PlayersTypes[]>) {
  yield;
}
export function* cartSaga() {
  yield takeLatest(actions.requestPlayers.type, requestPlayersSaga);
}
