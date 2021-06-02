import React, { useState } from "react";
import { ImageBackground } from "react-native";

import { Box, Button, Icon, ScreenContainer, Text } from "../../Components";
import TabGroup from "../../Components/TabGroup";
import { homeScreenModeOptions } from "./HomeScreen.constants";
// @ts-ignore
import TopBackground from "../../../assets/TopBackground.png";
import TaskItem from "../../Components/TaskItem/TaskItem";
import { useHomeScreen } from "../../Hooks";
import { TimerType } from "../../GraphQL/types";
import { AddTaskModal } from "./Component";

const HomeScreen: React.FC = () => {
  const {
    handleButtonClick,
    timerRunning,
    timeLeft,
    data,
    stopTimer,
    handleTimerTypeChange,
    timerType,
  } = useHomeScreen();

  const [modalOpen, setModalOpen] = useState(false);

  if (!data?.user) {
    return <Box />;
  }

  return (
    <>
      <AddTaskModal setClose={() => setModalOpen(false)} open={modalOpen} />
      <ScreenContainer scroll>
        <ImageBackground
          source={TopBackground}
          style={{
            flex: 1,
            paddingTop: 70,
            paddingBottom: 70,
          }}
          imageStyle={{
            borderBottomLeftRadius: 48,
            borderBottomRightRadius: 48,
          }}
        >
          <Box flex={1} justifyContent="center" alignItems="center">
            <Box width="100%" paddingHorizontal="lg">
              <TabGroup
                onSelect={(v) => handleTimerTypeChange(v as TimerType)}
                selected={timerType}
                options={homeScreenModeOptions}
                disabled={timeLeft !== "00:00"}
              />
            </Box>
            <Text
              fontFamily="Inter_700Bold"
              fontSize={96}
              color="white"
              paddingTop="md"
            >
              {timeLeft}
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
                  onPress={handleButtonClick}
                  backgroundColor="accent500"
                  py="sm"
                  px="lg"
                  textProps={{
                    variant: "3xl",
                    fontFamily: "Inter_700Bold",
                  }}
                >
                  {timerRunning ? "Pause" : "Start"}
                </Button>
              </Box>
              <Box
                flex={1}
                alignItems="center"
                justifyContent="center"
                onTouchEnd={stopTimer}
              >
                <Icon name="Skip" size={48} color="white" />
              </Box>
            </Box>
          </Box>
        </ImageBackground>
        <Box flex={1} padding="xl" zIndex={-100}>
          <Text
            variant="md"
            color="brand"
            fontFamily="Inter_600SemiBold"
            marginBottom="md"
          >
            Tasks
          </Text>
          <Box>
            {data.user.tasks.length === 0 ? (
              <Text variant="sm" color="gray600">
                Finished with todays tasks!
              </Text>
            ) : (
              data.user.tasks
                .filter((a) => !a.isCompleted)
                .map((task) => <TaskItem {...task} />)
            )}
            <Box
              borderStyle="dashed"
              borderColor="gray400"
              borderWidth={2}
              borderRadius="sm"
              padding="md"
              onTouchEnd={() => setModalOpen(true)}
            >
              <Text color="gray400" variant="md" fontFamily="Inter_600SemiBold">
                Add Task
              </Text>
            </Box>
          </Box>
        </Box>
      </ScreenContainer>
    </>
  );
};

export default HomeScreen;
