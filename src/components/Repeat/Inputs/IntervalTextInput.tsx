import React from "react";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { AllRepeatDetails } from "../Repeat.types";
import { safeParseInt } from "../utils";

type IntervalTextInputProps = {
  value: AllRepeatDetails;
  onChange: (value: AllRepeatDetails) => void;
  unit: string;
  pluralizeUnit?: boolean;
  inputSize: TextFieldProps["size"];
  inputVariant: TextFieldProps["variant"];
};

const IntervalTextInput = ({
  value,
  onChange,
  unit,
  pluralizeUnit,
  inputSize,
  inputVariant,
} : IntervalTextInputProps) => (
  <Stack direction="row" spacing={2} alignItems="center">
    <Typography fontSize={inputSize}>Every</Typography>
    <TextField
      id="outlined-basic"
      label=""
      type="number"
      value={value.interval}
      size={inputSize}
      variant={inputVariant}
      onChange={(e) => {
        const parsed = safeParseInt(e.target.value);
        if (parsed !== undefined) {
          onChange({ ...value, interval: parsed });
        }
      }}
    />
    <Typography fontSize={inputSize}>
      {`${unit}${pluralizeUnit ? "(s)" : ""}`}
    </Typography>
  </Stack>

);

export default IntervalTextInput;
