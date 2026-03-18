import React from "react";

import Box from "@mui/material/Box";
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
  enableResponsiveLayout: boolean;
}

const weekdays = Object.keys(Weekday) as Weekday[];
const weekdayKeys = weekdays.filter((d) => d !== Weekday.SA && d !== Weekday.SU);

const renderDayButton = (
  dayKey: Weekday,
  value: AllRepeatDetails,
  onChange: (value: AllRepeatDetails) => void,
) => {
  const isSelected = value.byDay.includes(dayKey);
  return (
    <Button
      variant="contained"
      size="small"
      key={dayKey}
      color={isSelected ? "primary" : "inherit"}
      aria-pressed={isSelected}
      aria-label={weekdayFullTextMapping[dayKey]}
      sx={{ flex: 1, minWidth: 48 }}
      onClick={() => {
        const selectedDays = value.byDay.includes(dayKey)
          ? value.byDay.filter((d) => d !== dayKey)
          : [...value.byDay, dayKey];
        onChange({ ...value, byDay: selectedDays });
      }}
    >
      {weekdayShortTextMapping[dayKey]}
    </Button>
  );
};

const RepeatWeekly = ({
  value,
  onChange,
  inputSize,
  inputVariant,
  enableResponsiveLayout,
}: RepeatWeeklyProps) => (
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
    <Box
      role="group"
      aria-label="Select days of the week"
      sx={{
        display: "flex", flexWrap: enableResponsiveLayout ? "wrap" : "nowrap", gap: 0.5, width: "100%",
      }}
    >
      <Box key="weekdays" sx={{ display: "flex", gap: 0.5, flex: 5 }}>
        {weekdayKeys.map((d) => renderDayButton(d, value, onChange))}
      </Box>
      <Box key="weekend" sx={{ display: "flex", gap: 0.5, flex: 2 }}>
        {renderDayButton(Weekday.SA, value, onChange)}
        {renderDayButton(Weekday.SU, value, onChange)}
      </Box>
    </Box>
  </Stack>
);
export default RepeatWeekly;
