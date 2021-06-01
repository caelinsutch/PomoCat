import React from "react";
import Box from "../Box";
import { Tab } from "./Components";

type TabGroupOptions = {
  label: string;
  value: string;
};

type TabGroupProps = {
  onSelect: (value: string) => void;
  selected?: string;
  options: TabGroupOptions[];
  disabled?: boolean;
};

const TabGroup: React.FC<TabGroupProps> = ({
  options,
  onSelect,
  selected,
  disabled,
}) => (
  <Box flexDirection="row" justifyContent="space-between">
    {options.map(({ label, value }, i) => (
      <Tab
        isSelected={selected === value}
        onPress={() => onSelect(value)}
        key={value + i}
        disabled={disabled}
      >
        {label}
      </Tab>
    ))}
    <Box />
  </Box>
);

export default TabGroup;
