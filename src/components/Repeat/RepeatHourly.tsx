import React from "react";

import { TextFieldProps } from "@mui/material/TextField";
import { AllRepeatDetails } from "./Repeat.types";
import IntervalTextInput from "./Inputs/IntervalTextInput";

interface RepeatHourlyProps {
  value: AllRepeatDetails;
  onChange: (value: AllRepeatDetails) => void;
  inputSize: TextFieldProps["size"];
  inputVariant: TextFieldProps["variant"];

}

const RepeatHourly = (
  {
    value, onChange, inputSize, inputVariant,
  }: RepeatHourlyProps,
) => (
  <IntervalTextInput
    value={value}
    onChange={onChange}
    unit="hour"
    pluralizeUnit
    inputSize={inputSize}
    inputVariant={inputVariant}
  />

);

export default RepeatHourly;
