import React, { useCallback, useId, useMemo } from "react";

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
  const id = useId();

  const selectedByDay = useMemo<typeof AllWeekDayOptions | "">(() => {
    if (value.byDay.length === 0) {
      return "";
    }
    if (value.byDay.length === 7) {
      return AllWeekDayOptions.DAY as unknown as typeof AllWeekDayOptions;
    }
    if (value.byDay.length === 5 && !value.byDay.includes(Weekday.SA) && !value.byDay.includes(Weekday.SU)) {
      return AllWeekDayOptions.WEEKDAY as unknown as typeof AllWeekDayOptions;
    }
    if (value.byDay.length === 2 && value.byDay.includes(Weekday.SA) && value.byDay.includes(Weekday.SU)) {
      return AllWeekDayOptions.WEEKEND as unknown as typeof AllWeekDayOptions;
    }
    return value.byDay[0] as unknown as typeof AllWeekDayOptions;
  }, [value.byDay]);

  const handleSelectDayChange = useCallback((e: SelectChangeEvent<typeof AllWeekDayOptions>) => {
    const changeVal = e.target.value;
    let setVal: Weekday[] = [changeVal as Weekday];
    if (changeVal === AllWeekDayOptions.DAY) {
      setVal = [Weekday.SU, Weekday.MO, Weekday.TU, Weekday.WE, Weekday.TH, Weekday.FR, Weekday.SA];
    } else if (changeVal === AllWeekDayOptions.WEEKDAY) {
      setVal = [Weekday.MO, Weekday.TU, Weekday.WE, Weekday.TH, Weekday.FR];
    } else if (changeVal === AllWeekDayOptions.WEEKEND) {
      setVal = [Weekday.SA, Weekday.SU];
    }
    onChange({ ...value, byDay: setVal });
  }, [onChange, value]);

  const labelSize = getLabelSize(inputSize);

  return (
    <FormControl fullWidth>
      <InputLabel
        id={id}
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
        labelId={id}
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
