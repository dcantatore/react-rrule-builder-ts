import React from "react";

import { AllRepeatDetails } from "./Repeat.types";
import IntervalTextInput from "./Inputs/IntervalTextInput";

interface RepeatHourlyProps {
  value: AllRepeatDetails;
  onChange: (value: AllRepeatDetails) => void;
}

const RepeatHourly = (
  { value, onChange }: RepeatHourlyProps,
) => (
  <IntervalTextInput
    value={value}
    onChange={onChange}
    unit="hour"
    pluralizeUnit
  />

);

export default RepeatHourly;
