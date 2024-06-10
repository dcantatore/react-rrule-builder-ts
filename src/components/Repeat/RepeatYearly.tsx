import React, { useState } from "react";

import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import Typography from "@mui/material/Typography";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {
  AllWeekDayOptions, YearlyRepeatDetails, OnThe, YearlyBy, Months, RepeatDetails,
} from "./Repeat.types";
import { monthShortTextMapping, onTheTextMapping, weekdayFullTextMapping } from "./utils";

interface RepeatYearlyProps {
  value: YearlyRepeatDetails;
  onChange: (value: RepeatDetails) => void;
}

const RepeatYearly = (
  { value, onChange }: RepeatYearlyProps,
) => {
  const [selectedMonth, setSelectedMonth] = useState<Months>(Months.JAN);
  const maxDaysInMonth = 31;
  const [onRadio, setOnRadio] = useState<YearlyBy>(YearlyBy.BYMONTH);
  const disabledOnBYSETPOS = onRadio === YearlyBy.BYMONTH;
  const disabledOnBYMONTH = onRadio === YearlyBy.BYSETPOS;
  console.log(value);
  return (
    <Stack direction="column" spacing={2} alignItems="flex-start">
      <RadioGroup name="Yearly" value={onRadio} onChange={(e) => setOnRadio(e.target.value as YearlyBy)}>
        <Stack direction="column" spacing={2} alignItems="flex-start">
          <Stack direction="row" spacing={4} alignItems="center">
            <Radio
              value={YearlyBy.BYMONTH}
              name="day"
            />
            <Typography sx={{ color: disabledOnBYMONTH ? "text.disabled" : "text.primary" }}>On</Typography>
            {/* month select TODO get names */}
            <Select sx={{ minWidth: 120 }} disabled={disabledOnBYMONTH}>
              {Object.values(Months).map((key) => (
                <MenuItem key={key} value={key}>{monthShortTextMapping[key]}</MenuItem>
              ))}
            </Select>
            <Select sx={{ minWidth: 120 }} disabled={disabledOnBYMONTH}>
              {Array.from({ length: maxDaysInMonth }, (_, i) => i + 1).map((day) => (
                <MenuItem key={day} value={day}>{day}</MenuItem>
              ))}
            </Select>
          </Stack>
          <Stack direction="row" spacing={4} alignItems="center">
            <Radio
              value={YearlyBy.BYSETPOS}
              name="day"
            />
            <Typography
              sx={{ color: disabledOnBYSETPOS ? "text.disabled" : "text.primary" }}
            >
              On The
            </Typography>
            <Select sx={{ minWidth: 120 }} disabled={disabledOnBYSETPOS}>
              {Object.keys(OnThe).map((key) => (
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
            <Typography sx={{ color: disabledOnBYSETPOS ? "text.disabled" : "text.primary" }}>of</Typography>
            <Select sx={{ minWidth: 120 }} disabled={disabledOnBYSETPOS}>
              {Object.values(Months).map((key) => (
                <MenuItem key={key} value={key}>{monthShortTextMapping[key]}</MenuItem>
              ))}
            </Select>
          </Stack>
        </Stack>
      </RadioGroup>
    </Stack>
  );
};
export default RepeatYearly;
