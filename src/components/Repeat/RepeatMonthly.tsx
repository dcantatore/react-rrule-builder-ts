import React, { useState } from "react";

import TextField from "@mui/material/TextField";
import { Frequency } from "rrule";

import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import Typography from "@mui/material/Typography";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {
  AllWeekDayOptions, MonthBy, MonthlyRepeatDetails, OnThe,
} from "./Repeat.types";
import { onTheTextMapping, weekdayFullTextMapping } from "./utils";

interface RepeatMonthlyProps {
  defaultValue?: MonthlyRepeatDetails;
  onChange: (value: MonthlyRepeatDetails) => void;
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
  const disabledOnBYSETPOS = onRadio === MonthBy.BYMONTHDAY;
  const disabledOnBYMONTHDAY = onRadio === MonthBy.BYSETPOS;
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
            <Typography sx={{ color: disabledOnBYMONTHDAY ? "text.disabled" : "text.primary" }}>On Day</Typography>
            <Select sx={{ minWidth: 120 }} disabled={disabledOnBYMONTHDAY}>
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
            <Typography sx={{ color: disabledOnBYSETPOS ? "text.disabled" : "text.primary" }}>On The</Typography>
            <Select sx={{ minWidth: 120 }} disabled={disabledOnBYSETPOS}>
              {enumEntries.map((key) => (
                <MenuItem key={key} value={OnThe[key as keyof typeof OnThe]}>
                  {onTheTextMapping[OnThe[key as keyof typeof OnThe]]}
                </MenuItem>
              ))}
            </Select>
            <Select sx={{ minWidth: 120 }} disabled={disabledOnBYSETPOS}>
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
