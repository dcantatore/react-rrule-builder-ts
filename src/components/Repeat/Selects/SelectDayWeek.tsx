import React from "react";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import {
  AllRepeatDetails,
  AllWeekDayOptions,
  Weekday,
} from "../Repeat.types";
import { weekdayFullTextMapping } from "../utils";

interface SelectDayWeekProps {
  value: AllRepeatDetails;
  onChange: (value: AllRepeatDetails) => void;
  disabled: boolean;
}
const sxMinWidth = { minWidth: 120 };

const SelectDayWeek = ({ value, onChange, disabled }: SelectDayWeekProps) => (
  <FormControl fullWidth>
    <InputLabel
      id="select-day-label"
      disabled={disabled}
    >
      Select Day
    </InputLabel>
    <Select
      sx={sxMinWidth}
      disabled={disabled}
      onChange={(e) => {
        let setVal = [e.target.value as Weekday];
        if (e.target.value === AllWeekDayOptions.DAY) {
          // this means all days in the array
          setVal = [Weekday.SU, Weekday.MO, Weekday.TU, Weekday.WE, Weekday.TH, Weekday.FR, Weekday.SA];
        } else if (e.target.value === AllWeekDayOptions.WEEKDAY) {
          // this means all weekdays in the array
          setVal = [Weekday.MO, Weekday.TU, Weekday.WE, Weekday.TH, Weekday.FR];
        } else if (e.target.value === AllWeekDayOptions.WEEKEND) {
          // this means all weekends in the array
          setVal = [Weekday.SA, Weekday.SU];
        }
        onChange({ ...value, byDay: setVal as Weekday[] });
      }}
      value={value.byDay}
      labelId="select-day-label"
      label="Select Day"
    >
      {Object.keys(AllWeekDayOptions).map((key) => (
        <MenuItem key={key} value={key}>{weekdayFullTextMapping[key as keyof typeof AllWeekDayOptions]}</MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default SelectDayWeek;
