import React from "react";
import { useTheme } from "@shopify/restyle";
import Icons from "./Images";
import { Theme } from "../../Theme";

export type IconProps = {
  name: keyof typeof Icons;
  color: keyof Theme["colors"];
  size: number;
};

const Icon: React.FC<IconProps> = ({ name, color, size }) => {
  const IconElement = Icons[name];
  const theme = useTheme<Theme>();

  return <IconElement fill={theme.colors[color]} width={size} height={size} />;
};

export default Icon;
