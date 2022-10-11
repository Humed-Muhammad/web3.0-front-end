import { dailyReducer } from "./Daily/slice";
import { defaultReducer } from "./defaultSlice/slice";
import { weeklyReducer } from "./Weekly/slice";
import { monthlyReducer } from "./Monthly/slice";

export const reducers = {
  dailyReducer,
  defaultReducer,
  weeklyReducer,
  monthlyReducer,
};
