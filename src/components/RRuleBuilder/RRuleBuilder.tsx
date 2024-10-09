import React, { useEffect, useState } from "react";

import Stack from "@mui/material/Stack";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider, MuiPickersAdapter, PickersTimezone } from "@mui/x-date-pickers";

import { Frequency } from "rrule";
import { useTheme } from "@mui/material/styles";
import { TextFieldProps } from "@mui/material/TextField";
import RepeatSelect from "../Repeat/Repeat";
import useBuilderStore from "../../store/builderStore";
import End from "../End/End";

type Lang = {
  startDatePickerLabel: string;
  endDatePickerLabel: string;
};

interface RRuleBuilderProps<TDate> {
  dateAdapter: new (...args: any[]) => MuiPickersAdapter<TDate, any>;
  datePickerInitialDate?: TDate;
  onChange?: (rruleString: string) => void;
  rruleString?: string;
  enableYearlyInterval?: boolean;
  showStartDate?: boolean;
  enableOpenOnClickDatePicker?: boolean;
  defaultFrequency?: Frequency;
  inputSize?: TextFieldProps["size"];
  inputVariant?: TextFieldProps["variant"];
  lang?: Lang;
  timeZone?: PickersTimezone;
  // enableSmallScreenDetection?: boolean;
  // smallScreenBreakpoint?: number;
  // dense?: boolean;
}

// eslint-disable-next-line @typescript-eslint/comma-dangle
const RRuleBuilder = <TDate,>({
  datePickerInitialDate,
  onChange,
  rruleString,
  dateAdapter,
  enableYearlyInterval = false,
  showStartDate = true,
  enableOpenOnClickDatePicker = true,
  defaultFrequency = Frequency.WEEKLY,
  inputSize = "small",
  inputVariant = "outlined",
  lang = {
    startDatePickerLabel: "Start Date",
    endDatePickerLabel: "End Date",
  },
  timeZone = "UTC",
  // TODO implement small container detection
  // enableSmallScreenDetection = true,
  // smallScreenBreakpoint = 350,
  // TODO implement dense mode - make all things with less padding /margin
  // dense = false,
}: RRuleBuilderProps<TDate>) => {
  const {
    startDate,
    setStartDate,
    frequency,
    setFrequency,
    setOnChange,
    setStoreFromRRuleString,
    setAdapter,
  } = useBuilderStore();

  const theme = useTheme();
  const fieldDefaultSize = theme.components?.MuiTextField?.defaultProps?.size || inputSize;
  const fieldDefaultVariant = theme.components?.MuiTextField?.defaultProps?.variant || inputVariant;
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  // TODO Implement small screen detection
  // const containerRef = useRef<HTMLDivElement>(null);
  // const [size, setSize] = useState(0);
  //
  // const handleResize = () => {
  //   if (containerRef.current) {
  //     setSize(containerRef.current.getBoundingClientRect().width);
  //   }
  // };
  //
  // useEffect(() => {
  //   if (containerRef.current) {
  //     // Watch width of container for responsive design
  //     window.addEventListener("resize", handleResize);
  //   }
  //
  //   // Call handleResize initially to set the initial size
  //   handleResize();
  //
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  // init the store with user provided initial data
  useEffect(() => {
    // eslint-disable-next-line new-cap
    setAdapter(new dateAdapter());

    if (!showStartDate) { // clear the start date if we don't have the option to show it
      setStartDate(null);
    }

    // store the users onChange function if it exists and is not already stored
    if (onChange) {
      setOnChange(onChange);
    }

    // you can only init the store with rrule options or a string, not both
    // TODO finish rruleOptions  object parse in store and add option here
    if (rruleString) { // if we are rehydrating the store with rrule options from a string
      setStoreFromRRuleString(rruleString);
    } else { // if we aren't rehydrating the store with rrule options from a string
      // set the default frequency
      setFrequency(defaultFrequency);
      // set the start date if provided and we are showing it
      if (datePickerInitialDate && showStartDate) { // otherwise set the start date if provided
        setStartDate(datePickerInitialDate);
      }
    }

    // this is intentional to only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack direction="column" spacing={2}>
      <LocalizationProvider dateAdapter={dateAdapter}>
        {showStartDate && (
          <DatePicker
            label={lang?.startDatePickerLabel}
            value={startDate}
            timezone={timeZone}
            onChange={(newDate) => setStartDate(newDate)}
            open={enableOpenOnClickDatePicker ? datePickerOpen : undefined}
            onOpen={enableOpenOnClickDatePicker ? () => setDatePickerOpen(true) : undefined}
            onClose={enableOpenOnClickDatePicker ? () => setDatePickerOpen(false) : undefined}
            slotProps={{
              field: { clearable: true, onClear: () => setStartDate(null) },
              textField: {
                size: fieldDefaultSize,
                variant: fieldDefaultVariant,
                onClick: enableOpenOnClickDatePicker ? () => setDatePickerOpen(true) : undefined,
              },
            }}
          />
        )}
        <RepeatSelect
          frequencySelected={frequency}
          onFrequencyChange={setFrequency}
          enableYearlyInterval={enableYearlyInterval}
          inputSize={fieldDefaultSize}
          inputVariant={fieldDefaultVariant}
        />
        <End
          datePickerEndLabel={lang?.endDatePickerLabel}
          inputSize={fieldDefaultSize}
          inputVariant={fieldDefaultVariant}
          enableOpenOnClickDatePicker={enableOpenOnClickDatePicker}
          timeZone={timeZone}
        />
      </LocalizationProvider>
    </Stack>
  );
};

export default RRuleBuilder;
