import { Flex } from "@chakra-ui/react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import { Home } from "./page/Home";

function App() {
  return (
    <BrowserRouter>
      <Flex
        direction="column"
        height="auto"
        overflow="auto"
        width="full"
        justify="center"
      >
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Flex>
    </BrowserRouter>
  );
}

export default App;
