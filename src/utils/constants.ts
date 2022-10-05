import abi from "./Lottery.json";
export const contarctABI = abi.abi;
export const contractAddress = "0xFA776F1C97839d175a8419320782aa70f4E7cAe2";

export const API_ROUTE = "http://192.168.43.141:5000/api/";
interface EtherWindow extends Window {
  ethereum?: any;
}
const { ethereum }: EtherWindow = window;

export { ethereum };
