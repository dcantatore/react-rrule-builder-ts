import React from "react";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {
  MonthlyRepeatDetails, RepeatDetails, YearlyRepeatDetails,
} from "../Repeat.types";

interface SelectDayCalendarProps {
  value: YearlyRepeatDetails | MonthlyRepeatDetails;
  onChange: (value: RepeatDetails) => void;
  maxDaysInMonth: number;
  disabled: boolean;
}
const sxMinWidth = { minWidth: 120 };

const SelectDayCalendar = ({
  value, onChange, maxDaysInMonth, disabled,
}: SelectDayCalendarProps) => (
  <Select
    sx={sxMinWidth}
    disabled={disabled}
    onChange={(e) => onChange({ ...value, byMonthDay: parseInt(e.target.value as string, 10) })}
    value={value.byMonthDay ?? -999}
  >
    <MenuItem key={null} value={-999} disabled>Select Day</MenuItem>
    {Array.from({ length: maxDaysInMonth }, (_, i) => i + 1).map((day) => (
      <MenuItem key={day} value={day}>{day}</MenuItem>
    ))}
  </Select>
);

export default SelectDayCalendar;
