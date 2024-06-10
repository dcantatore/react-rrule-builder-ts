import React, { useState } from "react";

import TextField from "@mui/material/TextField";

import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import Typography from "@mui/material/Typography";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  AllWeekDayOptions, MonthBy, MonthlyRepeatDetails, OnThe, RepeatDetails,
} from "./Repeat.types";
import { onTheTextMapping, weekdayFullTextMapping } from "./utils";

interface RepeatMonthlyProps {
  value?: MonthlyRepeatDetails;
  onChange: (value: RepeatDetails) => void;
}

const RepeatMonthly = (
  {
    value,
    onChange,
  }: RepeatMonthlyProps,
) => {
  // TODO  get the days in the month max with luxon? or just use 31 - I think RRULE will handle this
  const maxDaysInMonth = 31;
  const [onRadio, setOnRadio] = useState<MonthBy>(MonthBy.BYMONTHDAY);
  const disabledOnBYSETPOS = onRadio === MonthBy.BYMONTHDAY;
  const disabledOnBYMONTHDAY = onRadio === MonthBy.BYSETPOS;

  // TODO GET THIS FROM MAIN COMPONENT - this is just a placeholder
  const size = 0;

  return (
    <Stack direction="column" spacing={2} alignItems="flex-start" width="100%">
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography>Every</Typography>
        <TextField
          id="outlined-basic"
          label=""
          variant="outlined"
          type="number"
          value={value?.interval}
          onChange={(e) => onChange({ interval: parseInt(e.target.value, 10) })}
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
          <Stack direction={size < 301 ? "column" : "row"} spacing={4} alignItems={size < 301 ? "" : "center"} sx={{ width: "100%" }}>
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
                width: size < 301 ? "100%" : "auto",
              }}
            >
              <Select
                disabled={disabledOnBYSETPOS}
                fullWidth
              >
                {Object.keys(OnThe).map((key) => (
                  <MenuItem key={key} value={OnThe[key as keyof typeof OnThe]}>
                    {onTheTextMapping[OnThe[key as keyof typeof OnThe]]}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box sx={{ minWidth: 120, marginX: { xs: 0, sm: 2 }, width: size < 301 ? "100%" : "auto" }}>
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
