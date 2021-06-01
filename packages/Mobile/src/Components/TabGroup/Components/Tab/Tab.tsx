import React from "react";
import { TouchableOpacity } from "react-native";
import { BoxProps, TextProps } from "@shopify/restyle";
import { Theme } from "../../../../Theme";
import Box from "../../../Box";
import Text from "../../../Text";

type TabProps = {
  onPress: () => void;
  isSelected: boolean;
  textProps?: TextProps<Theme>;
  disabled?: boolean;
} & BoxProps<Theme>;

const Tab: React.FC<TabProps> = ({
  onPress,
  isSelected,
  textProps,
  children,
  disabled,
  ...props
}) => (
  <TouchableOpacity onPress={onPress} disabled={disabled}>
    <Box
      backgroundColor={isSelected ? "primary600" : undefined}
      paddingVertical="xs"
      paddingHorizontal="sm"
      borderRadius="md"
      {...props}
    >
      <Text
        variant="md"
        color={isSelected ? "gray50" : "primary300"}
        {...textProps}
      >
        {children}
      </Text>
    </Box>
  </TouchableOpacity>
);

export default Tab;
