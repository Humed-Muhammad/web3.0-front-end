/* eslint-disable @typescript-eslint/no-empty-interface */
import "@emotion/react";
import type { MantineTheme } from "@mantine/core";

declare module "@emotion/react" {
  export interface Theme extends MantineTheme {}
}
