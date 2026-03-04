import * as Yup from "yup";
import { Frequency } from "rrule";
import { Weekday } from "../components/Repeat/Repeat.types";


const repeatDetailsBaseSchema = Yup.object({
  frequency: Yup.mixed<Frequency>().required("Frequency is required"),
  interval: Yup.number().required().min(1, "Interval must be at least 1"),
});

const yearlyRepeatDetailsSchema = repeatDetailsBaseSchema.shape({
  frequency: Yup.mixed<Frequency.YEARLY>().required(),
  bySetPos: Yup.array().of(Yup.number().min(-1).max(4)).optional(),
  byDay: Yup.array().of(Yup.mixed<Weekday>()).optional(),
  byMonthDay: Yup.array().of(Yup.number().min(1).max(31)).optional(),
  byMonth: Yup.array().of(Yup.number().min(1).max(12)).optional(),
  interval: Yup.number().optional().notRequired().min(1, "Interval must be at least 1"),
});

const monthlyRepeatDetailsSchema = repeatDetailsBaseSchema.shape({
  frequency: Yup.mixed<Frequency.MONTHLY>().required(),
  interval: Yup.number().required().min(1, "Interval must be at least 1"),
  bySetPos: Yup.array().of(Yup.number().min(-1).max(4)).optional(),
  byDay: Yup.array().of(Yup.mixed<Weekday>()).optional(),
  byMonthDay: Yup.array().of(Yup.number().min(1).max(31)).optional(),
});

const weeklyRepeatDetailsSchema = repeatDetailsBaseSchema.shape({
  frequency: Yup.mixed<Frequency.WEEKLY>().required(),
  interval: Yup.number().required().min(1, "Interval must be at least 1"),
  byDay: Yup.array().of(Yup.mixed<Weekday>()).required().min(1, "At least one day must be selected"),
});

const getValidationSchema = (frequency: Frequency) => {
  switch (frequency) {
    case Frequency.YEARLY:
      return yearlyRepeatDetailsSchema;
    case Frequency.MONTHLY:
      return monthlyRepeatDetailsSchema;
    case Frequency.WEEKLY:
      return weeklyRepeatDetailsSchema;
    default:
      return repeatDetailsBaseSchema;
  }
};

export default getValidationSchema;
