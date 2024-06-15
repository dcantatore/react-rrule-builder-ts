import { RRule, Frequency } from "rrule";
import { DateTime } from "luxon";
import { RepeatDetails } from "../components/Repeat/Repeat.types";
import { EndDetails, EndType } from "../components/End/End.types";

export interface RRuleOptions {
  frequency: Frequency;
  startDate: DateTime;
  repeatDetails: RepeatDetails;
  endDetails: EndDetails;
}

export const buildRRuleString = (options: RRuleOptions) => {
  const {
    frequency, startDate, repeatDetails, endDetails,
  } = options;

  const ruleOptions: any = {
    freq: frequency,
    dtstart: startDate.toJSDate(),
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
      ruleOptions.count = endDetails.occurrences;
      break;
    case EndType.ON:
      ruleOptions.until = endDetails.endDate?.toJSDate();
      break;
    default:
      break;
  }

  const rrule = new RRule(ruleOptions);
  return rrule.toString();
};
