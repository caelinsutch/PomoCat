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
import { AuthScreen, HomeScreen } from "../Screens";
import { useAuthState, useUpdateLocalState } from "../Hooks";
import SettingsScreen from "../Screens/SettingsScreen";

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
        <Tab.Navigator>
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
