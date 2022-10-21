export const API_ROUTE = "http://localhost:5000/api/";
// export const API_ROUTE = "http://192.168.43.141:5000/api/";
interface EtherWindow extends Window {
  ethereum?: any;
}
const { ethereum }: EtherWindow = window;

export enum LOTTERY_TYPE {
  daily = "daily",
  weekly = "weekly",
  monthly = "monthly",
}
export enum LOTTERY_TYPE_TITLE {
  Hourly = "Hourly",
  Daily = "Daily",
  Monthly = "Monthly",
}
export { ethereum };
