import { create } from "zustand";
import * as Yup from "yup";
import { Frequency } from "rrule";
import { DateTime } from "luxon";
import { RepeatDetails } from "../components/Repeat/Repeat.types";
import getValidationSchema from "../validation/validationSchema";
import { EndDetails, EndType } from "../components/End/End.types";
import { buildRRuleString } from "../utils/buildRRule";

interface BuilderState {
  repeatDetails: RepeatDetails;
  frequency: Frequency;
  startDate: DateTime;
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
  setStartDate: (startDate: DateTime) => void;
  buildRRuleString: () => void;
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
    set({ frequency });
    set({ repeatDetails: { } as RepeatDetails });
    set({ validationErrors: {} });
  },
  setStartDate: (startDate) => {
    const { endDate } = get().endDetails;
    // don't allow end date to be before start date, add one 1 day
    if (endDate && startDate > endDate) {
      set({ endDetails: { ...get().endDetails, endDate: startDate.plus({ days: 1 }) } });
    }
    set({ startDate });
  },
  setEndDetails: (details) => set({ endDetails: details }),
  setRepeatDetails: (details) => set({ repeatDetails: details }),
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
  },
}));

export default useBuilderStore;
