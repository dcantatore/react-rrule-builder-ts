import React, { useMemo, useState } from "react";

import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import Typography from "@mui/material/Typography";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { DateTime } from "luxon";

import {
  YearlyBy,
  Months,
  AllRepeatDetails,
} from "./Repeat.types";
import { monthShortTextMapping } from "./utils";
import SelectDayWeek from "./Selects/SelectDayWeek";
import SelectPosition from "./Selects/SelectPosition";
import SelectDayCalendar from "./Selects/SelectDayCalendar";
import IntervalTextInput from "./IntervalTextInput";
import SelectMonth from "./Selects/SelectMonth";

interface RepeatYearlyProps {
  value: AllRepeatDetails;
  onChange: (value: AllRepeatDetails) => void;
  enableYearlyInterval?: boolean;
}

const sxMinWidth = { minWidth: 120 };

const RepeatYearly = (
  {
    value,
    onChange,
    enableYearlyInterval,
  }: RepeatYearlyProps,
) => {
  const maxDaysInMonth = useMemo(() => {
    if (value.byMonth) {
      return DateTime.fromObject({ month: value.byMonth[0] }).daysInMonth || 31;
    }
    return 31;
  }, [value]);
  const [onRadio, setOnRadio] = useState<YearlyBy>(YearlyBy.BYMONTH);
  const disabledOnBYSETPOS = onRadio === YearlyBy.BYMONTH;
  const disabledOnBYMONTH = onRadio === YearlyBy.BYSETPOS;

  // TODO on radio change, set the values of the other fields to undefined in the store?

  return (
    <Stack direction="column" spacing={2} alignItems="flex-start">
      {enableYearlyInterval && (
        <IntervalTextInput value={value} onChange={onChange} unit="year" pluralizeUnit />
      )}
      <RadioGroup name="Yearly" value={onRadio} onChange={(e) => setOnRadio(e.target.value as YearlyBy)}>
        <Stack direction="column" spacing={2} alignItems="flex-start">
          <Stack direction="row" spacing={4} alignItems="center">
            <Radio
              value={YearlyBy.BYMONTH}
              name="day"
            />
            <Typography sx={{ color: disabledOnBYMONTH ? "text.disabled" : "text.primary" }}>On</Typography>
            <SelectMonth value={value} onChange={onChange} disabled={disabledOnBYMONTH} />
            <SelectDayCalendar maxDaysInMonth={maxDaysInMonth} value={value} onChange={onChange} disabled={disabledOnBYMONTH} />
          </Stack>
          <Stack direction="row" spacing={4} alignItems="center">
            <Radio
              value={YearlyBy.BYSETPOS}
              name="day"
            />
            <Typography
              sx={{ color: disabledOnBYSETPOS ? "text.disabled" : "text.primary" }}
            >
              On The
            </Typography>
            <SelectPosition value={value} onChange={onChange} disabled={disabledOnBYSETPOS} />
            <SelectDayWeek value={value} onChange={onChange} disabled={disabledOnBYSETPOS} />
            <Typography sx={{ color: disabledOnBYSETPOS ? "text.disabled" : "text.primary" }}>of</Typography>
            <SelectMonth value={value} onChange={onChange} disabled={disabledOnBYSETPOS} />
          </Stack>
        </Stack>
      </RadioGroup>
    </Stack>
  );
};
export default RepeatYearly;
