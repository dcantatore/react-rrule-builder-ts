import React from "react";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { AllRepeatDetails } from "./Repeat.types";
import { baseRepeatDetails } from "../../store/builderStore";

type IntervalTextInputProps = {
  value: AllRepeatDetails;
  onChange: (value: AllRepeatDetails) => void;
  unit: string;
  pluralizeUnit?: boolean;
};

const IntervalTextInput = ({
  value,
  onChange,
  unit,
  pluralizeUnit,
} : IntervalTextInputProps) => (
  <Stack direction="row" spacing={2} alignItems="center">
    <Typography>Every</Typography>
    <TextField
      id="outlined-basic"
      label=""
      variant="outlined"
      type="number"
      value={value.interval}
      onChange={(e) => onChange({ ...baseRepeatDetails, interval: parseInt(e.target.value, 10) })}
    />
    <Typography>
      {`${unit}${pluralizeUnit ? "(s)" : ""}`}
    </Typography>
  </Stack>

);

export default IntervalTextInput;
