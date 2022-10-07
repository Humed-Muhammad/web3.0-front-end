import { Flex, FlexProps } from "@chakra-ui/react";
import React from "react";

interface Props extends FlexProps {
  children: JSX.Element[] | JSX.Element | null;
}
export const SectionContainer = ({ children, ...rest }: Props) => {
  return (
    <Flex {...rest} w="full">
      {children}
    </Flex>
  );
};
