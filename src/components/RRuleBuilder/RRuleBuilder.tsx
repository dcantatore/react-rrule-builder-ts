import React, { useEffect } from "react";

import Stack from "@mui/material/Stack";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { DateTime } from "luxon";
import { Frequency } from "rrule";
import RepeatSelect from "../Repeat/Repeat";
import useBuilderStore from "../../store/builderStore";
import End from "../End/End";

interface RRuleBuilderProps {
  datePickerStartLabel?: string;
  datePickerEndLabel?: string;
  datePickerInitialDate?: DateTime;
  onChange?: (rruleString: string) => void;
  rruleString?: string;
  enableYearlyInterval?: boolean;
  showStartDate?: boolean;
  defaultFrequency?: Frequency;
  // used to set initial data in the builder
  // rruleOptions?: Options;
  // enableSmallScreenDetection?: boolean;
  // smallScreenBreakpoint?: number;
  // dense?: boolean;
}

const RRuleBuilder = ({
  datePickerStartLabel = "Start Date",
  datePickerEndLabel = "End Date",
  datePickerInitialDate,
  onChange,
  rruleString,
  // TODO implement rruleOptions object
  // rruleOptions,
  // TODO implement small screen detection
  // enableSmallScreenDetection = true,
  // smallScreenBreakpoint = 350,
  // TODO implement dense mode - make all things smaller with less padding
  // dense = false,
  enableYearlyInterval = false,
  showStartDate = true,
  defaultFrequency = Frequency.WEEKLY,
}: RRuleBuilderProps) => {
  const {
    // TODO Implement validation errors on date picker
    // validationErrors,
    startDate,
    setStartDate,
    frequency,
    setFrequency,
    setOnChange,
    setStoreFromRRuleString,
    onChange: onChangeStored,
  } = useBuilderStore();

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
    if (!showStartDate) { // clear the start date if we don't have the option to show it
      setStartDate(null);
    }

    // store the users onChange function if it exists and is not already stored
    if (onChange && !onChangeStored) {
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
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        {showStartDate && (
          <DatePicker
            label={datePickerStartLabel}
            value={startDate}
            onChange={(newDate) => setStartDate(newDate)}
            slotProps={{
              field: { clearable: true, onClear: () => setStartDate(null) },
            }}
          />
        )}
        <RepeatSelect
          frequencySelected={frequency}
          onFrequencyChange={setFrequency}
          enableYearlyInterval={enableYearlyInterval}
        />
        <End datePickerEndLabel={datePickerEndLabel} />
      </LocalizationProvider>
    </Stack>
  );
};

export default RRuleBuilder;
