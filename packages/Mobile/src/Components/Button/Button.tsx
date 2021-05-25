import React from "react";
import { TouchableHighlight } from "react-native";
import { BoxProps, TextProps } from "@shopify/restyle";
import { Theme } from "../../Theme";
import Box from "../Box";
import Text from "../Text";

type ButtonProps = {
  textColor?: TextProps<Theme>["color"];
  onPress: () => void;
} & Partial<BoxProps<Theme>>;

const Button: React.FC<ButtonProps> = ({
  children,
  textColor = "white",
  onPress,
  ...props
}) => (
  <TouchableHighlight underlayColor="white" onPress={onPress}>
    <Box
      py="md"
      px="xl"
      borderRadius="sm"
      backgroundColor="brand"
      shadowOffset={{ height: 2, width: 0 }}
      shadowRadius={5}
      shadowColor="black"
      shadowOpacity={0.2}
      {...props}
    >
      <Text variant="md" color={textColor}>
        {children}
      </Text>
    </Box>
  </TouchableHighlight>
);

export default Button;