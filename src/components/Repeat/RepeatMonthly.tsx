import React, { useState } from "react";

import TextField from "@mui/material/TextField";
import { Frequency } from "rrule";

import Stack from "@mui/material/Stack";
import { Radio, RadioGroup, Typography } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { AllWeekDayOptions, MonthlyRepeatDetails, OnThe } from "./Repeat.types";
import { onTheTextMapping, weekdayFullTextMapping } from "./utils";

interface RepeatMonthlyProps {
  defaultValue?: MonthlyRepeatDetails;
  onChange: (value: MonthlyRepeatDetails) => void;
}

enum MonthBy {
  BYMONTHDAY = "BYMONTHDAY",
  BYSETPOS = "BYSETPOS",
}

const enumEntries = Object.keys(OnThe).filter((key) => Number.isNaN(Number(key)));

const RepeatMonthly = (
  {
    defaultValue = {
      frequency: Frequency.MONTHLY,
      interval: 1,
      byDay: [],
      bySetPos: [],
      byMonthDay: [],
    },
    onChange,
  }: RepeatMonthlyProps,
) => {
  // ODO  get the days in the month max with luxon? or just use 31 - I think RRULE will handle this
  const maxDaysInMonth = 31;
  const [onRadio, setOnRadio] = useState<MonthBy>(MonthBy.BYMONTHDAY);
  console.log(Object.entries(OnThe));
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
        <Typography>month(s)</Typography>

      </Stack>
      <RadioGroup name="monthly" value={onRadio} onChange={(e) => setOnRadio(e.target.value as MonthBy)}>
        <Stack direction="column" spacing={2} alignItems="flex-start">
          <Stack direction="row" spacing={4} alignItems="center">
            <Radio
              value={MonthBy.BYMONTHDAY}
              name="day"
            />
            <Typography>On Day</Typography>
            <Select sx={{ minWidth: 120 }}>
              {Array.from({ length: maxDaysInMonth }, (_, i) => i + 1).map((day) => (
                <MenuItem key={day} value={day}>{day}</MenuItem>
              ))}
            </Select>
          </Stack>
          <Stack direction="row" spacing={4} alignItems="center">
            <Radio
              value={MonthBy.BYSETPOS}
              name="day"
            />
            <Typography>On The</Typography>
            <Select sx={{ minWidth: 120 }}>
              {enumEntries.map((key) => (
                <MenuItem key={key} value={OnThe[key as keyof typeof OnThe]}>
                  {onTheTextMapping[OnThe[key as keyof typeof OnThe]]}
                </MenuItem>
              ))}
            </Select>
            <Select sx={{ minWidth: 120 }}>
              {Object.keys(AllWeekDayOptions).map((key) => (
                <MenuItem key={key} value={key}>{weekdayFullTextMapping[key as keyof typeof AllWeekDayOptions]}</MenuItem>
              ))}
            </Select>

          </Stack>
        </Stack>
      </RadioGroup>

    </Stack>
  );
};
export default RepeatMonthly;
