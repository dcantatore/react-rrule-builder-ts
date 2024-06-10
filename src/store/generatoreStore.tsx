import { create } from "zustand";
import * as Yup from "yup";
import { Frequency } from "rrule";
import { DateTime } from "luxon";
import { RepeatDetails } from "../components/Repeat/Repeat.types";
import getValidationSchema from "../validation/validationSchema";

interface GeneratorState {
  repeatDetails: RepeatDetails;
  frequency: Frequency;
  startDate: DateTime;
  validationErrors: Record<string, string>;
}

interface GeneratorActions {
  validationErrors: Record<string, string>;
  setFrequency: (frequency: Frequency) => void;
  setRepeatDetails: (details: RepeatDetails) => void;
  validateForm: () => Promise<boolean>;
}

const initialState: GeneratorState = {
  repeatDetails: { interval: 1 } as RepeatDetails,
  frequency: Frequency.DAILY,
  startDate: DateTime.now(),
  validationErrors: {},
};

const useGeneratorStore = create<GeneratorState & GeneratorActions>((set, get) => ({
  ...initialState,
  validationErrors: {},
  setFrequency: (frequency) => {
    set({ frequency });
    set({ repeatDetails: { } as RepeatDetails });
    set({ validationErrors: {} });
  },
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
}));

export default useGeneratorStore;
