import React, { useState } from "react";
import { ImageBackground, Image } from "react-native";
import { Controller, useForm } from "react-hook-form";
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

const AuthScreen: React.FC = () => {
  const [isLogin, setIsLogin] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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

          <Box marginTop="xl">
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
            <Button onPress={handleSubmit(onSubmit)}>
              {isLogin ? "Login" : "Signup"}
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
