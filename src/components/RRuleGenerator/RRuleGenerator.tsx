import React, { useState } from "react";

import Stack from "@mui/material/Stack";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { DateTime } from "luxon";
import { Frequency } from "rrule";
import RepeatSelect from "../Repeat/Repeat";

interface RRuleGeneratorProps {
  datePickerStartLabel?: string;
  datePickerEndLabel?: string;
  datePickerInitialDate?: DateTime;
}

const RRuleGenerator = ({
  datePickerStartLabel = "Start Date",
  datePickerEndLabel = "End Date",
  datePickerInitialDate,
}: RRuleGeneratorProps) => {
  const [startDate, setStartDate] = useState<DateTime>(datePickerInitialDate ?? DateTime.now());
  const [endDate, setEndDate] = useState<DateTime | null>(null);
  const [rruleFrequency, setRruleFrequency] = useState<Frequency>(Frequency.DAILY);

  return (
    <Stack direction="column" spacing={2}>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <DatePicker
          label={datePickerStartLabel}
          value={startDate}
          onChange={(newDate) => setStartDate(newDate)}
        />

        <RepeatSelect
          frequencySelected={rruleFrequency}
          onFrequencyChange={setRruleFrequency}
        />

        <DatePicker
          label={datePickerEndLabel}
          value={endDate}
          // earliest possible end date is the start date
          minDate={startDate}
          disabled={rruleFrequency === Frequency.SECONDLY || rruleFrequency === Frequency.MINUTELY || !startDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

      </LocalizationProvider>
    </Stack>
  );
};

export default RRuleGenerator;
