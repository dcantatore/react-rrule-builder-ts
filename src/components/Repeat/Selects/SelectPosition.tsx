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

const SelectPosition = ({ value, onChange, disabled }: SelectPositionProps) => (
  <Select
    sx={sxMinWidth}
    disabled={disabled}
    onChange={(e) => onChange({ ...value, bySetPos: [parseInt(e.target.value as string, 10)] })}
    value={value.bySetPos ?? -999}
  >
    <MenuItem key={null} value={-999} disabled>Select  Position</MenuItem>
    {Object.keys(OnThe).map((key) => (
      <MenuItem key={key} value={OnThe[key as keyof typeof OnThe]}>
        {onTheTextMapping[OnThe[key as keyof typeof OnThe]]}
      </MenuItem>
    ))}
  </Select>
);

export default SelectPosition;
