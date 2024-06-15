import React, { useMemo, useState } from "react";

import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import Typography from "@mui/material/Typography";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { DateTime } from "luxon";
import {
  AllWeekDayOptions, YearlyRepeatDetails, OnThe, YearlyBy, Months, RepeatDetails, Weekday,
} from "./Repeat.types";
import { monthShortTextMapping, onTheTextMapping, weekdayFullTextMapping } from "./utils";

interface RepeatYearlyProps {
  value: YearlyRepeatDetails;
  onChange: (value: RepeatDetails) => void;
}

const sxMinWidth = { minWidth: 120 };

const RepeatYearly = (
  { value, onChange }: RepeatYearlyProps,
) => {
  const [selectedByDay, setSelectedByDay] = useState<typeof AllWeekDayOptions | undefined>(undefined);
  const maxDaysInMonth = useMemo(() => {
    if (value.byMonth) {
      return DateTime.fromObject({ month: value.byMonth }).daysInMonth || 31;
    }
    return 31;
  }, [value]);
  const [onRadio, setOnRadio] = useState<YearlyBy>(YearlyBy.BYMONTH);
  const disabledOnBYSETPOS = onRadio === YearlyBy.BYMONTH;
  const disabledOnBYMONTH = onRadio === YearlyBy.BYSETPOS;

  // TODO on radio change, set the values of the other fields to undefined in the store?

  return (
    <Stack direction="column" spacing={2} alignItems="flex-start">
      <RadioGroup name="Yearly" value={onRadio} onChange={(e) => setOnRadio(e.target.value as YearlyBy)}>
        <Stack direction="column" spacing={2} alignItems="flex-start">
          <Stack direction="row" spacing={4} alignItems="center">
            <Radio
              value={YearlyBy.BYMONTH}
              name="day"
            />
            <Typography sx={{ color: disabledOnBYMONTH ? "text.disabled" : "text.primary" }}>On</Typography>
            <Select
              sx={sxMinWidth}
              disabled={disabledOnBYMONTH}
              onChange={(e) => onChange({ ...value, byMonth: parseInt(e.target.value as string, 10) })}
              value={value.byMonth ?? -999}
            >
              <MenuItem key={null} value={-999} disabled>Select Month</MenuItem>
              {Object.values(Months).map((key) => (
                <MenuItem key={key} value={key}>{monthShortTextMapping[key]}</MenuItem>
              ))}
            </Select>
            <Select
              sx={sxMinWidth}
              disabled={disabledOnBYMONTH}
              onChange={(e) => onChange({ ...value, byMonthDay: parseInt(e.target.value as string, 10) })}
              value={value.byMonthDay ?? -999}
            >
              <MenuItem key={null} value={-999} disabled>Select Day</MenuItem>
              {Array.from({ length: maxDaysInMonth }, (_, i) => i + 1).map((day) => (
                <MenuItem key={day} value={day}>{day}</MenuItem>
              ))}
            </Select>
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
            <Select
              sx={sxMinWidth}
              disabled={disabledOnBYSETPOS}
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
            <Select
              sx={sxMinWidth}
              disabled={disabledOnBYSETPOS}
              onChange={(e) => {
                let setVal = [e.target.value as Weekday];
                if (e.target.value === AllWeekDayOptions.DAY) {
                  // this means all days in the array
                  setVal = [Weekday.SU, Weekday.MO, Weekday.TU, Weekday.WE, Weekday.TH, Weekday.FR, Weekday.SA];
                } else if (e.target.value === AllWeekDayOptions.WEEKDAY) {
                  // this means all weekdays in the array
                  setVal = [Weekday.MO, Weekday.TU, Weekday.WE, Weekday.TH, Weekday.FR];
                } else if (e.target.value === AllWeekDayOptions.WEEKEND) {
                  // this means all weekends in the array
                  setVal = [Weekday.SA, Weekday.SU];
                }
                onChange({ ...value, byDay: setVal as Weekday[] });
                setSelectedByDay(e.target.value as typeof AllWeekDayOptions);
              }}
              value={selectedByDay ?? -999}
            >
              <MenuItem key={null} value={-999} disabled>Select Day</MenuItem>
              {Object.keys(AllWeekDayOptions).map((key) => (
                <MenuItem key={key} value={key}>{weekdayFullTextMapping[key as keyof typeof AllWeekDayOptions]}</MenuItem>
              ))}
            </Select>
            <Typography sx={{ color: disabledOnBYSETPOS ? "text.disabled" : "text.primary" }}>of</Typography>
            <Select
              sx={sxMinWidth}
              disabled={disabledOnBYSETPOS}
              onChange={(e) => onChange({ ...value, byMonth: parseInt(e.target.value as string, 10) })}
              value={value.byMonth ?? -999}
            >
              <MenuItem key={null} value={-999} disabled>Select Month</MenuItem>
              {Object.values(Months).map((key) => (
                <MenuItem key={key} value={key}>{monthShortTextMapping[key]}</MenuItem>
              ))}
            </Select>
          </Stack>
        </Stack>
      </RadioGroup>
    </Stack>
  );
};
export default RepeatYearly;
