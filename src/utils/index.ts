import abi from "./Lottery.json";
import { format } from "date-fns";
export const contarctABI = abi.abi;
export const contractAddress = "0x0Ce961Ef2C2cf4344f97117e756e4e7404001b08";

export const dateFormater = (date: Date, formatType = "PPpp") => {
  if (date) {
    return format(new Date(date), formatType);
  }
  return "No date";
};
