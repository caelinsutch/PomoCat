import React, { useState } from "react";
import { ImageBackground, Image } from "react-native";
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

const AuthScreen: React.FC = () => {
  const [isLogin, setIsLogin] = useState(false);

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
            <Input label="Email" placeholder="Email" />
          </Box>
          <Box marginTop="xl">
            <Input label="Password" placeholder="Password" />
          </Box>
          <Box marginTop="xl">
            <Button onPress={() => console.log("Login")}>
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
