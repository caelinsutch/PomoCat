import React from "react";
import { View } from "react-native";

const screenContainerStyles = {
  flex: 1,
};

const ScreenContainer: React.FC = ({ children }) => (
  <View style={screenContainerStyles}>{children}</View>
);

export default ScreenContainer;
