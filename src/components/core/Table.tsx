import React from "react";
import {
  Center,
  Link,
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
import { selectConnectedAccount } from "../../store/defaultSlice/slice/selector";
import { useSelector } from "react-redux";
import { CopyToClipboard } from "../CopyToClipboard";

interface Props extends TableProps {
  data: TableDataTypes[] | undefined;
}

const StyledTableContainer = styled(TableContainer)({
  "::-webkit-scrollbar": {
    height: "5px",
    width: "5px",
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
          {data?.map((item, index) => (
            <Tr key={index}>
              <Td w="64">
                <Center justifyContent="flex-start">
                  <Text w="48" variant="truncated">
                    {item.address}
                  </Text>
                  <CopyToClipboard value={item.address} />
                </Center>
              </Td>
              <Td>
                <Link
                  href={`https://goerli.etherscan.io/address/${item.address}`}
                  target="_blank"
                >
                  Link
                </Link>
              </Td>
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
