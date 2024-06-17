import React from "react";

import Select from "@mui/material/Select";
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
const sxMinWidth = { minWidth: 120 };

// TODO should there be a max number of positions? Change to AutoComplete from Select?
const SelectPosition = ({ value, onChange, disabled }: SelectPositionProps) => (
  <Select
    sx={sxMinWidth}
    disabled={disabled}
    onChange={(e) => {
      const currentVal = e.target.value as number[];
      onChange({ ...value, bySetPos: currentVal });
    }}
    value={value.bySetPos ?? []}
    multiple
  >
    <MenuItem key={null} value={-999} disabled>Select  Position</MenuItem>
    {Object.keys(OnThe).map((key) => (
      <MenuItem key={key} value={parseInt(OnThe[key as keyof typeof OnThe], 10)}>
        {onTheTextMapping[OnThe[key as keyof typeof OnThe]]}
      </MenuItem>
    ))}
  </Select>
);

export default SelectPosition;
