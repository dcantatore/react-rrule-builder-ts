import React, { useMemo } from "react";
import { Frequency } from "rrule";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import RepeatHourly from "./RepeatHourly";
import { frequencyTextMapping } from "./utils";
import RepeatWeekly from "./RepeatWeekly";
import RepeatMonthly from "./RepeatMonthly";
import RepeatDaily from "./RepeatDaily";

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
              defaultValue={{
                frequency: Frequency.HOURLY,
                interval: 1,
              }}
              onChange={(value) => console.log(value)}
            />
          );
        case Frequency.DAILY:
          return (
            <RepeatDaily
              defaultValue={{
                frequency: Frequency.DAILY,
                interval: 1,
              }}
              onChange={(value) => console.log(value)}
            />
          );
        case Frequency.WEEKLY:
          return (
            <RepeatWeekly
              defaultValue={{
                frequency: Frequency.WEEKLY,
                interval: 1,
                byDay: [],
              }}
              onChange={(value) => console.log(value)}
            />
          );
        case Frequency.MONTHLY:
          return (
            <RepeatMonthly
              defaultValue={{
                frequency: Frequency.MONTHLY,
                interval: 1,
                byDay: [],
                bySetPos: [],
                byMonthDay: [],
              }}
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
