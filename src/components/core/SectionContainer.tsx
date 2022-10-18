import { Flex, FlexProps } from "@chakra-ui/react";
import React, { LegacyRef } from "react";

interface Props extends FlexProps {
  children: JSX.Element[] | JSX.Element | null;
  ref?: LegacyRef<HTMLDivElement> | undefined;
}
export const SectionContainer = ({ children, ref, ...rest }: Props) => {
  return (
    <Flex ref={ref} {...rest} w="full">
      {children}
    </Flex>
  );
};
