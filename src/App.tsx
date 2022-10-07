import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import { Home } from "./page/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
