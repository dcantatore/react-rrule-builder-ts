import React from "react";

import { TextFieldProps } from "@mui/material/TextField";
import { AllRepeatDetails } from "./Repeat.types";
import IntervalTextInput from "./Inputs/IntervalTextInput";

interface RepeatDailyProps {
  value: AllRepeatDetails;
  onChange: (value: AllRepeatDetails) => void;
  inputSize: TextFieldProps["size"];
  inputVariant: TextFieldProps["variant"];
}

const RepeatDaily = (
  {
    value, onChange, inputSize, inputVariant,
  }: RepeatDailyProps,
) => (
  <IntervalTextInput
    value={value}
    onChange={onChange}
    unit="day"
    pluralizeUnit
    inputSize={inputSize}
    inputVariant={inputVariant}
  />

);

export default RepeatDaily;
