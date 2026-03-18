import React, { useId } from "react";

import Select, { SelectProps } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import isNil from "lodash/isNil";
import { AllRepeatDetails, Months } from "../Repeat.types";
import { getLabelSize, monthShortTextMapping } from "../utils";

interface SelectMonthProps {
  value: AllRepeatDetails
  onChange: (value: AllRepeatDetails) => void;
  disabled: boolean;
  inputSize: SelectProps["size"];
  inputVariant: SelectProps["variant"];

}
const sxMinWidth = { minWidth: 136 };

const SelectMonth = ({
  value, onChange, disabled, inputSize, inputVariant,
}: SelectMonthProps) => {
  const id = useId();
  const rawMonth = disabled ? undefined : value.byMonth[0];
  const displayValue = isNil(rawMonth) ? "" : rawMonth;
  const labelSize = getLabelSize(inputSize);

  return (
    <FormControl fullWidth>
      <InputLabel
        id={id}
        disabled={disabled}
        shrink={!disabled && !!displayValue}
        size={labelSize}
      >
        Select Month
      </InputLabel>
      <Select
        sx={sxMinWidth}
        disabled={disabled}
        onChange={(e) => {
          onChange({ ...value, byMonth: [e.target.value as number] });
        }}
        value={displayValue}
        labelId={id}
        label={!disabled && !!displayValue ? "Select Month" : undefined}
        size={inputSize}
        variant={inputVariant}
      >
        {Object.values(Months).map((monthNum) => (
          <MenuItem key={monthNum} value={monthNum}>{monthShortTextMapping[monthNum]}</MenuItem>
        ))}
      </Select>
    </FormControl>

  );
};

export default SelectMonth;
