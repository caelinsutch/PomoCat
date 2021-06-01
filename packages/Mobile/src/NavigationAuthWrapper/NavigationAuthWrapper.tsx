/* eslint-disable camelcase  */
import React from "react";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { NavigationContainer } from "@react-navigation/native";
import { forFade, Stack, Tab } from "../Routing";
import {
  AuthScreen,
  HomeScreen,
  AnalyticsScreen,
  SettingsScreen,
} from "../Screens";
import { useAuthState, useUpdateLocalState } from "../Hooks";
import { Box, Icon } from "../Components";
import { IconProps } from "../Components/Icon/Icon";

const NavigationAuthWrapper: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });
  const { stateUpdated } = useUpdateLocalState();

  const isLoggedIn = useAuthState();

  if (!fontsLoaded || !stateUpdated) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size, focused }) => {
              let iconName: IconProps["name"] = "Timer";

              if (route.name === "Settings") {
                iconName = "Settings";
              } else if (route.name === "Analytics") {
                iconName = "Graph";
              }

              // You can return any component that you like here!
              return (
                <Box
                  paddingBottom="xs"
                  borderBottomColor="primary500"
                  borderBottomWidth={focused ? 2 : 0}
                >
                  <Icon name={iconName} size={size} color={color} />
                </Box>
              );
            },
            tabBarLabel: undefined,
          })}
          tabBarOptions={{
            activeTintColor: "primary500",
            inactiveTintColor: "gray300",
            showLabel: false,
          }}
        >
          <Tab.Screen name="Analytics" component={AnalyticsScreen} />
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            cardStyleInterpolator: forFade,
            headerShown: false,
          }}
        >
          <Stack.Screen name="Auth" component={AuthScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default NavigationAuthWrapper;
