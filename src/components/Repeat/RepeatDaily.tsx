import React from "react";

import { AllRepeatDetails } from "./Repeat.types";
import IntervalTextInput from "./IntervalTextInput";

interface RepeatDailyProps {
  value: AllRepeatDetails;
  onChange: (value: AllRepeatDetails) => void;
}

const RepeatDaily = (
  { value, onChange }: RepeatDailyProps,
) => (
  <IntervalTextInput
    value={value}
    onChange={onChange}
    unit="day"
    pluralizeUnit
  />

);

export default RepeatDaily;
