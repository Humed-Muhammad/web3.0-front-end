import React from "react";
import {
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { selectConnectedAccount } from "../store/defaultSlice/slice/selector";
import { useSelector } from "react-redux";

interface Props {
  data: [string] | undefined;
}

const StyledTableContainer = styled(TableContainer)({
  "::-webkit-scrollbar": {
    height: "5px",
    width: "5px",
    // display: "none",
  },
  "::-webkit-scrollbar-track": {
    background: "#f1f1f1",
  },

  "::-webkit-scrollbar-thumb": {
    background: "gray",
  },
});

export const WinnersTable = ({ data }: Props) => {
  const connectedAccount = useSelector(selectConnectedAccount);

  return (
    <StyledTableContainer
      border="1px"
      borderColor="gray.300"
      p="5"
      pb="8"
      h={["270px"]}
      overflowY="auto"
      position="relative"
    >
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>Address</Th>
          </Tr>
        </Thead>

        <Tbody rounded={"md"} shadow="sm">
          {data?.map((item) => (
            <Tr key={item}>
              <Td>{item}</Td>
            </Tr>
          ))}
        </Tbody>
        {!data && connectedAccount ? (
          <Spinner position="absolute" bottom="50%" right="50%" />
        ) : null}
        {!data?.length && data ? <Text>No participants yet!</Text> : null}
      </Table>
    </StyledTableContainer>
  );
};
