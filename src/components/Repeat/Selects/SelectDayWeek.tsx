import React, { useState } from "react";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {
  AllWeekDayOptions, RepeatDetails, Weekday,
} from "../Repeat.types";
import { weekdayFullTextMapping } from "../utils";

interface SelectDayWeekProps {
  value: RepeatDetails;
  onChange: (value: RepeatDetails) => void;
  disabled: boolean;
}
const sxMinWidth = { minWidth: 120 };

const SelectDayWeek = ({ value, onChange, disabled }: SelectDayWeekProps) => {
  const [selectedByDay, setSelectedByDay] = useState<typeof AllWeekDayOptions | undefined>(undefined);
  return (
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
        setSelectedByDay(e.target.value as typeof AllWeekDayOptions);
      }}
      value={selectedByDay ?? -999}
    >
      <MenuItem key={null} value={-999} disabled>Select Day</MenuItem>
      {Object.keys(AllWeekDayOptions).map((key) => (
        <MenuItem key={key} value={key}>{weekdayFullTextMapping[key as keyof typeof AllWeekDayOptions]}</MenuItem>
      ))}
    </Select>
  );
};

export default SelectDayWeek;
