import React from "react";

import TextField from "@mui/material/TextField";
import { Frequency } from "rrule";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { DailyRepeatDetails } from "./Repeat.types";

interface RepeatDailyProps {
  defaultValue?: DailyRepeatDetails;
  onChange: (value: number) => void;
}

const RepeatDaily = (
  { defaultValue = { interval: 1, frequency: Frequency.DAILY }, onChange }: RepeatDailyProps,
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
    <Typography>day(s)</Typography>
  </Stack>

);

export default RepeatDaily;
