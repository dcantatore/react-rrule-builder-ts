import React, { useCallback, useEffect, useState } from "react";

import Select, { SelectChangeEvent } from "@mui/material/Select";
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

const SelectDayWeek = ({ value, onChange, disabled }: SelectDayWeekProps) => {
  const [selectedByDay, setSelectedByDay] = useState<typeof AllWeekDayOptions | "">("");

  // keep select sync with store
  useEffect(() => {
    if (value.byDay === null || value.byDay.length === 0) {
      setSelectedByDay("");
      return;
    }
    if (value.byDay.length === 7) {
      setSelectedByDay(AllWeekDayOptions.DAY as unknown as typeof AllWeekDayOptions);
    } else if (value.byDay.length === 5 && !value.byDay.includes(Weekday.SA) && !value.byDay.includes(Weekday.SU)) {
      setSelectedByDay(AllWeekDayOptions.WEEKDAY as unknown as typeof AllWeekDayOptions);
    } else if (value.byDay.length === 2 && value.byDay.includes(Weekday.SA) && value.byDay.includes(Weekday.SU)) {
      setSelectedByDay(AllWeekDayOptions.WEEKEND as unknown as typeof AllWeekDayOptions);
    } else {
      setSelectedByDay(value.byDay[0] as unknown as typeof AllWeekDayOptions);
    }
  }, [value.byDay, setSelectedByDay]);

  const handleSelectDayChange = useCallback((e: SelectChangeEvent<typeof AllWeekDayOptions>) => {
    const changeVal = e.target.value;
    let setVal: Weekday[] = [changeVal as Weekday];
    if (changeVal === AllWeekDayOptions.DAY) {
      // this means all days in the array
      setVal = [Weekday.SU, Weekday.MO, Weekday.TU, Weekday.WE, Weekday.TH, Weekday.FR, Weekday.SA];
    } else if (changeVal === AllWeekDayOptions.WEEKDAY) {
      // this means all weekdays in the array
      setVal = [Weekday.MO, Weekday.TU, Weekday.WE, Weekday.TH, Weekday.FR];
    } else if (changeVal === AllWeekDayOptions.WEEKEND) {
      // this means all weekends in the array
      setVal = [Weekday.SA, Weekday.SU];
    }
    onChange({ ...value, byDay: setVal });
    setSelectedByDay(changeVal as typeof AllWeekDayOptions);
  }, [onChange, value]);

  return (
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
        onChange={handleSelectDayChange}
        value={selectedByDay}
        labelId="select-day-label"
        label="Select Day"
      >
        {Object.keys(AllWeekDayOptions).map((key) => (
          <MenuItem key={key} value={key}>{weekdayFullTextMapping[key as keyof typeof AllWeekDayOptions]}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectDayWeek;
