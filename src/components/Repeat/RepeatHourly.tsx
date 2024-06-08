import React from "react";

import TextField from "@mui/material/TextField";

interface RepeatHourlyProps {
  defaultValue?: number;
  onChange: (value: number) => void;
}

const RepeatHourly = (
  { defaultValue = 1, onChange }: RepeatHourlyProps,
) => (
  <TextField
    id="outlined-basic"
    label="Repeat every"
    variant="outlined"
    type="number"
    defaultValue={defaultValue}
    onChange={(e) => onChange(parseInt(e.target.value, 10))}
  />
);

export default RepeatHourly;
