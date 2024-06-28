import React from "react";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { AllRepeatDetails } from "../Repeat.types";

interface SelectDayCalendarProps {
  value: AllRepeatDetails
  onChange: (value: AllRepeatDetails) => void;
  maxDaysInMonth: number;
  disabled: boolean;
}
const sxMinWidth = { minWidth: 120 };

const SelectDayCalendar = ({
  value, onChange, maxDaysInMonth, disabled,
}: SelectDayCalendarProps) => (
  <FormControl fullWidth>
    <InputLabel
      id="select-day-cal-label"
      disabled={disabled}
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
    >
      {Array.from({ length: maxDaysInMonth }, (_, i) => i + 1).map((day) => (
        <MenuItem key={day} value={day}>{day}</MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default SelectDayCalendar;
