import React from "react";
import { Frequency } from "rrule";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import useBuilderStore from "../../store/builderStore";
import { EndType } from "./End.types";

interface EndProps {
  datePickerEndLabel: string;
}

const End = ({ datePickerEndLabel }: EndProps) => {
  const {
    frequency, startDate, endDetails, setEndDetails,
  } = useBuilderStore();
  return (
    <>
      <FormControl>
        <InputLabel id="end-label">End</InputLabel>
        <Select
          value={endDetails?.endingType}
          onChange={(e) => setEndDetails({ ...endDetails, endingType: e.target.value as EndType })}
          labelId="end-label"
          label="End"
        >
          {Object.entries(EndType).map(([key, value]) => (
            <MenuItem key={key} value={value}>
              <Typography sx={{ textTransform: "capitalize" }}>
                {value}
              </Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {endDetails?.endingType === EndType.ON
       && (
         <DatePicker
           label={datePickerEndLabel}
           value={endDetails?.endDate}
              // earliest possible end date is the start date
           minDate={startDate ?? undefined}
           disabled={frequency === Frequency.SECONDLY || frequency === Frequency.MINUTELY || !startDate}
           onChange={(newDate) => setEndDetails({ ...endDetails, endDate: newDate })}
         />
       )}
      {endDetails?.endingType === EndType.AFTER && (
        <FormControl>
          <TextField
            label="Occurrences"
            type="number"
            value={endDetails.occurrences ?? ""}
            onChange={(e) => setEndDetails({ ...endDetails, occurrences: parseInt(e.target.value, 10) })}
          />
        </FormControl>
      )}

    </>
  );
};

export default End;
