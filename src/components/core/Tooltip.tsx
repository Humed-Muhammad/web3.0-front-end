import { Tooltip } from "@chakra-ui/react";
import React from "react";

interface Props {
  children: JSX.Element[] | JSX.Element;
  value: string | number | undefined;
}
export const TooltipHolder = ({ children, value }: Props) => {
  return (
    <Tooltip
      textAlign="center"
      fontSize="sm"
      py="1"
      bg="primary"
      placement="top-start"
      label={value}
      hasArrow
    >
      {children}
    </Tooltip>
  );
};
