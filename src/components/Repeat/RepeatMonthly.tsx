import React, { useState } from "react";

import TextField from "@mui/material/TextField";
import { Frequency } from "rrule";

import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import Typography from "@mui/material/Typography";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
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
    <Stack direction="column" spacing={2} alignItems="flex-start" width="100%">
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
      <RadioGroup
        name="monthly"
        value={onRadio}
        onChange={(e) => setOnRadio(e.target.value as MonthBy)}
        sx={{ width: "100%" }}
      >
        <Stack direction="column" spacing={2} alignItems="flex-start" width="100%">
          {/* ON DAY SECTION */}
          <Box display="inline-flex" alignItems="center">
            <FormControlLabel
              value={MonthBy.BYMONTHDAY}
              control={<Radio />}
              label={(
                <Typography
                  sx={{ color: disabledOnBYMONTHDAY ? "text.disabled" : "text.primary", paddingLeft: 2 }}
                >
                  On Day
                </Typography>
              )}
              sx={{ minWidth: 120, marginRight: 2 }}
            />
            <Select sx={{ minWidth: 120 }} disabled={disabledOnBYMONTHDAY}>
              {Array.from({ length: maxDaysInMonth }, (_, i) => i + 1).map((day) => (
                <MenuItem key={day} value={day}>{day}</MenuItem>
              ))}
            </Select>
          </Box>
          {/* ON THE SECTION */}
          <Stack direction="row" spacing={4} alignItems="center">
            <Box sx={{ minWidth: 120, marginRight: 2 }}>
              <FormControlLabel
                value={MonthBy.BYSETPOS}
                control={<Radio />}
                label={(
                  <Typography
                    sx={{ color: disabledOnBYSETPOS ? "text.disabled" : "text.primary", paddingLeft: 2 }}
                  >
                    On The
                  </Typography>
                )}
              />
            </Box>
            <Box
              sx={{
                minWidth: 120,
                marginX: { xs: 0, sm: 2 },
                marginY: { xs: 2, sm: 0 },
                width:
              { xs: "100%", sm: "auto" },
              }}
            >
              <Select
                disabled={disabledOnBYSETPOS}
                fullWidth
              >
                {enumEntries.map((key) => (
                  <MenuItem key={key} value={OnThe[key as keyof typeof OnThe]}>
                    {onTheTextMapping[OnThe[key as keyof typeof OnThe]]}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box sx={{ minWidth: 120, marginX: { xs: 0, sm: 2, width: { xs: "100%", sm: "auto" } } }}>
              <Select disabled={disabledOnBYSETPOS} fullWidth>
                {Object.keys(AllWeekDayOptions).map((key) => (
                  <MenuItem key={key} value={key}>{weekdayFullTextMapping[key as keyof typeof AllWeekDayOptions]}</MenuItem>
                ))}
              </Select>
            </Box>
          </Stack>
        </Stack>
      </RadioGroup>

    </Stack>
  );
};
export default RepeatMonthly;
