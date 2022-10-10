import React from "react";
import {
  Spinner,
  Table,
  TableContainer,
  TableProps,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { TableDataTypes } from "../../utils/types";
import styled from "@emotion/styled";
import { dateFormater } from "../../utils/helpers";
import { selectConnectedAccount } from "../../store/defaultSlice/slice/selector";
import { useSelector } from "react-redux";

interface Props extends TableProps {
  data: TableDataTypes[] | undefined;
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
    background: "lightgray",
  },
});

export const ChakraTable = ({ data, ...rest }: Props) => {
  const connectedAccount = useSelector(selectConnectedAccount);
  return (
    <StyledTableContainer
      border={rest.border || "1px"}
      borderColor={rest.borderColor || "gray.300"}
      p="5"
      pb="8"
      h={["390px"]}
      overflowY="auto"
      position="relative"
      {...rest}
    >
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>Address</Th>
          </Tr>
        </Thead>

        <Tbody>
          {data?.map((item) => (
            <Tr key={item?.address}>
              <Td>{item.address}</Td>
              <Td>{item?.timestamp ? dateFormater(item?.timestamp) : ""}</Td>
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
