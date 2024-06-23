import React from "react";

import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import {
  MonthlyRepeatDetails, OnThe, RepeatDetails, YearlyRepeatDetails,
} from "../Repeat.types";
import { onTheTextMapping } from "../utils";

interface SelectPositionProps {
  value: YearlyRepeatDetails | MonthlyRepeatDetails;
  onChange: (value: RepeatDetails) => void;
  disabled: boolean;
}
const sxMinWidth = { minWidth: 150 };

// TODO should there be a max number of positions? Change to AutoComplete from Select?
const SelectPosition = ({ value, onChange, disabled }: SelectPositionProps) => (
  <FormControl fullWidth>
    <InputLabel
      id="select-pos-label"
      disabled={disabled}
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
    >
      {Object.keys(OnThe).map((key) => (
        <MenuItem key={key} value={parseInt(OnThe[key as keyof typeof OnThe], 10)}>
          {onTheTextMapping[OnThe[key as keyof typeof OnThe]]}
        </MenuItem>
      ))}
    </Select>
  </FormControl>

);

export default SelectPosition;
