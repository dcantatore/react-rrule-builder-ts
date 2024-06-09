import { Frequency } from "rrule";

export enum Weekday {
  MO = "MO",
  TU = "TU",
  WE = "WE",
  TH = "TH",
  FR = "FR",
  SA = "SA",
  SU = "SU",
}

export interface RepeatDetailsBase {
  frequency: Frequency;
  interval: number;
}

export  interface YearlyRepeatDetails extends RepeatDetailsBase {
  frequency: Frequency.YEARLY;
  bySetPos?: number[];
  byDay?: Weekday[];
  byMonthDay?: number[];
  byMonth?: number[];
  // yearly has no interval
  interval: never;
}

 export interface MonthlyRepeatDetails extends RepeatDetailsBase {
  frequency: Frequency.MONTHLY;
  bySetPos?: number[];
  byDay?: Weekday[];
  byMonthDay?: number[];
}

export interface WeeklyRepeatDetails extends RepeatDetailsBase {
  frequency: Frequency.WEEKLY;
  byDay: Weekday[];
}

export interface DailyRepeatDetails extends RepeatDetailsBase {
  frequency: Frequency.DAILY;
}

export interface HourlyRepeatDetails extends RepeatDetailsBase {
  frequency: Frequency.HOURLY;
}

export interface MinutelyRepeatDetails extends RepeatDetailsBase {
  frequency: Frequency.MINUTELY;
}

export interface SecondlyRepeatDetails extends RepeatDetailsBase {
  frequency: Frequency.SECONDLY;
}

export type RepeatDetails =
  | YearlyRepeatDetails
  | MonthlyRepeatDetails
  | WeeklyRepeatDetails
  | DailyRepeatDetails
  | HourlyRepeatDetails
  | MinutelyRepeatDetails
  | SecondlyRepeatDetails;

// TODO may not need these:
// Type narrowing functions
export const isYearlyRepeatDetails = (details: RepeatDetails): details is YearlyRepeatDetails => details.frequency === Frequency.YEARLY;
export const isMonthlyRepeatDetails = (details: RepeatDetails): details is MonthlyRepeatDetails => details.frequency === Frequency.MONTHLY;
export const isWeeklyRepeatDetails = (details: RepeatDetails): details is WeeklyRepeatDetails => details.frequency === Frequency.WEEKLY;
export const isDailyRepeatDetails = (details: RepeatDetails): details is DailyRepeatDetails => details.frequency === Frequency.DAILY;
export const isHourlyRepeatDetails = (details: RepeatDetails): details is HourlyRepeatDetails => details.frequency === Frequency.HOURLY;
// eslint-disable-next-line max-len
export const isMinutelyRepeatDetails = (details: RepeatDetails): details is MinutelyRepeatDetails => details.frequency === Frequency.MINUTELY;
// eslint-disable-next-line max-len
export const isSecondlyRepeatDetails = (details: RepeatDetails): details is SecondlyRepeatDetails => details.frequency === Frequency.SECONDLY;
