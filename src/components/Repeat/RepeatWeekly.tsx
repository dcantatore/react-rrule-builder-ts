import React from "react";

import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { TextFieldProps } from "@mui/material/TextField";
import { AllRepeatDetails, Weekday } from "./Repeat.types";
import { weekdayFullTextMapping, weekdayShortTextMapping } from "./utils";
import IntervalTextInput from "./Inputs/IntervalTextInput";

interface RepeatWeeklyProps {
  value: AllRepeatDetails;
  onChange: (value: AllRepeatDetails) => void;
  inputSize: TextFieldProps["size"];
  inputVariant: TextFieldProps["variant"];
}

const RepeatWeekly = (
  {
    value,
    onChange,
    inputSize,
    inputVariant,
  }: RepeatWeeklyProps,
) => (
  <Stack direction="column" spacing={2} alignItems="flex-start">
    <Stack direction="row" spacing={2} alignItems="center">
      <IntervalTextInput
        value={value}
        onChange={onChange}
        unit="week"
        pluralizeUnit
        inputSize={inputSize}
        inputVariant={inputVariant}
      />
    </Stack>
    <ButtonGroup variant="contained" role="group" aria-label="Select days of the week">
      {Object.keys(Weekday).map((day) => {
        const dayKey = day as Weekday;
        const isSelected = value.byDay.includes(dayKey);
        return (
          <Button
            size="small"
            key={dayKey}
            color={isSelected ? "primary" : "inherit"}
            aria-pressed={isSelected}
            aria-label={weekdayFullTextMapping[dayKey]}
            onClick={() => {
              let selectedDays = value.byDay;
              if (value.byDay.includes(dayKey)) {
                selectedDays = value.byDay.filter((d) => d !== dayKey);
              } else {
                selectedDays = [...selectedDays, dayKey];
              }
              onChange({
                ...value,
                byDay: selectedDays,
              });
            }}
          >
            {weekdayShortTextMapping[dayKey]}
          </Button>
        );
      })}

    </ButtonGroup>
  </Stack>
);
export default RepeatWeekly;
