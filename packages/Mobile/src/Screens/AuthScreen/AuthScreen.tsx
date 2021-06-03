import React, { useState } from "react";
import { ImageBackground, Image } from "react-native";
import { Controller, useForm } from "react-hook-form";
import Toast from "react-native-root-toast";

import { useTheme } from "@shopify/restyle";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  Box,
  Illustration,
  ScreenContainer,
  Text,
  Input,
  Button,
} from "../../Components";
// @ts-ignore
import TopBackground from "../../../assets/TopBackground.png";
// @ts-ignore
import BottomBackground from "../../../assets/BottomBackground.png";
import HyperLink from "../../Components/HyperLink";
import { emailRegexPattern } from "../../constants";
import { useLogin, useRegister } from "../../Hooks";
import { Theme } from "../../Theme";
import { RootStackParamList } from "../../Routing";

type AuthScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "Auth">;
};

const AuthScreen: React.FC<AuthScreenProps> = () => {
  const theme = useTheme<Theme>();
  const [isLogin, setIsLogin] = useState(false);
  const { login, loading: loginLoading } = useLogin();
  const { register, loading: registerLoading } = useRegister();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      if (isLogin) {
        await login(data.email, data.password);
      } else {
        await register(data.email, data.password);
      }
      Toast.show(isLogin ? "Logged in :)" : "Registered and logged in :)", {
        backgroundColor: theme.colors.primary500,
        textStyle: {
          fontSize: 18,
        },
      });
    } catch (e) {
      Toast.show(e.toString(), {
        backgroundColor: theme.colors.red500,
        textStyle: {
          fontSize: 18,
        },
      });
    }
  };

  return (
    <ScreenContainer>
      <Box flex={1}>
        <ImageBackground
          source={TopBackground}
          style={{
            flex: 1,
          }}
          imageStyle={{
            borderBottomLeftRadius: 48,
            borderBottomRightRadius: 48,
          }}
        >
          <Box flex={1} justifyContent="center" alignItems="center">
            <Illustration width={250} height={250} illustration="logoWhite" />
            <Text variant="md" color="white" fontWeight="bold">
              Make More of Your Day
            </Text>
          </Box>
        </ImageBackground>

        <Box flex={1} paddingTop="lg" alignItems="center">
          <Text variant="lg">
            {isLogin
              ? "Login to your account"
              : "Get started with PomoCat today!"}
          </Text>

          <Box marginTop="xl">
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Email"
                  placeholder="Email"
                  value={value}
                  onChangeText={onChange}
                  variant={errors.email ? "error" : undefined}
                  message={
                    errors.email ? "This must be a valid email" : undefined
                  }
                />
              )}
              name="email"
              rules={{ required: true, pattern: emailRegexPattern }}
              defaultValue=""
            />
          </Box>

          <Box>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Password"
                  placeholder="Password"
                  value={value}
                  onChangeText={onChange}
                  variant={errors.password ? "error" : undefined}
                  secureTextEntry
                  message={
                    errors.password ? "This field is required" : undefined
                  }
                />
              )}
              name="password"
              rules={{ required: true }}
              defaultValue=""
            />
          </Box>

          <Box marginTop="xl">
            <Button
              onPress={handleSubmit(onSubmit)}
              loading={isLogin ? loginLoading : registerLoading}
            >
              {isLogin ? "Login" : "Sign Up"}
            </Button>
          </Box>
          <Box marginTop="xl">
            <HyperLink onPress={() => setIsLogin((p) => !p)}>
              {isLogin
                ? "New to PomoCat? Create an account"
                : "Already have an account? Login"}
            </HyperLink>
          </Box>
        </Box>
      </Box>

      <Image
        source={BottomBackground}
        style={{
          // height: 100,
          width: "100%",
          resizeMode: "cover",
        }}
      />
    </ScreenContainer>
  );
};

export default AuthScreen;
