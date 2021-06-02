import React from "react";
import { Text, ScreenContainer, Box } from "../../Components";

const AnalyticsScreen: React.FC = () => (
  <ScreenContainer>
    <Box padding="xxl" flex={1}>
      <Box
        backgroundColor="red500"
        padding="md"
        borderRadius="md"
        marginTop="xl"
      >
        <Text variant="lg" color="white">
          Analytics Coming Soon
        </Text>
      </Box>
    </Box>
  </ScreenContainer>
);

export default AnalyticsScreen;
