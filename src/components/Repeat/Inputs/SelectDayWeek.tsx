import React, { useCallback, useEffect, useState } from "react";

import Select, { SelectChangeEvent, SelectProps } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { TextFieldProps } from "@mui/material/TextField";
import {
  AllRepeatDetails,
  AllWeekDayOptions,
  Weekday,
} from "../Repeat.types";
import { getLabelSize, weekdayFullTextMapping } from "../utils";

interface SelectDayWeekProps {
  value: AllRepeatDetails;
  onChange: (value: AllRepeatDetails) => void;
  disabled: boolean;
  inputSize: SelectProps["size"];
  inputVariant: TextFieldProps["variant"];
}
const sxMinWidth = { minWidth: 120 };

const SelectDayWeek = ({
  value, onChange, disabled, inputSize, inputVariant,
}: SelectDayWeekProps) => {
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

  const labelSize = getLabelSize(inputSize);

  return (
    <FormControl fullWidth>
      <InputLabel
        id="select-day-label"
        disabled={disabled}
        size={labelSize}
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
        size={inputSize}
        variant={inputVariant}
      >
        {Object.keys(AllWeekDayOptions).map((key) => (
          <MenuItem key={key} value={key}>{weekdayFullTextMapping[key as keyof typeof AllWeekDayOptions]}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectDayWeek;
