/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-empty-function */
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { store } from "./store";
import { Provider } from "react-redux";
import "./utils/global-style.css";
import { theme } from "./utils/theme";
// if (process.env.NODE_ENV === "production") {
//   if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
//     window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function () {};
//   }
// }
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
