export enum Weekday {
  MO = "MO",
  TU = "TU",
  WE = "WE",
  TH = "TH",
  FR = "FR",
  SA = "SA",
  SU = "SU",
}

export enum Months {
  JAN = "1",
  FEB = "2",
  MAR = "3",
  APR = "4",
  MAY = "5",
  JUN = "6",
  JUL = "7",
  AUG = "8",
  SEP = "9",
  OCT = "10",
  NOV = "11",
  DEC = "12",
}

export enum MonthBy {
  BYMONTHDAY = "BYMONTHDAY",
  BYSETPOS = "BYSETPOS",
}

export enum YearlyBy {
  BYMONTH = "BYMONTH",
  BYSETPOS = "BYSETPOS",
}

export enum WeekdayExtras {
  DAY = "DAY",
  WEEKDAY = "WEEKDAY",
  WEEKEND = "WEEKEND",
}

export enum OnThe {
  FIRST = "1",
  SECOND = "2",
  THIRD = "3",
  FOURTH = "4",
  LAST = "-1",
}

export const AllWeekDayOptions = {
  ...Weekday,
  ...WeekdayExtras,

};

export interface RepeatDetailsBase {
  interval: number | null;
}

export interface YearlyRepeatDetails extends RepeatDetailsBase {
  bySetPos: number[];
  // this ends up being byweekday
  byDay: Weekday[];
  byMonthDay: number[] | null;
  byMonth: number[] | null;
  // it is possible to have interval, it would mean every x years
  interval: never;
}

export interface MonthlyRepeatDetails extends RepeatDetailsBase {
  bySetPos: number[];
  // this ends up being byweekday
  byDay: Weekday[];
  byMonthDay: number[] | null;
}

export interface WeeklyRepeatDetails extends RepeatDetailsBase {
  // this ends up being byweekday
  byDay: Weekday[];
}

export type RepeatDetails =
  | YearlyRepeatDetails
  | MonthlyRepeatDetails
  | WeeklyRepeatDetails
  | RepeatDetailsBase;
