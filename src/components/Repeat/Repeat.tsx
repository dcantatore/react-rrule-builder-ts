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
import RepeatYearly from "./RepeatYearly";
import useBuilderStore from "../../store/builderStore";

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
  const { setRepeatDetails, repeatDetails } = useBuilderStore();
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
              value={repeatDetails}
              onChange={setRepeatDetails}
            />
          );
        case Frequency.DAILY:
          return (
            <RepeatDaily
              value={repeatDetails}
              onChange={setRepeatDetails}
            />
          );
        case Frequency.WEEKLY:
          return (
            <RepeatWeekly
              value={repeatDetails}
              onChange={setRepeatDetails}
            />
          );
        case Frequency.MONTHLY:
          return (
            <RepeatMonthly
              value={repeatDetails}
              onChange={setRepeatDetails}
            />
          );
        case Frequency.YEARLY:
          return (
            <RepeatYearly
              // @ts-ignore - this is due to never in the type
              value={repeatDetails}
              onChange={setRepeatDetails}
            />
          );
        default:
          return null;
      }
    },
    [frequencySelected, repeatDetails, setRepeatDetails],
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
