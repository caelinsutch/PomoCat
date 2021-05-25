import React from "react";
import { BoxProps } from "@shopify/restyle";
import { TouchableOpacity } from "react-native";
import Text from "../Text";
import { Theme } from "../../Theme";

type HyperLinkProps = { onPress: () => void } & BoxProps<Theme>;

const HyperLink: React.FC<HyperLinkProps> = ({
  children,
  onPress,
  ...props
}) => (
  <TouchableOpacity onPress={onPress}>
    <Text
      color="brand"
      textDecorationLine="underline"
      fontWeight="bold"
      {...props}
    >
      {children}
    </Text>
  </TouchableOpacity>
);
export default HyperLink;
