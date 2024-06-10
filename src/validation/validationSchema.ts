import * as Yup from "yup";
import { Frequency } from "rrule";
import { Weekday } from "../components/Repeat/Repeat.types";

const repeatDetailsBaseSchema = Yup.object({
  frequency: Yup.mixed<Frequency>().required("Frequency is required test"),
  interval: Yup.number().required(),
});

const yearlyRepeatDetailsSchema = repeatDetailsBaseSchema.shape({
  frequency: Yup.mixed<Frequency.YEARLY>().required(),
  bySetPos: Yup.array().of(Yup.number()).optional(),
  byDay: Yup.array().of(Yup.mixed<Weekday>()).optional(),
  byMonthDay: Yup.array().of(Yup.number()).optional(),
  byMonth: Yup.array().of(Yup.number()).optional(),
  // TODO make not allowed and clear when frequency is not yearly
  interval: Yup.mixed<never>().optional().notRequired(),
});

const monthlyRepeatDetailsSchema = repeatDetailsBaseSchema.shape({
  frequency: Yup.mixed<Frequency.MONTHLY>().required(),
  interval: Yup.number().required(),
  bySetPos: Yup.array().of(Yup.number()).optional(),
  byDay: Yup.array().of(Yup.mixed<Weekday>()).optional(),
  byMonthDay: Yup.array().of(Yup.number()).optional(),
});

const weeklyRepeatDetailsSchema = repeatDetailsBaseSchema.shape({
  frequency: Yup.mixed<Frequency.WEEKLY>().required(),
  interval: Yup.number().required(),
  byDay: Yup.array().of(Yup.mixed<Weekday>()).required(),
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
