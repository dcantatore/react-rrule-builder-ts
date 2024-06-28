import React from "react";

import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { AllRepeatDetails, Weekday } from "./Repeat.types";
import { weekdayShortTextMapping } from "./utils";
import IntervalTextInput from "./Inputs/IntervalTextInput";

interface RepeatWeeklyProps {
  value: AllRepeatDetails;
  onChange: (value: AllRepeatDetails) => void;
}

const RepeatWeekly = (
  {
    value,
    onChange,
  }: RepeatWeeklyProps,
) => (
  <Stack direction="column" spacing={2} alignItems="flex-start">
    <Stack direction="row" spacing={2} alignItems="center">
      <IntervalTextInput value={value} onChange={onChange} unit="week" pluralizeUnit />
    </Stack>
    <ButtonGroup variant="contained">
      {/* TODO - do this type/iteration better */}
      {Object.keys(Weekday).map((day) => {
        const dayKey = day as Weekday;
        return (
          <Button
            size="small"
            key={dayKey}
            color={value?.byDay?.includes(dayKey) ? "primary" : "inherit"}
            onClick={() => {
              let selectedDays = value?.byDay || [];
              if (value?.byDay?.includes(dayKey)) {
                selectedDays = value?.byDay.filter((d) => d !== dayKey);
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
