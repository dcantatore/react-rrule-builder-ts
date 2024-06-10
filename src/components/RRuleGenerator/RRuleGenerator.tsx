import React, { useEffect } from "react";

import Stack from "@mui/material/Stack";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { DateTime } from "luxon";
import RepeatSelect from "../Repeat/Repeat";
import useGeneratorStore from "../../store/generatoreStore";
import End from "../End/End";

interface RRuleGeneratorProps {
  datePickerStartLabel?: string;
  datePickerEndLabel?: string;
  datePickerInitialDate?: DateTime;
  // enableSmallScreenDetection?: boolean;
  // smallScreenBreakpoint?: number;
  // dense?: boolean;
}

const RRuleGenerator = ({
  datePickerStartLabel = "Start Date",
  datePickerEndLabel = "End Date",
  // TODO implement small screen detection
  // enableSmallScreenDetection = true,
  // smallScreenBreakpoint = 350,
  // TODO implement dense mode - make all things smaller with less padding
  // dense = false,
  datePickerInitialDate,
}: RRuleGeneratorProps) => {
  const {
    // TODO Implement validation errors on date picker
    // validationErrors,
    startDate,
    setStartDate,
    frequency,
    setFrequency,
  } = useGeneratorStore();

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

  useEffect(() => {
    if (datePickerInitialDate) {
      setStartDate(datePickerInitialDate);
    }
  }, [datePickerInitialDate, setStartDate]);

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
        <End datePickerEndLabel={datePickerEndLabel} />
      </LocalizationProvider>
    </Stack>
  );
};

export default RRuleGenerator;
