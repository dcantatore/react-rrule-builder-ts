import { create } from "zustand";
import * as Yup from "yup";
import { Frequency, RRule } from "rrule";
import { DateTime } from "luxon";
import { RepeatDetails } from "../components/Repeat/Repeat.types";
import getValidationSchema from "../validation/validationSchema";
import { EndDetails, EndType } from "../components/End/End.types";
import { buildRRuleString } from "../utils/buildRRuleString";

interface BuilderState {
  repeatDetails: RepeatDetails;
  frequency: Frequency;
  startDate: DateTime | null;
  validationErrors: Record<string, string>;
  endDetails: EndDetails;
  RRuleString?: string;
}

interface BuilderActions {
  validationErrors: Record<string, string>;
  setFrequency: (frequency: Frequency) => void;
  setRepeatDetails: (details: RepeatDetails) => void;
  validateForm: () => Promise<boolean>;
  setEndDetails: (details: EndDetails) => void;
  setStartDate: (startDate: DateTime | null) => void;
  buildRRuleString: () => void;
  onChange?: (rruleString: string) => void;
  setOnChange: (onChange: (rruleString: string) => void) => void;
  setStoreFromRRuleString: (rruleString: string) => void;
}

const initialState: BuilderState = {
  repeatDetails: { interval: 1 } as RepeatDetails,
  frequency: Frequency.DAILY,
  startDate: DateTime.now(),
  validationErrors: {},
  endDetails: { endingType: EndType.NEVER, endDate: null } as EndDetails,
};

const useBuilderStore = create<BuilderState & BuilderActions>((set, get) => ({
  ...initialState,
  validationErrors: {},
  setFrequency: (frequency) => {
    // clear repeat details when changing frequency
    set({ frequency });
    set({ repeatDetails: { } as RepeatDetails });
    // clear validation errors
    set({ validationErrors: {} });

    // rebuild the rrule string
    get().buildRRuleString();
  },
  setStartDate: (startDate) => {
    const { endDate } = get().endDetails;
    // don't allow end date to be before start date, add one 1 day
    if (endDate && startDate && startDate > endDate) {
      set({ endDetails: { ...get().endDetails, endDate: startDate.plus({ days: 1 }) } });
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
      repeatDetails, frequency, startDate, endDetails,
    } = get();

    const output = buildRRuleString({
      frequency,
      startDate,
      repeatDetails,
      endDetails,
    });

    set({ RRuleString: output });

    // if there is an onChange function, call it with the output
    const { onChange } = get();
    if (onChange) onChange(output);
  },
  setOnChange: (onChange) => set({ onChange }),
  setStoreFromRRuleString: (rruleString) => {
    const parsedObj = RRule.parseString(rruleString);
    const {
      setFrequency, setStartDate, setEndDetails, setRepeatDetails,
    } = get();

    // set the frequency
    if (parsedObj.freq) {
      setFrequency(parsedObj.freq);
    }
    // set the start date
    if (parsedObj.dtstart) {
      setStartDate(DateTime.fromJSDate(parsedObj.dtstart));
    }

    // set the end date
    if (parsedObj.until) {
      setEndDetails({ endingType: EndType.ON, endDate: DateTime.fromJSDate(parsedObj.until) });
    } else if (parsedObj.count) {
      setEndDetails({ endingType: EndType.AFTER, occurrences: parsedObj.count });
    }

    // set the repeat details
    const repeatDetails = {
      interval: parsedObj.interval,
      byDay: parsedObj.byweekday,
      byMonthDay: parsedObj.bymonthday,
      byMonth: parsedObj.bymonth,
      bySetPos: parsedObj.bysetpos,
    };

    // TODO finish fixing the types
    setRepeatDetails(repeatDetails);
  },
}));

export default useBuilderStore;
