import React from "react";

import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { RepeatDetails } from "./Repeat.types";

interface RepeatDailyProps {
  value?: RepeatDetails;
  onChange: (value: RepeatDetails) => void;
}

const RepeatDaily = (
  { value, onChange }: RepeatDailyProps,
) => (
  <Stack direction="row" spacing={2} alignItems="center">
    <Typography>Every</Typography>
    <TextField
      id="outlined-basic"
      label=""
      variant="outlined"
      type="number"
      defaultValue={value?.interval}
      onChange={(e) => onChange({ interval: parseInt(e.target.value, 10) })}
    />
    <Typography>day(s)</Typography>
  </Stack>

);

export default RepeatDaily;
