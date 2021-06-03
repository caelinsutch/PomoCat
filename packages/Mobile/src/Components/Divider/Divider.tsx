import React from "react";
import { BoxProps } from "@shopify/restyle";
import { Theme } from "../../Theme";
import Box from "../Box";

type DividerProps = BoxProps<Theme>;

const Divider: React.FC<DividerProps> = (props) => (
  <Box borderBottomColor="gray200" borderBottomWidth={2} flex={1} {...props} />
);

export default Divider;
