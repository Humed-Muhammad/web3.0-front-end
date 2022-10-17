import { IconButton } from "@chakra-ui/react";
import React from "react";
import { useCopyToClipboard } from "../utils/helpers";
import { colors } from "../utils/theme";
import { MdCopyAll } from "react-icons/md";
import { BsCheck } from "react-icons/bs";
import { TooltipHolder } from "./core/Tooltip";
interface Props {
  value: string | undefined;
}
export const CopyToClipboard = ({ value }: Props) => {
  const { copyToClipboard, copyed } = useCopyToClipboard();
  return (
    <TooltipHolder label="Copy to clipboard">
      <IconButton
        onClick={() => {
          copyToClipboard(value);
        }}
        bg="transparent"
        color="gray.600"
        rounded="full"
        aria-label="copy to clipboard"
        icon={
          copyed ? (
            <BsCheck size={20} color={colors.success.default} />
          ) : (
            <MdCopyAll size={20} />
          )
        }
      />
    </TooltipHolder>
  );
};
