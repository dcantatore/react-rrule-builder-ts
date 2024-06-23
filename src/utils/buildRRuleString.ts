import { RRule, Frequency, Options } from "rrule";
import { DateTime } from "luxon";
import { AllRepeatDetails } from "../components/Repeat/Repeat.types";
import { EndDetails, EndType } from "../components/End/End.types";

export interface BuildRRuleStringParams {
  frequency: Frequency;
  startDate: DateTime | null;
  repeatDetails: AllRepeatDetails;
  endDetails: EndDetails;
}

export const buildRRuleString = (options: BuildRRuleStringParams) => {
  const {
    frequency, startDate, repeatDetails, endDetails,
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
    dtstart: startDate?.toJSDate() ?? null,
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
      ruleOptions.until = endDetails.endDate?.toJSDate() ?? null;
      break;
    default:
      break;
  }

  const rrule = new RRule(ruleOptions);
  return rrule.toString();
};
