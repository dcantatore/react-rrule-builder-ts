// TODO does RRULE have a built-in mapping for this?
import { Frequency } from "rrule";
import { Months, Weekday, WeekdayExtras } from "./Repeat.types";

export const frequencyTextMapping = {
  [Frequency.YEARLY]: "Yearly",
  [Frequency.MONTHLY]: "Monthly",
  [Frequency.WEEKLY]: "Weekly",
  [Frequency.DAILY]: "Daily",
  [Frequency.HOURLY]: "Hourly",
  [Frequency.MINUTELY]: "Minutely",
  [Frequency.SECONDLY]: "Secondly",
};

export const weekdayFullTextMapping = {
  [Weekday.MO]: "Monday",
  [Weekday.TU]: "Tuesday",
  [Weekday.WE]: "Wednesday",
  [Weekday.TH]: "Thursday",
  [Weekday.FR]: "Friday",
  [Weekday.SA]: "Saturday",
  [Weekday.SU]: "Sunday",
  [WeekdayExtras.DAY]: "Day",
  [WeekdayExtras.WEEKDAY]: "Weekday",
  [WeekdayExtras.WEEKEND]: "Weekend",
};

export const weekdayShortTextMapping = {
  [Weekday.MO]: "Mon",
  [Weekday.TU]: "Tue",
  [Weekday.WE]: "Wed",
  [Weekday.TH]: "Thu",
  [Weekday.FR]: "Fri",
  [Weekday.SA]: "Sat",
  [Weekday.SU]: "Sun",
};

export const onTheTextMapping = {
  1: "First",
  2: "Second",
  3: "Third",
  4: "Fourth",
  "-1": "Last",
};

export const monthFullTextMapping = {
  [Months.JAN]: "January",
  [Months.FEB]: "February",
  [Months.MAR]: "March",
  [Months.APR]: "April",
  [Months.MAY]: "May",
  [Months.JUN]: "June",
  [Months.JUL]: "July",
  [Months.AUG]: "August",
  [Months.SEP]: "September",
  [Months.OCT]: "October",
  [Months.NOV]: "November",
  [Months.DEC]: "December",
};

export const monthShortTextMapping = {
  [Months.JAN]: "Jan",
  [Months.FEB]: "Feb",
  [Months.MAR]: "Mar",
  [Months.APR]: "Apr",
  [Months.MAY]: "May",
  [Months.JUN]: "Jun",
  [Months.JUL]: "Jul",
  [Months.AUG]: "Aug",
  [Months.SEP]: "Sep",
  [Months.OCT]: "Oct",
  [Months.NOV]: "Nov",
  [Months.DEC]: "Dec",
};

export const addOrRemoveFromArray = (array: number[], value: number) => {
  if (array.includes(value)) {
    return array.filter((item) => item !== value);
  }

  return [...array, value];
};
