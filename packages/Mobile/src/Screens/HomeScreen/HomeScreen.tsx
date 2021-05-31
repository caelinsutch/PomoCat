import React, { useState } from "react";
import { ImageBackground } from "react-native";
import { Box, Button, Icon, ScreenContainer, Text } from "../../Components";
import TabGroup from "../../Components/TabGroup";
import { HomeScreenMode, homeScreenModeOptions } from "./HomeScreen.constants";
// @ts-ignore
import TopBackground from "../../../assets/TopBackground.png";
import TaskItem from "../../Components/TaskItem/TaskItem";

const HomeScreen: React.FC = () => {
  const [mode, setMode] = useState<HomeScreenMode>(HomeScreenMode.Pomodoro);

  return (
    <ScreenContainer>
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
          <Box width="100%" paddingHorizontal="lg">
            <TabGroup
              onSelect={(v) => setMode(v as HomeScreenMode)}
              selected={mode}
              options={homeScreenModeOptions}
            />
          </Box>
          <Text
            fontFamily="Inter_700Bold"
            fontSize={96}
            color="white"
            paddingTop="md"
          >
            12:34
          </Text>
          <Text variant="sm" color="gray50">
            Design mobile screens
          </Text>
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            alignContent="center"
            marginTop="lg"
          >
            <Box flex={1} />
            <Box flex={1} alignItems="center" justifyContent="center">
              <Button
                onPress={() => console.log("start")}
                backgroundColor="accent500"
                py="sm"
                px="lg"
                textProps={{
                  variant: "3xl",
                  fontFamily: "Inter_700Bold",
                }}
              >
                Start
              </Button>
            </Box>
            <Box flex={1} alignItems="center" justifyContent="center">
              <Icon name="Skip" size={48} color="white" />
            </Box>
          </Box>
        </Box>
      </ImageBackground>
      <Box flex={1} padding="xl">
        <Text
          variant="md"
          color="brand"
          fontFamily="Inter_600SemiBold"
          marginBottom="md"
        >
          Tasks
        </Text>
        <Box>
          <TaskItem name="Task 1" numPomos={1} completedPomos={0} />
        </Box>
      </Box>
    </ScreenContainer>
  );
};

export default HomeScreen;
