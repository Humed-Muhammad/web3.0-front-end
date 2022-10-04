import { AlertStatus } from "@chakra-ui/react";

// export interface PlayersTypes {
//   address: string | undefined;
//   joinedTime: string | undefined;
// }

export interface MessageTypes {
  type: AlertStatus | null;
  content: string;
}
