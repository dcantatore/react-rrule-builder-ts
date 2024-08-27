import React, { useMemo } from "react";
import { Frequency } from "rrule";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { TextFieldProps } from "@mui/material/TextField";
import RepeatHourly from "./RepeatHourly";
import { frequencyTextMapping } from "./utils";
import RepeatWeekly from "./RepeatWeekly";
import RepeatMonthly from "./RepeatMonthly";
import RepeatDaily from "./RepeatDaily";
import RepeatYearly from "./RepeatYearly";
import useBuilderStore from "../../store/builderStore";
import { MonthBy, YearlyBy } from "./Repeat.types";

interface RepeatSelectProps {
  rruleFrequencyOptions? : Frequency[]
  onFrequencyChange: (frequency: Frequency) => void
  frequencySelected: Frequency
  enableYearlyInterval: boolean;
  inputSize: TextFieldProps["size"];
  inputVariant: TextFieldProps["variant"];
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
  frequencySelected,
  onFrequencyChange,
  enableYearlyInterval,
  inputSize,
  inputVariant,
}: RepeatSelectProps) => {
  const {
    setRepeatDetails, repeatDetails, radioValue, setRadioValue,
  } = useBuilderStore();
  const menuItems = rruleFrequencyOptions.map((option) => (
    <MenuItem key={option} value={option}>
      {frequencyTextMapping[option]}
    </MenuItem>
  ));

  const repeatComponentToRender = useMemo(
    () => {
      // type narrow the repeatDetails

      switch (frequencySelected) {
        case Frequency.HOURLY:
          return (
            <RepeatHourly
              value={repeatDetails}
              onChange={setRepeatDetails}
              inputSize={inputSize}
              inputVariant={inputVariant}
            />
          );
        case Frequency.DAILY:
          return (
            <RepeatDaily
              value={repeatDetails}
              onChange={setRepeatDetails}
              inputSize={inputSize}
              inputVariant={inputVariant}
            />
          );
        case Frequency.WEEKLY:
          return (
            <RepeatWeekly
              value={repeatDetails}
              onChange={setRepeatDetails}
              inputSize={inputSize}
              inputVariant={inputVariant}
            />
          );
        case Frequency.MONTHLY:
          return (
            <RepeatMonthly
              value={repeatDetails}
              onChange={setRepeatDetails}
              radioValue={radioValue as MonthBy}
              setRadioValue={setRadioValue}
              inputSize={inputSize}
              inputVariant={inputVariant}
            />
          );
        case Frequency.YEARLY:
          return (
            <RepeatYearly
              value={repeatDetails}
              onChange={setRepeatDetails}
              enableYearlyInterval={enableYearlyInterval}
              radioValue={radioValue as YearlyBy}
              setRadioValue={setRadioValue}
              inputSize={inputSize}
              inputVariant={inputVariant}
            />
          );
        default:
          return null;
      }
    },
    [enableYearlyInterval, frequencySelected, inputSize, inputVariant, radioValue, repeatDetails, setRadioValue, setRepeatDetails],
  );

  return (
    <Stack direction="column" spacing={2}>
      <Select
        value={frequencySelected}
        onChange={(e) => onFrequencyChange(e.target.value as Frequency)}
        fullWidth
        variant={inputVariant}
        size={inputSize}
      >
        {menuItems}
      </Select>
      {repeatComponentToRender}
    </Stack>

  );
};

export default RepeatSelect;
