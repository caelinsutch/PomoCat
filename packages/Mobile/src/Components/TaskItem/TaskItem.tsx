import React, { useState } from "react";
import { Box, Icon, Text } from "..";
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
    padding="md"
    marginBottom="sm"
  >
    <Box flexDirection="row">
      <Icon name="CheckRound" color="gray200" size={24} />

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

export default TaskItem;
