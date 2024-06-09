import React from "react";

import TextField from "@mui/material/TextField";
import { Frequency } from "rrule";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { HourlyRepeatDetails } from "./Repeat.types";

interface RepeatHourlyProps {
  defaultValue?: HourlyRepeatDetails;
  onChange: (value: number) => void;
}

const RepeatHourly = (
  { defaultValue = { interval: 1, frequency: Frequency.HOURLY }, onChange }: RepeatHourlyProps,
) => (
  <Stack direction="row" spacing={2} alignItems="center">
    <Typography>Every</Typography>
    <TextField
      id="outlined-basic"
      label=""
      variant="outlined"
      type="number"
      defaultValue={defaultValue?.interval}
      onChange={(e) => console.log(e.target.value)}
    />
    <Typography>hours(s)</Typography>
  </Stack>

);

export default RepeatHourly;
