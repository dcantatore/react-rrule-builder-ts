import React, { useState } from "react";

import TextField from "@mui/material/TextField";
import { Frequency } from "rrule";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { Weekday, WeeklyRepeatDetails } from "./Repeat.types";
import { weekdayShortTextMapping } from "./utils";

interface RepeatHourlyProps {
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
  }: RepeatHourlyProps,
) => {
  const [selectedDays, setSelectedDays] = useState<Weekday[]>(defaultValue.byDay ?? []);
  return (
    <>
      <TextField
        id="outlined-basic"
        label="Repeat every"
        variant="outlined"
        type="number"
        defaultValue={defaultValue}
        onChange={(e) => console.log(e.target.value)}
      />
      <ButtonGroup variant="contained" sx={{ boxShadow: 0 }}>
        {/* TODO - do this type/iteration better */}
        {Object.keys(Weekday).map((day) => {
          const dayKey = day as Weekday;
          return (
            <Button
              key={dayKey}
            // TODO MAKE A BETTER COLOR SCHEME
              color={selectedDays.includes(dayKey) ? "primary" : "warning"}
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
    </>
  );
};
export default RepeatWeekly;
