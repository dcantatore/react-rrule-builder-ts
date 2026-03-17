import React, {
  useCallback,
  useMemo,
  useRef,
} from "react";

import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import Typography from "@mui/material/Typography";
import RadioGroup from "@mui/material/RadioGroup";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";

import { TextFieldProps } from "@mui/material/TextField";
import {
  MonthBy,
  AllRepeatDetails,
} from "./Repeat.types";
import SelectDayWeek from "./Inputs/SelectDayWeek";
import SelectPosition from "./Inputs/SelectPosition";
import SelectDayCalendar from "./Inputs/SelectDayCalendar";
import IntervalTextInput from "./Inputs/IntervalTextInput";
import useResponsiveRowLayout, { ResponsiveRowSpec } from "./useResponsiveRowLayout";

interface RepeatMonthlyProps {
  value: AllRepeatDetails;
  onChange: (value: AllRepeatDetails) => void;
  radioValue: MonthBy;
  setRadioValue: (value: MonthBy) => void;
  inputSize: TextFieldProps["size"];
  inputVariant: TextFieldProps["variant"];
  responsiveContainerRef?: React.RefObject<HTMLElement>;
  enableResponsiveLayout: boolean;
}

const RepeatMonthly = (
  {
    value,
    onChange,
    radioValue,
    setRadioValue,
    inputSize,
    inputVariant,
    responsiveContainerRef,
    enableResponsiveLayout,
  }: RepeatMonthlyProps,
) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const measurementContainerRef = useMemo<React.RefObject<HTMLElement>>(
    () => (responsiveContainerRef ?? wrapperRef) as React.RefObject<HTMLElement>,
    [responsiveContainerRef],
  );
  const rowSpecs = useMemo<ResponsiveRowSpec[]>(() => ([
    {
      fixedWidth: 120,
      selectCount: 1,
    },
    {
      fixedWidth: 120,
      selectMinWidths: [150, 120],
    },
  ]), []);
  const useColumnLayout = useResponsiveRowLayout({
    containerRef: measurementContainerRef,
    rowSpecs,
    enabled: enableResponsiveLayout,
  });

  const maxDaysInMonth = 31;
  const disabledOnBYSETPOS = radioValue === MonthBy.BYMONTHDAY;
  const disabledOnBYMONTHDAY = radioValue === MonthBy.BYSETPOS;

  const handleRadioChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const radioVal = e.target.value as MonthBy;
    setRadioValue(radioVal);
    if (radioVal === MonthBy.BYMONTHDAY) {
      onChange({
        ...value, bySetPos: [], byDay: [], byMonth: [],
      });
    } else {
      onChange({ ...value, byMonthDay: [], byMonth: [] });
    }
  }, [onChange, value, setRadioValue]);

  const handleOnDayChange = useCallback((allRepeatDetails: AllRepeatDetails) => {
    onChange({ ...allRepeatDetails });
    if (radioValue !== MonthBy.BYMONTHDAY) {
      setRadioValue(MonthBy.BYMONTHDAY);
    }
  }, [onChange, radioValue, setRadioValue]);

  const handleOnTheChange = useCallback((allRepeatDetails: AllRepeatDetails) => {
    onChange({ ...allRepeatDetails });
    if (radioValue !== MonthBy.BYSETPOS) {
      setRadioValue(MonthBy.BYSETPOS);
    }
  }, [onChange, radioValue, setRadioValue]);

  return (
    <Stack ref={wrapperRef} direction="column" spacing={2} alignItems="flex-start" width="100%">
      <IntervalTextInput
        value={value}
        onChange={onChange}
        unit="month"
        pluralizeUnit
        inputSize={inputSize}
        inputVariant={inputVariant}
      />
      <RadioGroup
        name="monthly"
        value={radioValue}
        onChange={handleRadioChange}
        sx={{ width: "100%" }}
      >
        <Stack direction="column" spacing={2} alignItems="flex-start" width="100%">
          {/* ON DAY SECTION */}
          <Stack
            direction={useColumnLayout ? "column" : "row"}
            spacing={useColumnLayout ? 2 : 4}
            alignItems={useColumnLayout ? "flex-start" : "center"}
            sx={{ width: "100%" }}
          >
            <FormControlLabel
              value={MonthBy.BYMONTHDAY}
              control={<Radio />}
              label={(
                <Typography
                  fontSize={inputSize}
                  sx={{ color: disabledOnBYMONTHDAY ? "text.disabled" : "text.primary", paddingLeft: 2 }}
                >
                  On Day
                </Typography>
              )}
              sx={{ minWidth: 120, margin: 0 }}
            />
            <Box sx={{ minWidth: 120, width: useColumnLayout ? "100%" : "auto" }}>
              <SelectDayCalendar
                value={value}
                onChange={handleOnDayChange}
                maxDaysInMonth={maxDaysInMonth}
                disabled={disabledOnBYMONTHDAY}
                inputSize={inputSize}
                inputVariant={inputVariant}
              />
            </Box>
          </Stack>
          {/* ON THE SECTION */}
          <Stack
            direction={useColumnLayout ? "column" : "row"}
            spacing={useColumnLayout ? 2 : 4}
            alignItems={useColumnLayout ? "flex-start" : "center"}
            sx={{ width: "100%" }}
          >
            <Box sx={{ minWidth: 120 }}>
              <FormControlLabel
                value={MonthBy.BYSETPOS}
                control={<Radio />}
                label={(
                  <Typography
                    fontSize={inputSize}
                    sx={{ color: disabledOnBYSETPOS ? "text.disabled" : "text.primary", paddingLeft: 2 }}
                  >
                    On The
                  </Typography>
                )}
                sx={{ margin: 0 }}
              />
            </Box>
            <Box
              sx={{
                minWidth: 150,
                width: useColumnLayout ? "100%" : "auto",
              }}
            >
              <SelectPosition
                value={value}
                onChange={handleOnTheChange}
                disabled={disabledOnBYSETPOS}
                inputSize={inputSize}
                inputVariant={inputVariant}
              />
            </Box>
            <Box sx={{ minWidth: 120, width: useColumnLayout ? "100%" : "auto" }}>
              <SelectDayWeek
                value={value}
                onChange={handleOnTheChange}
                disabled={disabledOnBYSETPOS}
                inputSize={inputSize}
                inputVariant={inputVariant}
              />
            </Box>
          </Stack>
        </Stack>
      </RadioGroup>

    </Stack>
  );
};
export default RepeatMonthly;
