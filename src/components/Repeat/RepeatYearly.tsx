import React, {
  useCallback,
  useMemo,
} from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import Typography from "@mui/material/Typography";
import RadioGroup from "@mui/material/RadioGroup";

import { TextFieldProps } from "@mui/material/TextField";
import { YearlyBy, AllRepeatDetails } from "./Repeat.types";
import SelectDayWeek from "./Inputs/SelectDayWeek";
import SelectPosition from "./Inputs/SelectPosition";
import SelectDayCalendar from "./Inputs/SelectDayCalendar";
import IntervalTextInput from "./Inputs/IntervalTextInput";
import SelectMonth from "./Inputs/SelectMonth";
import useResponsiveRowLayout, { ResponsiveRowSpec, useContainerRef } from "./useResponsiveRowLayout";

interface RepeatYearlyProps {
  value: AllRepeatDetails;
  onChange: (value: AllRepeatDetails) => void;
  enableYearlyInterval?: boolean;
  radioValue: YearlyBy;
  setRadioValue: (value: YearlyBy) => void;
  inputSize: TextFieldProps["size"];
  inputVariant: TextFieldProps["variant"];
  responsiveContainerRef?: React.RefObject<HTMLElement>;
  enableResponsiveLayout: boolean;
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
    responsiveContainerRef,
    enableResponsiveLayout,
  }: RepeatYearlyProps,
) => {
  const [wrapperRef, measurementContainerRef] = useContainerRef(responsiveContainerRef);
  const rowSpecs = useMemo<ResponsiveRowSpec[]>(() => {
    // Approximate rendered width (px) of the Radio + "On"/"On The" label at default MUI theme.
    // Recalibrate if theme font-size or spacing changes significantly.
    const triggerWidth = inputSize === "small" ? 90 : 98;
    const ofLabelWithGapWidth = inputSize === "small" ? 32 : 36;
    return [
      {
        fixedWidth: triggerWidth,
        selectMinWidths: [120, 120],
      },
      {
        fixedWidth: triggerWidth + ofLabelWithGapWidth,
        selectMinWidths: [150, 120, 120],
      },
    ];
  }, [inputSize]);
  const useColumnLayout = useResponsiveRowLayout({
    containerRef: measurementContainerRef,
    rowSpecs,
    enabled: enableResponsiveLayout,
  });

  const maxDaysInMonth = useMemo(() => {
    if (value.byMonth.length > 0) {
      const month = value.byMonth[0];
      // always return 29 for February for safety
      if (month === 2) {
        return 29;
      }
      const year = new Date().getFullYear();
      // the 0 gets the last day of the previous month and byMonth is 1 based
      return new Date(year, month, 0).getDate();
    }
    return 31;
  }, [value.byMonth]);
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
    <Stack ref={wrapperRef} direction="column" spacing={2} alignItems="flex-start" width="100%">
      {enableYearlyInterval && (
        <IntervalTextInput value={value} onChange={onChange} unit="year" pluralizeUnit inputSize={inputSize} inputVariant={inputVariant} />
      )}
      <RadioGroup name="Yearly" value={radioValue} onChange={handleRadioChange} sx={{ width: "100%" }}>
        <Stack direction="column" spacing={2} alignItems="flex-start" width="100%">
          <Stack
            direction={useColumnLayout ? "column" : "row"}
            spacing={useColumnLayout ? 2 : 4}
            alignItems={useColumnLayout ? "flex-start" : "center"}
            sx={{ width: "100%" }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Radio
                value={YearlyBy.BYMONTH}
                name="day"
              />
              <Typography fontSize={inputSize} sx={{ color: disabledOnBYMONTH ? "text.disabled" : "text.primary" }}>On</Typography>
            </Stack>
            <Box sx={{ minWidth: 120, width: useColumnLayout ? "100%" : "auto" }}>
              <SelectMonth
                value={value}
                onChange={handleOnChange}
                disabled={disabledOnBYMONTH}
                inputVariant={inputVariant}
                inputSize={inputSize}
              />
            </Box>
            <Box sx={{ minWidth: 120, width: useColumnLayout ? "100%" : "auto" }}>
              <SelectDayCalendar
                maxDaysInMonth={maxDaysInMonth}
                value={value}
                onChange={handleOnChange}
                disabled={disabledOnBYMONTH}
                inputVariant={inputVariant}
                inputSize={inputSize}
              />
            </Box>
          </Stack>
          <Stack
            direction={useColumnLayout ? "column" : "row"}
            spacing={useColumnLayout ? 2 : 4}
            alignItems={useColumnLayout ? "flex-start" : "center"}
            sx={{ width: "100%" }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
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
            </Stack>
            <Box sx={{ minWidth: 150, width: useColumnLayout ? "100%" : "auto" }}>
              <SelectPosition
                value={value}
                onChange={handleOnTheChange}
                disabled={disabledOnBYSETPOS}
                inputVariant={inputVariant}
                inputSize={inputSize}
              />
            </Box>
            <Box sx={{ minWidth: 120, width: useColumnLayout ? "100%" : "auto" }}>
              <SelectDayWeek
                value={value}
                onChange={handleOnTheChange}
                disabled={disabledOnBYSETPOS}
                inputVariant={inputVariant}
                inputSize={inputSize}
              />
            </Box>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ width: useColumnLayout ? "100%" : "auto" }}>
              <Typography fontSize={inputSize} sx={{ color: disabledOnBYSETPOS ? "text.disabled" : "text.primary" }}>of</Typography>
              <Box sx={{ minWidth: 120, width: useColumnLayout ? "100%" : "auto", flex: useColumnLayout ? 1 : undefined }}>
                <SelectMonth
                  value={value}
                  onChange={handleOnTheChange}
                  disabled={disabledOnBYSETPOS}
                  inputVariant={inputVariant}
                  inputSize={inputSize}
                />
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </RadioGroup>
    </Stack>
  );
};
export default RepeatYearly;
