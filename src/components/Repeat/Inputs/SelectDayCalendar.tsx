import React, { useId } from "react";

import Select, { SelectProps } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { AllRepeatDetails } from "../Repeat.types";
import { getLabelSize, safeParseInt } from "../utils";

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
  const id = useId();
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
        onChange={(e) => {
          const parsed = safeParseInt(e.target.value as string);
          if (parsed !== undefined) {
            onChange({ ...value, byMonthDay: [parsed] });
          }
        }}
        value={value.byMonthDay?.[0] ?? ""}
        labelId={id}
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
