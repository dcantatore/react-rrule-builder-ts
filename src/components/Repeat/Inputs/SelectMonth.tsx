import React from "react";

import Select, { SelectProps } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { AllRepeatDetails, Months } from "../Repeat.types";
import { getLabelSize, monthShortTextMapping } from "../utils";

interface SelectMonthProps {
  value: AllRepeatDetails
  onChange: (value: AllRepeatDetails) => void;
  disabled: boolean;
  inputSize: SelectProps["size"];
  inputVariant: SelectProps["variant"];

}
const sxMinWidth = { minWidth: 120 };

const SelectMonth = ({
  value, onChange, disabled, inputSize, inputVariant,
}: SelectMonthProps) => {
  const displayValue = disabled ? null : value?.byMonth?.[0] ?? null;
  const labelSize = getLabelSize(inputSize);

  return (
    <FormControl fullWidth>
      <InputLabel
        id="select-month-label"
        disabled={disabled}
        shrink={!disabled && !!displayValue}
        size={labelSize}
      >
        Select Month
      </InputLabel>
      <Select
        sx={sxMinWidth}
        disabled={disabled}
        onChange={(e) => onChange({ ...value, byMonth: [parseInt(e.target.value as string, 10)] })}
        value={displayValue}
        labelId="select-month-label"
        label={!disabled && !!displayValue ? "Select Month" : undefined}
        size={inputSize}
        variant={inputVariant}
      >
        {Object.values(Months).map((key) => (
          <MenuItem key={key} value={key}>{monthShortTextMapping[key]}</MenuItem>
        ))}
      </Select>
    </FormControl>

  );
};

export default SelectMonth;
