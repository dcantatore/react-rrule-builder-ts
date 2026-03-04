import { RRule, Frequency, Options } from "rrule";
import { MuiPickersAdapter } from "@mui/x-date-pickers";
import { DateTime } from "luxon";
import { AllRepeatDetails } from "../components/Repeat/Repeat.types";
import { EndDetails, EndType } from "../components/End/End.types";

export interface BuildRRuleStringParams<TDate extends DateTime<boolean>> {
  frequency: Frequency;
  startDate: TDate | null;
  repeatDetails: AllRepeatDetails;
  endDetails: EndDetails<TDate>;
  dateAdapter: MuiPickersAdapter<TDate>;
}

export const buildRRuleString = <TDate extends DateTime<boolean>>(
  options: BuildRRuleStringParams<TDate>,
): string => {
  const {
    frequency, startDate, repeatDetails, endDetails, dateAdapter,
  } = options;

  const ruleOptions: Options = {
    byeaster: null,
    byhour: null,
    byminute: null,
    bymonth: null,
    bymonthday: null,
    bynmonthday: null,
    bynweekday: null,
    bysecond: null,
    bysetpos: null,
    byweekday: null,
    byweekno: null,
    byyearday: null,
    count: null,
    interval: 1,
    tzid: null,
    until: null,
    wkst: null,
    freq: frequency,
    dtstart: startDate ? dateAdapter?.toJsDate(startDate) : null,
  };

  if (repeatDetails.interval) {
    ruleOptions.interval = repeatDetails.interval;
  }

  if (repeatDetails.byDay.length > 0) {
    ruleOptions.byweekday = repeatDetails.byDay.map((day) => RRule[day]);
  }

  if (repeatDetails.byMonthDay.length > 0) {
    ruleOptions.bymonthday = repeatDetails.byMonthDay;
  }

  if (repeatDetails.byMonth.length > 0) {
    ruleOptions.bymonth = repeatDetails.byMonth;
  }

  if (repeatDetails.bySetPos.length > 0) {
    ruleOptions.bysetpos = repeatDetails.bySetPos;
  }

  switch (endDetails.endingType) {
    case EndType.NEVER:
      break;
    case EndType.AFTER:
      ruleOptions.count = endDetails.occurrences ?? null;
      break;
    case EndType.ON:
      ruleOptions.until = endDetails.endDate ? dateAdapter.toJsDate(endDetails.endDate) : null;
      break;
    default:
      break;
  }

  const rrule = new RRule(ruleOptions);
  return rrule.toString();
};
