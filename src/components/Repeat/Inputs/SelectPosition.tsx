import React from "react";

import Select, { SelectProps } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { TextFieldProps } from "@mui/material/TextField";
import {
  AllRepeatDetails,
  OnThe,
} from "../Repeat.types";
import { getLabelSize, onTheTextMapping } from "../utils";

interface SelectPositionProps {
  value: AllRepeatDetails
  onChange: (value: AllRepeatDetails) => void;
  disabled: boolean;
  inputSize: SelectProps["size"];
  inputVariant: TextFieldProps["variant"];

}
const sxMinWidth = { minWidth: 150 };

// TODO should there be a max number of positions? Change to AutoComplete from Select?
const SelectPosition = ({
  value, onChange, disabled, inputSize, inputVariant,
}: SelectPositionProps) => {
  const labelSize = getLabelSize(inputSize);
  return (
    <FormControl fullWidth>
      <InputLabel
        id="select-pos-label"
        disabled={disabled}
        size={labelSize}
      >
        Select Position
      </InputLabel>
      <Select
        sx={sxMinWidth}
        disabled={disabled}
        onChange={(e) => {
          const currentVal = e.target.value as number[];
          onChange({ ...value, bySetPos: currentVal });
        }}
        value={value.bySetPos}
        multiple
        labelId="select-pos-label"
        label="Select Position"
        size={inputSize}
        variant={inputVariant}
      >
        {Object.keys(OnThe).map((key) => (
          <MenuItem key={key} value={parseInt(OnThe[key as keyof typeof OnThe], 10)}>
            {onTheTextMapping[OnThe[key as keyof typeof OnThe]]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

  );
};

export default SelectPosition;
