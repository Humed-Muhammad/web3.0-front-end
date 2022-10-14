import { Tooltip, TooltipProps } from "@chakra-ui/react";
import React from "react";

interface Props extends TooltipProps {
  children: JSX.Element[] | JSX.Element;
}
export const TooltipHolder = ({ children, ...rest }: Props) => {
  return (
    <Tooltip
      textAlign="center"
      fontSize="sm"
      py="1"
      bg="primary"
      placement="top-start"
      {...rest}
      hasArrow
    >
      {children}
    </Tooltip>
  );
};
