import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LotteryProvider } from "./context/LotteryContext";
import { store } from "./store";
import { Provider } from "react-redux";
import { theme } from "./utils/theme";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <LotteryProvider>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </LotteryProvider>
    </Provider>
  </React.StrictMode>
);
