import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LotteryProvider } from "./context/LotteryContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Lotteries } from "./page/Lotteries";
import { Navbar } from "./components/Navbar";
import backgroundImage from "./assets/ethbg.jpg";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <LotteryProvider>
      <ChakraProvider>
        <BrowserRouter>
          <Box bgImage={backgroundImage}>
            <Navbar />
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/lotteries" element={<Lotteries />} />
            </Routes>
          </Box>
        </BrowserRouter>
      </ChakraProvider>
    </LotteryProvider>
  </React.StrictMode>
);
