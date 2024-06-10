import React, { useState } from "react";

import Stack from "@mui/material/Stack";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { DateTime } from "luxon";
import { Frequency } from "rrule";
import RepeatSelect from "../Repeat/Repeat";
import useGeneratorStore from "../../store/generatoreStore";

interface RRuleGeneratorProps {
  datePickerStartLabel?: string;
  datePickerEndLabel?: string;
  datePickerInitialDate?: DateTime;
  // enableSmallScreenDetection?: boolean;
  // smallScreenBreakpoint?: number;
}

const RRuleGenerator = ({
  datePickerStartLabel = "Start Date",
  datePickerEndLabel = "End Date",
  // TODO implement small screen detection
  // enableSmallScreenDetection = true,
  // smallScreenBreakpoint = 350,
  datePickerInitialDate,
}: RRuleGeneratorProps) => {
  const {
    // repeatDetails,
    // setRepeatDetails,
    // validationErrors,
    // validateForm,
    frequency,
    setFrequency,
  } = useGeneratorStore();
  const [startDate, setStartDate] = useState<DateTime>(datePickerInitialDate ?? DateTime.now());
  const [endDate, setEndDate] = useState<DateTime | null>(null);

  return (
    <Stack direction="column" spacing={2}>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <DatePicker
          label={datePickerStartLabel}
          value={startDate}
          onChange={(newDate) => setStartDate(newDate)}
        />

        <RepeatSelect
          frequencySelected={frequency}
          onFrequencyChange={setFrequency}
        />

        <DatePicker
          label={datePickerEndLabel}
          value={endDate}
          // earliest possible end date is the start date
          minDate={startDate}
          disabled={frequency === Frequency.SECONDLY || frequency === Frequency.MINUTELY || !startDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

      </LocalizationProvider>
    </Stack>
  );
};

export default RRuleGenerator;
