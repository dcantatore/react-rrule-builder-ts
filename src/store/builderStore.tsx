import { create } from "zustand";
import * as Yup from "yup";
import { Frequency, RRule } from "rrule";
import { WeekdayStr } from "rrule/dist/esm/weekday";
import isNil from "lodash/isNil";

import { MuiPickersAdapter } from "@mui/x-date-pickers";
import { DateTime } from "luxon";
import {
  AllRepeatDetails, MonthBy, Weekday, YearlyBy,
} from "../components/Repeat/Repeat.types";
import getValidationSchema from "../validation/validationSchema";
import { EndDetails, EndType } from "../components/End/End.types";
import { buildRRuleString } from "../utils/buildRRuleString";

interface BuilderState<TDate extends DateTime<boolean>> {
  repeatDetails: AllRepeatDetails;
  frequency: Frequency;
  startDate: TDate | null;
  dateAdapter?: MuiPickersAdapter<TDate>;
  validationErrors: Record<string, string>;
  endDetails: EndDetails<TDate>;
  RRuleString?: string;
  radioValue: MonthBy | YearlyBy | null,
  minEndDate?: TDate;
}

interface BuilderActions<TDate extends DateTime<boolean>> {
  validationErrors: Record<string, string>;
  setAdapter: (dateAdapter: MuiPickersAdapter<TDate>) => void;
  setFrequency: (frequency: Frequency) => void;
  setRepeatDetails: (details: AllRepeatDetails) => void;
  validateForm: () => Promise<boolean>;
  setEndDetails: (details: EndDetails<TDate>) => void;
  setStartDate: (startDate: TDate | null) => void;
  buildRRuleString: () => void;
  onChange?: (rruleString: string) => void;
  setOnChange: (onChange: (rruleString: string) => void) => void;
  setStoreFromRRuleString: (rruleString: string) => void;
  setRadioValue: (radioValue: MonthBy | YearlyBy | null) => void;
}

export const baseRepeatDetails: AllRepeatDetails = {
  interval: 1,
  bySetPos: [],
  byMonth: [],
  byMonthDay: [],
  byDay: [],
};

const initialState: BuilderState<DateTime> = {
  repeatDetails: baseRepeatDetails,
  frequency: Frequency.WEEKLY,
  startDate: null,
  validationErrors: {},
  endDetails: { endingType: EndType.NEVER, endDate: null, occurrences: null },
  radioValue: null,
};

const useBuilderStore = create<BuilderState<DateTime> & BuilderActions<DateTime>>((set, get) => ({
  ...initialState,
  validationErrors: {},
  setRadioValue: (radioValue) => set({ radioValue }),
  setFrequency: (frequency) => {
    set({ frequency });
    // clear repeat details when changing frequency
    set({ repeatDetails: { ...baseRepeatDetails } });
    // clear validation errors
    set({ validationErrors: {} });
    // rebuild the rrule string
    get().buildRRuleString();
  },
  setStartDate: (startDate) => {
    const { endDate } = get().endDetails;
    const { dateAdapter } = get();
    // without a date adapter, we can't do anything
    if (!dateAdapter) {
      return;
    }

    // set the min end date
    if (startDate) {
      const minEndDate = dateAdapter.addDays(startDate, 1);
      set({ minEndDate });
    }

    // Adjust the end date if the start date is on or after it
    if (endDate && startDate
      && (dateAdapter.isEqual(startDate, endDate) || dateAdapter.isAfter(startDate, endDate))) {
      // Adjust the end date to ensure it is not before the start date
      const adjustedEndDate = dateAdapter.addDays(startDate, 1);
      set({
        endDetails: { ...get().endDetails, endDate: adjustedEndDate },
      });
    }
    // set the value
    set({ startDate });
    // clear validation errors
    set({ validationErrors: {} });
    // rebuild the rrule string
    get().buildRRuleString();
  },
  setEndDetails: (details) => {
    set({ endDetails: details });

    // rebuild the rrule string
    get().buildRRuleString();
  },
  setRepeatDetails: (details) => {
    set({ repeatDetails: details });
    // rebuild the rrule string
    get().buildRRuleString();
  },
  validateForm: async () => {
    const { repeatDetails, frequency } = get();
    if (isNil(frequency)) {
      set({ validationErrors: { frequency: "Frequency is required" } });
      return false;
    }
    const validationSchema = getValidationSchema(frequency);
    try {
      await validationSchema.validate({ ...repeatDetails, frequency }, { abortEarly: false });
      set({ validationErrors: {} });
      return true;
    } catch (error) {
      const errors = (error as Yup.ValidationError).inner.reduce(
        (acc: Record<string, string>, err) => ({
          ...acc,
          [err.path!]: err.message,
        }),
        {},
      );
      set({ validationErrors: errors });
      return false;
    }
  },
  buildRRuleString: () => {
    const {
      repeatDetails, frequency, startDate, endDetails, dateAdapter,
    } = get();

    if (!dateAdapter) {
      return;
    }

    const output = buildRRuleString({
      frequency,
      startDate,
      repeatDetails,
      endDetails,
      dateAdapter,
    });

    set({ RRuleString: output });

    // if there is an onChange function, call it with the output
    const { onChange } = get();
    if (onChange) onChange(output);
  },
  setOnChange: (onChange) => set({ onChange }),
  setStoreFromRRuleString: (rruleString) => {
    let parsedObj;
    try {
      parsedObj = RRule.parseString(rruleString);
    } catch (error) {
      console.error("Failed to parse RRULE string:", error);
      set({ validationErrors: { rruleString: "Invalid RRULE string" } });
      return;
    }
    const { dateAdapter } = get();

    // --- Build all state up front, then apply once ---

    // frequency
    let frequency = initialState.frequency;
    if (!isNil(parsedObj.freq)) {
      frequency = parsedObj.freq;
    }

    // radio value
    let radioValue: MonthBy | YearlyBy | null = null;
    if (frequency === Frequency.YEARLY) {
      if (parsedObj.byweekday || parsedObj.bysetpos) {
        radioValue = YearlyBy.BYSETPOS;
      } else if (parsedObj.bymonth || parsedObj.bymonthday) {
        radioValue = YearlyBy.BYMONTH;
      }
    } else if (frequency === Frequency.MONTHLY) {
      if (parsedObj.bymonthday) {
        radioValue = MonthBy.BYMONTHDAY;
      } else if (parsedObj.bysetpos || parsedObj.byweekday) {
        radioValue = MonthBy.BYSETPOS;
      }
    }

    // start date
    let startDate = initialState.startDate;
    let minEndDate;
    if (parsedObj.dtstart && dateAdapter) {
      startDate = dateAdapter.date(parsedObj.dtstart.toISOString()) ?? null;
      if (startDate) {
        minEndDate = dateAdapter.addDays(startDate, 1);
      }
    }

    // end details
    let endDetails = initialState.endDetails;
    if (parsedObj.until && dateAdapter) {
      const parsedDateEnd = dateAdapter.date(parsedObj.until.toISOString()) ?? null;
      endDetails = { endingType: EndType.ON, endDate: parsedDateEnd, occurrences: null };
    } else if (parsedObj.count) {
      endDetails = { endingType: EndType.AFTER, occurrences: parsedObj.count, endDate: null };
    }

    // repeat details
    const repeatDetails: AllRepeatDetails = {
      interval: isNil(parsedObj.interval) ? null : parsedObj.interval,
      byDay: [],
      byMonthDay: [],
      byMonth: [],
      bySetPos: [],
    };

    if (parsedObj.bymonth) {
      if (Array.isArray(parsedObj.bymonth)) {
        repeatDetails.byMonth = parsedObj.bymonth;
      } else {
        repeatDetails.byMonth = [parsedObj.bymonth];
      }
    }

    if (parsedObj.bymonthday) {
      if (Array.isArray(parsedObj.bymonthday)) {
        repeatDetails.byMonthDay = parsedObj.bymonthday;
      } else {
        repeatDetails.byMonthDay = [parsedObj.bymonthday];
      }
    }

    if (parsedObj.byweekday) {
      if (!Array.isArray(parsedObj.byweekday)) {
        repeatDetails.byDay = [parsedObj.byweekday as Weekday];
      } else {
        repeatDetails.byDay = parsedObj.byweekday.map((day) => {
          if (typeof day !== "number") {
            // @ts-ignore
            return Weekday[day];
          }
          // TODO what is the number parse to weekday?
          return day as unknown as WeekdayStr;
        });
      }
    }

    if (parsedObj.bysetpos) {
      if (Array.isArray(parsedObj.bysetpos)) {
        repeatDetails.bySetPos = parsedObj.bysetpos;
      } else {
        repeatDetails.bySetPos = [parsedObj.bysetpos];
      }
    }

    // --- Single batched update ---
    set({
      frequency,
      radioValue,
      startDate,
      minEndDate,
      endDetails,
      repeatDetails,
      validationErrors: {},
    });

    // build once with final state, fires onChange once with correct value
    get().buildRRuleString();
  },
  setAdapter: (dateAdapter) => {
    set({ dateAdapter });
  },
}));

export default useBuilderStore;
