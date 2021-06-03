import React from "react";
import { ActivityIndicator, TouchableHighlight } from "react-native";
import { BoxProps, TextProps } from "@shopify/restyle";
import { Theme } from "../../Theme";
import Box from "../Box";
import Text from "../Text";

type ButtonProps = {
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  textProps?: TextProps<Theme>;
} & Partial<BoxProps<Theme>>;

const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  loading,
  textProps,
  disabled = false,
  ...props
}) => (
  <TouchableHighlight
    underlayColor="transparent"
    onPress={onPress}
    disabled={disabled}
  >
    <Box
      py="md"
      px="xl"
      borderRadius="sm"
      backgroundColor={disabled ? "primary300" : "primary500"}
      shadowOffset={{ height: 2, width: 0 }}
      shadowRadius={5}
      shadowColor="black"
      shadowOpacity={0.2}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text variant="md" color="white" {...textProps}>
          {children}
        </Text>
      )}
    </Box>
  </TouchableHighlight>
);

export default Button;
