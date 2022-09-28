import { Container, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Home } from "./page/Home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Flex direction="column" height="100vh" width="full" justify="center">
      <Home />
    </Flex>
  );
}

export default App;
