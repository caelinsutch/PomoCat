import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export type RootStackParamList = {
  Auth: undefined;
};

export type RootTabParamList = {
  Home: undefined;
  Settings: undefined;
  Analytics: undefined;
};
export const forFade = ({ current }: any) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

export const Stack = createStackNavigator<RootStackParamList>();
export const Tab = createBottomTabNavigator<RootTabParamList>();
