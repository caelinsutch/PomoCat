import React from "react";
import { Pressable } from "react-native";
import { Box, Text } from "..";
import { Task } from "../../GraphQL/types";

type TaskItemProps = Pick<Task, "name" | "numPomos" | "completedPomos">;

const TaskItem: React.FC<TaskItemProps> = ({
  name,
  numPomos,
  completedPomos,
}) => (
  <Box
    borderColor="gray200"
    backgroundColor="white"
    borderWidth={1}
    borderRadius="xs"
    justifyContent="space-between"
    flexDirection="row"
    padding="sm"
  >
    <Box>
      <Text variant="md" fontFamily="Inter_600SemiBold">
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

export default TaskItem;
