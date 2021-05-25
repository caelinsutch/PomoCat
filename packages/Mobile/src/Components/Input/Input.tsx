import React from "react";
import { TextInput, TextInputProps } from "react-native";
import {
  BoxProps,
  createBox,
  createRestyleComponent,
  createVariant,
  useTheme,
  VariantProps,
} from "@shopify/restyle";
import Box from "../Box";
import Text from "../Text";
import { Theme } from "../../Theme";

export type InputBaseProps = BoxProps<Theme> &
  VariantProps<Theme, "inputVariants"> &
  TextInputProps;

export type InputProps = {
  label?: string;
  required?: boolean;
  message?: string;
} & InputBaseProps;

export const InputBase = createRestyleComponent<InputProps, Theme>(
  [createVariant({ themeKey: "inputVariants" })],
  createBox<Theme>(TextInput)
);

const Input: React.FC<InputProps> = ({
  label,
  required,
  message,
  ...props
}) => {
  const theme = useTheme<Theme>();

  const textColor = (strength: number = 500): keyof Theme["colors"] => {
    if (props.variant === "error")
      return `red${strength}` as keyof Theme["colors"];
    if (props.variant === "warn")
      return `accent${strength}` as keyof Theme["colors"];
    return `gray${strength}` as keyof Theme["colors"];
  };

  return (
    <Box>
      {label && (
        <Box flexDirection="row" alignItems="center">
          <Text
            variant="sm"
            fontWeight="bold"
            marginRight="xss"
            color={textColor()}
          >
            {label}
          </Text>
          {required ? (
            <Box
              height={10}
              width={10}
              borderRadius="sm"
              backgroundColor="gray100"
            />
          ) : undefined}
        </Box>
      )}
      <InputBase
        {...props}
        marginTop="xs"
        placeholderTextColor={theme.colors[textColor()]}
        editable={props.variant !== "disabled"}
      />
      {(label && props.variant === "warning") || props.variant === "error" ? (
        <Box marginTop="xs">
          <Text color={textColor()}>{message}</Text>
        </Box>
      ) : undefined}
    </Box>
  );
};

export default Input;
