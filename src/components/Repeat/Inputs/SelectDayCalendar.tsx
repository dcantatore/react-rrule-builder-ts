import React from "react";

import Select, { SelectProps } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { AllRepeatDetails } from "../Repeat.types";
import { getLabelSize } from "../utils";

interface SelectDayCalendarProps {
  value: AllRepeatDetails
  onChange: (value: AllRepeatDetails) => void;
  maxDaysInMonth: number;
  disabled: boolean;
  inputSize: SelectProps["size"];
  inputVariant: SelectProps["variant"];
}
const sxMinWidth = { minWidth: 120 };

const SelectDayCalendar = ({
  value, onChange, maxDaysInMonth, disabled, inputSize, inputVariant,
}: SelectDayCalendarProps) => {
  const labelSize = getLabelSize(inputSize);

  return (
    <FormControl fullWidth>
      <InputLabel
        id="select-day-cal-label"
        disabled={disabled}
        size={labelSize}
      >
        Select Day
      </InputLabel>
      <Select
        sx={sxMinWidth}
        disabled={disabled}
        onChange={(e) => onChange({ ...value, byMonthDay: [parseInt(e.target.value as string, 10)] })}
        value={value.byMonthDay}
        labelId="select-day-cal-label"
        label="Select Day"
        size={inputSize}
        variant={inputVariant}
      >
        {Array.from({ length: maxDaysInMonth }, (_, i) => i + 1).map((day) => (
          <MenuItem key={day} value={day}>{day}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectDayCalendar;
