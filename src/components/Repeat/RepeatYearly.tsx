import React, { useCallback, useMemo } from "react";

import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import Typography from "@mui/material/Typography";
import RadioGroup from "@mui/material/RadioGroup";

import { DateTime } from "luxon";

import { TextFieldProps } from "@mui/material/TextField";
import { YearlyBy, AllRepeatDetails } from "./Repeat.types";
import SelectDayWeek from "./Inputs/SelectDayWeek";
import SelectPosition from "./Inputs/SelectPosition";
import SelectDayCalendar from "./Inputs/SelectDayCalendar";
import IntervalTextInput from "./Inputs/IntervalTextInput";
import SelectMonth from "./Inputs/SelectMonth";

interface RepeatYearlyProps {
  value: AllRepeatDetails;
  onChange: (value: AllRepeatDetails) => void;
  enableYearlyInterval?: boolean;
  radioValue: YearlyBy;
  setRadioValue: (value: YearlyBy) => void;
  inputSize: TextFieldProps["size"];
  inputVariant: TextFieldProps["variant"];
}

const RepeatYearly = (
  {
    value,
    onChange,
    enableYearlyInterval,
    radioValue,
    setRadioValue,
    inputSize,
    inputVariant,
  }: RepeatYearlyProps,
) => {
  const maxDaysInMonth = useMemo(() => {
    if (value.byMonth) {
      return DateTime.fromObject({ month: value.byMonth[0] }).daysInMonth || 31;
    }
    return 31;
  }, [value]);
  const disabledOnBYSETPOS = radioValue === YearlyBy.BYMONTH;
  const disabledOnBYMONTH = radioValue === YearlyBy.BYSETPOS;

  const handleRadioChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const radioVal = e.target.value as YearlyBy;
    setRadioValue(radioVal);
    if (radioVal === YearlyBy.BYMONTH) {
      onChange({
        ...value, bySetPos: [], byDay: [], byMonth: [],
      });
    } else {
      onChange({ ...value, byMonthDay: [], byMonth: [] });
    }
  }, [onChange, value, setRadioValue]);

  const handleOnChange = useCallback((allRepeatDetails: AllRepeatDetails) => {
    onChange({ ...allRepeatDetails });
    if (radioValue !== YearlyBy.BYMONTH) {
      setRadioValue(YearlyBy.BYMONTH);
    }
  }, [onChange, radioValue, setRadioValue]);

  const handleOnTheChange = useCallback((allRepeatDetails: AllRepeatDetails) => {
    onChange({ ...allRepeatDetails });
    if (radioValue !== YearlyBy.BYSETPOS) {
      setRadioValue(YearlyBy.BYSETPOS);
    }
  }, [onChange, radioValue, setRadioValue]);

  return (
    <Stack direction="column" spacing={2} alignItems="flex-start">
      {enableYearlyInterval && (
        <IntervalTextInput value={value} onChange={onChange} unit="year" pluralizeUnit inputSize={inputSize} inputVariant={inputVariant} />
      )}
      <RadioGroup name="Yearly" value={radioValue} onChange={handleRadioChange}>
        <Stack direction="column" spacing={2} alignItems="flex-start">
          <Stack direction="row" spacing={4} alignItems="center">
            <Radio
              value={YearlyBy.BYMONTH}
              name="day"
            />
            <Typography fontSize={inputSize} sx={{ color: disabledOnBYMONTH ? "text.disabled" : "text.primary" }}>On</Typography>
            <SelectMonth
              value={value}
              onChange={handleOnChange}
              disabled={disabledOnBYMONTH}
              inputVariant={inputVariant}
              inputSize={inputSize}
            />
            <SelectDayCalendar
              maxDaysInMonth={maxDaysInMonth}
              value={value}
              onChange={handleOnChange}
              disabled={disabledOnBYMONTH}
              inputVariant={inputVariant}
              inputSize={inputSize}
            />
          </Stack>
          <Stack direction="row" spacing={4} alignItems="center">
            <Radio
              value={YearlyBy.BYSETPOS}
              name="day"
            />
            <Typography
              fontSize={inputSize}
              sx={{ color: disabledOnBYSETPOS ? "text.disabled" : "text.primary" }}
            >
              On The
            </Typography>
            <SelectPosition
              value={value}
              onChange={handleOnTheChange}
              disabled={disabledOnBYSETPOS}
              inputVariant={inputVariant}
              inputSize={inputSize}
            />
            <SelectDayWeek
              value={value}
              onChange={handleOnTheChange}
              disabled={disabledOnBYSETPOS}
              inputVariant={inputVariant}
              inputSize={inputSize}
            />
            <Typography fontSize={inputSize} sx={{ color: disabledOnBYSETPOS ? "text.disabled" : "text.primary" }}>of</Typography>
            <SelectMonth
              value={value}
              onChange={handleOnTheChange}
              disabled={disabledOnBYSETPOS}
              inputVariant={inputVariant}
              inputSize={inputSize}
            />
          </Stack>
        </Stack>
      </RadioGroup>
    </Stack>
  );
};
export default RepeatYearly;
