import React, { useId } from "react";

import Select, { SelectProps } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { TextFieldProps } from "@mui/material/TextField";
import {
  AllRepeatDetails,
  OnThe,
} from "../Repeat.types";
import { getLabelSize, onTheTextMapping, safeParseInt } from "../utils";

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
  const id = useId();
  const labelSize = getLabelSize(inputSize);
  return (
    <FormControl fullWidth>
      <InputLabel
        id={id}
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
        labelId={id}
        label="Select Position"
        size={inputSize}
        variant={inputVariant}
      >
        {Object.keys(OnThe).map((key) => (
          <MenuItem key={key} value={safeParseInt(OnThe[key as keyof typeof OnThe])}>
            {onTheTextMapping[OnThe[key as keyof typeof OnThe]]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

  );
};

export default SelectPosition;
