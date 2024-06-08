import React, { useMemo } from "react";
import { Frequency } from "rrule";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import RepeatHourly from "./RepeatHourly";

interface RepeatSelectProps {
  rruleFrequencyOptions? : Frequency[]
  onFrequencyChange: (frequency: Frequency) => void
  frequencySelected: Frequency
}

const defaultFrequencyOptions: Frequency[] = [
  Frequency.YEARLY,
  Frequency.MONTHLY,
  Frequency.WEEKLY,
  Frequency.DAILY,
  Frequency.HOURLY,
];

// TODO does RRULE have a built-in mapping for this?
const frequencyTextMapping = {
  [Frequency.YEARLY]: "Yearly",
  [Frequency.MONTHLY]: "Monthly",
  [Frequency.WEEKLY]: "Weekly",
  [Frequency.DAILY]: "Daily",
  [Frequency.HOURLY]: "Hourly",
  [Frequency.MINUTELY]: "Minutely",
  [Frequency.SECONDLY]: "Secondly",
};

// TODO what structure should the repeat component take for varrying repeat options?
//   such as hourly vs yearly
const RepeatSelect = ({
  rruleFrequencyOptions = defaultFrequencyOptions,
  frequencySelected, onFrequencyChange,
}: RepeatSelectProps) => {
  const menuItems = rruleFrequencyOptions.map((option) => (
    <MenuItem key={option} value={option}>
      {frequencyTextMapping[option]}
    </MenuItem>
  ));

  const repeatComponentToRender = useMemo(
    () => {
      switch (frequencySelected) {
        case Frequency.HOURLY:
          return (
            <RepeatHourly
              defaultValue={1}
              onChange={(value) => console.log(value)}
            />
          );
        default:
          return null;
      }
    },
    [frequencySelected],
  );

  return (
    <Stack direction="column" spacing={2}>
      <Select
        value={frequencySelected}
        onChange={(e) => onFrequencyChange(e.target.value as Frequency)}
        fullWidth
      >
        {menuItems}
      </Select>
      {repeatComponentToRender}
    </Stack>

  );
};

export default RepeatSelect;
