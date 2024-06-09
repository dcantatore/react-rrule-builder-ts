import React, { useState } from "react";

import TextField from "@mui/material/TextField";
import { Frequency } from "rrule";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import { Weekday, WeeklyRepeatDetails } from "./Repeat.types";
import { weekdayShortTextMapping } from "./utils";

interface RepeatWeeklyProps {
  defaultValue?: WeeklyRepeatDetails;
  onChange: (value: WeeklyRepeatDetails) => void;
}

const RepeatWeekly = (
  {
    defaultValue = {
      frequency: Frequency.WEEKLY,
      interval: 1,
      byDay: [],
    },
    onChange,
  }: RepeatWeeklyProps,
) => {
  const [selectedDays, setSelectedDays] = useState<Weekday[]>(defaultValue.byDay ?? []);
  return (
    <Stack direction="column" spacing={2} alignItems="flex-start">
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography>Every</Typography>
        <TextField
          id="outlined-basic"
          label=""
          variant="outlined"
          type="number"
          defaultValue={defaultValue}
          onChange={(e) => console.log(e.target.value)}
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
              color={selectedDays.includes(dayKey) ? "primary" : "inherit"}
              onClick={() => {
                if (selectedDays.includes(dayKey)) {
                  setSelectedDays(selectedDays.filter((d) => d !== dayKey));
                } else {
                  setSelectedDays([...selectedDays, dayKey]);
                }
                onChange({
                  ...defaultValue,
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
};
export default RepeatWeekly;
