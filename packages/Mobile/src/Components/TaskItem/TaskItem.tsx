import React, { useState } from "react";
import { Box, Icon, Text } from "..";
import { Task } from "../../GraphQL/types";
import useCompleteTask from "../../Hooks/useCompleteTask";

type TaskItemProps = Pick<
  Task,
  "name" | "numPomos" | "completedPomos" | "createdAt"
>;

const TaskItem: React.FC<TaskItemProps> = ({
  name,
  numPomos,
  completedPomos,
  createdAt,
}) => {
  const { completeTask } = useCompleteTask();
  const [complete, setComplete] = useState(false);

  const handlePress = async () => {
    setComplete(true);
    await completeTask(name, createdAt);
  };

  return (
    <Box
      borderColor="gray200"
      backgroundColor="white"
      borderWidth={1}
      borderRadius="xs"
      justifyContent="space-between"
      flexDirection="row"
      padding="md"
      marginBottom="sm"
      onTouchEnd={handlePress}
    >
      <Box flexDirection="row">
        <Icon
          name="CheckRound"
          color={complete ? "primary500" : "gray200"}
          size={24}
        />

        <Text marginLeft="sm" variant="md" fontFamily="Inter_600SemiBold">
          {name}
        </Text>
      </Box>
      <Box>
        <Text color="gray400" variant="md">
          {completedPomos} / {numPomos}
        </Text>
      </Box>
    </Box>
  );
};

export default TaskItem;
