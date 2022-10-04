import { fork } from "redux-saga/effects";
import { defaultLotterySaga } from "../defaultSlice/saga";
import { dailyLotterySaga } from "../Daily/saga";

export default function* rootSaga() {
  yield fork(defaultLotterySaga);
  yield fork(dailyLotterySaga);
}
