import React, { useContext, useEffect, useState } from "react";

import Stack from "@mui/material/Stack";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider, MuiPickersAdapter, PickersTimezone } from "@mui/x-date-pickers";

import { Frequency } from "rrule";
import { useTheme } from "@mui/material/styles";
import { TextFieldProps } from "@mui/material/TextField";
import { DateTime } from "luxon";
import RepeatSelect from "../Repeat/Repeat";
import useBuilderStore, { BuilderStoreContext, BuilderStoreProvider } from "../../store/builderStore";
import End from "../End/End";

type Lang = {
  startDatePickerLabel: string;
  endDatePickerLabel: string;
};

type MuiPickersAdapterConstructor<TDate extends DateTime<boolean>> = new (
  ...args: any[]
) => MuiPickersAdapter<TDate>;

export interface RRuleBuilderProps<TDate extends DateTime<boolean> = DateTime> {
  dateAdapter: MuiPickersAdapterConstructor<TDate>;
  datePickerInitialDate?: TDate;
  onChange?: (rruleString: string) => void;
  rruleString?: string;
  enableYearlyInterval?: boolean;
  enableResponsiveLayout?: boolean;
  showStartDate?: boolean;
  enableOpenOnClickDatePicker?: boolean;
  defaultFrequency?: Frequency;
  inputSize?: TextFieldProps["size"];
  inputVariant?: TextFieldProps["variant"];
  lang?: Lang;
  timeZone?: PickersTimezone;
  /**
   * Display format for the start and end date pickers, forwarded as the `format` prop of both
   * MUI `DatePicker`s (e.g. `"dd/MM/yyyy"`; see the exported `DateFormat` constants).
   * Tokens are case-sensitive Luxon syntax (`dd`, `MM`, `yyyy`); a setting-style string such as
   * `"DD/MM/YYYY"` is not a valid format. When omitted or empty, the pickers use the date
   * adapter's default localized format.
   */
  dateFormat?: string;
  // TODO implement dense mode
  // dense?: boolean;
}

// eslint-disable-next-line @typescript-eslint/comma-dangle
const RRuleBuilderInner = <TDate extends DateTime<boolean>,>({
  datePickerInitialDate,
  onChange,
  rruleString,
  dateAdapter,
  enableYearlyInterval = false,
  enableResponsiveLayout = true,
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
  dateFormat,
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
            format={dateFormat || undefined}
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
          enableResponsiveLayout={enableResponsiveLayout}
          inputSize={fieldDefaultSize}
          inputVariant={fieldDefaultVariant}
        />
        <End
          datePickerEndLabel={lang?.endDatePickerLabel}
          inputSize={fieldDefaultSize}
          inputVariant={fieldDefaultVariant}
          enableOpenOnClickDatePicker={enableOpenOnClickDatePicker}
          timeZone={timeZone}
          dateFormat={dateFormat}
        />
      </LocalizationProvider>
    </Stack>
  );
};

// Auto-wraps in BuilderStoreProvider if not already inside one
// eslint-disable-next-line @typescript-eslint/comma-dangle
const RRuleBuilder = <TDate extends DateTime<boolean>,>(
  props: RRuleBuilderProps<TDate>,
) => {
  const existingStore = useContext(BuilderStoreContext);

  if (existingStore) {
    return <RRuleBuilderInner {...props} />;
  }

  return (
    <BuilderStoreProvider>
      <RRuleBuilderInner {...props} />
    </BuilderStoreProvider>
  );
};

export default RRuleBuilder;
