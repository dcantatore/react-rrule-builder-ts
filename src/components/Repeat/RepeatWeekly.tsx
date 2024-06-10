import React from "react";

import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import { Weekday, WeeklyRepeatDetails } from "./Repeat.types";
import { weekdayShortTextMapping } from "./utils";

interface RepeatWeeklyProps {
  value: WeeklyRepeatDetails;
  onChange: (value: WeeklyRepeatDetails) => void;
}

const RepeatWeekly = (
  {
    value,
    onChange,
  }: RepeatWeeklyProps,
) => (
  <Stack direction="column" spacing={2} alignItems="flex-start">
    <Stack direction="row" spacing={2} alignItems="center">
      <Typography>Every</Typography>
      <TextField
        id="outlined-basic"
        label=""
        variant="outlined"
        type="number"
        defaultValue={value?.interval}
        onChange={(e) => onChange({ ...value, interval: parseInt(e.target.value, 10) })}
      />
      <Typography>week(s)</Typography>
    </Stack>
    <ButtonGroup variant="contained">
      {/* TODO - do this type/iteration better */}
      {Object.keys(Weekday).map((day) => {
        const dayKey = day as Weekday;
        return (
          <Button
            size="small"
            key={dayKey}
            // TODO MAKE A BETTER COLOR SCHEME?
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
