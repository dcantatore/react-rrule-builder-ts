import React, { useMemo, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { PickersTimezone } from "@mui/x-date-pickers";
import useBuilderStore from "../../store/builderStore";
import { EndType } from "./End.types";
import { getLabelSize } from "../Repeat/utils";

interface EndProps {
  datePickerEndLabel: string;
  inputSize: TextFieldProps["size"];
  inputVariant: TextFieldProps["variant"];
  enableOpenOnClickDatePicker: boolean;
  timeZone: PickersTimezone
}

const End = ({
  datePickerEndLabel,
  inputSize,
  inputVariant,
  enableOpenOnClickDatePicker,
  timeZone,
}: EndProps) => {
  const {
    endDetails, setEndDetails, minEndDate,
  } = useBuilderStore();
  const labelSize = getLabelSize(inputSize);
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  return (
    <>
      <FormControl>
        <InputLabel id="end-label" size={labelSize}>End</InputLabel>
        <Select
          value={endDetails?.endingType}
          onChange={(e) => setEndDetails({ ...endDetails, endingType: e.target.value as EndType })}
          labelId="end-label"
          label="End"
          size={inputSize}
          variant={inputVariant}
        >
          {Object.entries(EndType).map(([key, value]) => (
            <MenuItem key={key} value={value}>
              <Typography fontSize={inputSize} sx={{ textTransform: "capitalize" }}>
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
           timezone={timeZone}
            // earliest possible end date is the start date plus one day
           minDate={minEndDate ?? undefined}
           open={enableOpenOnClickDatePicker ? datePickerOpen : undefined}
           onOpen={enableOpenOnClickDatePicker ? () => setDatePickerOpen(true) : undefined}
           onClose={enableOpenOnClickDatePicker ? () => setDatePickerOpen(false) : undefined}
           onChange={(newDate) => setEndDetails({ ...endDetails, endDate: newDate })}
           slotProps={{
             field: { clearable: true, onClear: () => setEndDetails({ ...endDetails, endDate: null }) },
             textField: {
               size: inputSize,
               variant: inputVariant,
               onClick: enableOpenOnClickDatePicker ? () => setDatePickerOpen(true) : undefined,
             },
           }}
         />
       )}
      {endDetails?.endingType === EndType.AFTER && (
        <FormControl>
          <TextField
            label="Occurrences"
            type="number"
            value={endDetails.occurrences ?? ""}
            onChange={(e) => setEndDetails({ ...endDetails, occurrences: parseInt(e.target.value, 10) })}
            size={inputSize}
            variant={inputVariant}
          />
        </FormControl>
      )}

    </>
  );
};

export default End;
