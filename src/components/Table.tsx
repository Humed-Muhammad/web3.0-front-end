import React from "react";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { TableDataTypes } from "../utils/types";
import styled from "@emotion/styled";

interface Props {
  data: TableDataTypes[];
}

const StyledTableContainer = styled(TableContainer)({
  "::-webkit-scrollbar": {
    height: "5px",
    width: "5px",
    display: "none",
  },
  //   "::-webkit-scrollbar-track": {
  //     background: "#f1f1f1",
  //   },

  //   "::-webkit-scrollbar-thumb": {
  //     background: "none",
  //   },
});

export const ChakraTable = ({ data }: Props) => {
  return (
    <StyledTableContainer
      border="1px"
      borderColor="gray.300"
      p="5"
      pb="8"
      h={["270px"]}
      overflowY="auto"
    >
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>Address</Th>
            <Th>Joined time</Th>
          </Tr>
        </Thead>

        <Tbody rounded={"md"} shadow="sm">
          {data.map((item, index) => (
            <Tr key={item.address + index}>
              <Td>{item.address}</Td>
              <Td maxW="16">{item.timestamp}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </StyledTableContainer>
  );
};
