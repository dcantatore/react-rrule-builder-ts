import { RRule, Frequency, Options } from "rrule";
import { MuiPickersAdapter } from "@mui/x-date-pickers";
import { AllRepeatDetails } from "../components/Repeat/Repeat.types";
import { EndDetails, EndType } from "../components/End/End.types";

export interface BuildRRuleStringParams<TDate> {
  frequency: Frequency;
  startDate: TDate | null;
  repeatDetails: AllRepeatDetails;
  endDetails: EndDetails<TDate>;
  dateAdapter: MuiPickersAdapter<TDate>;
}

export const buildRRuleString = (options: BuildRRuleStringParams<MuiPickersAdapter<any>>): string => {
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
    interval: 0,
    tzid: null,
    until: null,
    wkst: null,
    freq: frequency,
    dtstart: startDate ? dateAdapter?.toJsDate(startDate) : null,
  };

  if (repeatDetails.interval) {
    ruleOptions.interval = repeatDetails.interval;
  }

  if ("byDay" in repeatDetails && repeatDetails.byDay) {
    ruleOptions.byweekday = repeatDetails.byDay.map((day) => RRule[day]);
  }

  if ("byMonthDay" in repeatDetails && repeatDetails.byMonthDay) {
    ruleOptions.bymonthday = repeatDetails.byMonthDay;
  }

  if ("byMonth" in repeatDetails && repeatDetails.byMonth) {
    ruleOptions.bymonth = repeatDetails.byMonth;
  }

  if ("bySetPos" in repeatDetails && repeatDetails.bySetPos) {
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
