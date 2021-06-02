import React from "react";
import { ScrollView, View } from "react-native";

const screenContainerStyles = {
  flex: 1,
};

type ScreenContainerProps = {
  scroll?: boolean;
};

const ScreenContainer: React.FC<ScreenContainerProps> = ({
  scroll,
  children,
}) => {
  if (scroll) {
    return <ScrollView style={screenContainerStyles}>{children}</ScrollView>;
  }
  return <View style={screenContainerStyles}>{children}</View>;
};

export default ScreenContainer;
