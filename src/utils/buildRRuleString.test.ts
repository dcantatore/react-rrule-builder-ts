import { describe, it, expect } from "vitest";
import { Frequency } from "rrule";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { DateTime } from "luxon";
import { buildRRuleString } from "./buildRRuleString";
import { EndType } from "../components/End/End.types";
import { Weekday } from "../components/Repeat/Repeat.types";
import { baseRepeatDetails } from "../store/builderStore";

const adapter = new AdapterLuxon();

const makeParams = (overrides: Record<string, unknown> = {}) => ({
  frequency: Frequency.WEEKLY,
  startDate: null,
  repeatDetails: { ...baseRepeatDetails },
  endDetails: { endingType: EndType.NEVER, endDate: null, occurrences: null },
  dateAdapter: adapter,
  ...overrides,
});

describe("buildRRuleString", () => {
  describe("frequency", () => {
    it("generates WEEKLY frequency", () => {
      const result = buildRRuleString(makeParams({ frequency: Frequency.WEEKLY }));
      expect(result).toContain("FREQ=WEEKLY");
    });

    it("generates DAILY frequency", () => {
      const result = buildRRuleString(makeParams({ frequency: Frequency.DAILY }));
      expect(result).toContain("FREQ=DAILY");
    });

    it("generates MONTHLY frequency", () => {
      const result = buildRRuleString(makeParams({ frequency: Frequency.MONTHLY }));
      expect(result).toContain("FREQ=MONTHLY");
    });

    it("generates YEARLY frequency", () => {
      const result = buildRRuleString(makeParams({ frequency: Frequency.YEARLY }));
      expect(result).toContain("FREQ=YEARLY");
    });

    it("generates HOURLY frequency", () => {
      const result = buildRRuleString(makeParams({ frequency: Frequency.HOURLY }));
      expect(result).toContain("FREQ=HOURLY");
    });
  });

  describe("interval", () => {
    it("defaults to INTERVAL=1 when interval is null", () => {
      const result = buildRRuleString(makeParams({
        repeatDetails: { ...baseRepeatDetails, interval: null },
      }));
      expect(result).toContain("INTERVAL=1");
    });

    it("uses provided interval", () => {
      const result = buildRRuleString(makeParams({
        repeatDetails: { ...baseRepeatDetails, interval: 3 },
      }));
      expect(result).toContain("INTERVAL=3");
    });

    it("never outputs INTERVAL=0", () => {
      const result = buildRRuleString(makeParams({
        repeatDetails: { ...baseRepeatDetails, interval: null },
      }));
      expect(result).not.toContain("INTERVAL=0");
    });
  });

  describe("start date", () => {
    it("includes DTSTART when startDate is provided", () => {
      const startDate = DateTime.fromISO("2025-06-15T00:00:00.000Z");
      const result = buildRRuleString(makeParams({ startDate }));
      expect(result).toContain("DTSTART:");
    });

    it("omits DTSTART when startDate is null", () => {
      const result = buildRRuleString(makeParams({ startDate: null }));
      expect(result).not.toContain("DTSTART:");
    });
  });

  describe("end details", () => {
    it("omits COUNT and UNTIL for EndType.NEVER", () => {
      const result = buildRRuleString(makeParams({
        endDetails: { endingType: EndType.NEVER, endDate: null, occurrences: null },
      }));
      expect(result).not.toContain("COUNT=");
      expect(result).not.toContain("UNTIL=");
    });

    it("includes COUNT for EndType.AFTER", () => {
      const result = buildRRuleString(makeParams({
        endDetails: { endingType: EndType.AFTER, occurrences: 5, endDate: null },
      }));
      expect(result).toContain("COUNT=5");
    });

    it("includes UNTIL for EndType.ON", () => {
      const endDate = DateTime.fromISO("2026-12-31T00:00:00.000Z");
      const result = buildRRuleString(makeParams({
        endDetails: { endingType: EndType.ON, endDate, occurrences: null },
      }));
      expect(result).toContain("UNTIL=");
    });
  });

  describe("repeat details", () => {
    it("includes BYDAY for weekly with days selected", () => {
      const result = buildRRuleString(makeParams({
        repeatDetails: { ...baseRepeatDetails, byDay: [Weekday.MO, Weekday.FR] },
      }));
      expect(result).toContain("BYDAY=MO,FR");
    });

    it("includes BYMONTHDAY for monthly", () => {
      const result = buildRRuleString(makeParams({
        frequency: Frequency.MONTHLY,
        repeatDetails: { ...baseRepeatDetails, byMonthDay: [15] },
      }));
      expect(result).toContain("BYMONTHDAY=15");
    });

    it("includes BYMONTH for yearly", () => {
      const result = buildRRuleString(makeParams({
        frequency: Frequency.YEARLY,
        repeatDetails: { ...baseRepeatDetails, byMonth: [6] },
      }));
      expect(result).toContain("BYMONTH=6");
    });

    it("includes BYSETPOS for monthly on-the pattern", () => {
      const result = buildRRuleString(makeParams({
        frequency: Frequency.MONTHLY,
        repeatDetails: { ...baseRepeatDetails, bySetPos: [2], byDay: [Weekday.TU] },
      }));
      expect(result).toContain("BYSETPOS=2");
      expect(result).toContain("BYDAY=TU");
    });
  });

  describe("full round-trip scenarios", () => {
    it("builds a complete weekly rule", () => {
      const startDate = DateTime.fromISO("2025-01-06T00:00:00.000Z");
      const result = buildRRuleString(makeParams({
        frequency: Frequency.WEEKLY,
        startDate,
        repeatDetails: { ...baseRepeatDetails, interval: 2, byDay: [Weekday.MO, Weekday.WE, Weekday.FR] },
        endDetails: { endingType: EndType.AFTER, occurrences: 10, endDate: null },
      }));
      expect(result).toContain("FREQ=WEEKLY");
      expect(result).toContain("INTERVAL=2");
      expect(result).toContain("BYDAY=MO,WE,FR");
      expect(result).toContain("COUNT=10");
      expect(result).toContain("DTSTART:");
    });

    it("builds a complete monthly on-the rule", () => {
      const result = buildRRuleString(makeParams({
        frequency: Frequency.MONTHLY,
        repeatDetails: {
          ...baseRepeatDetails,
          interval: 1,
          bySetPos: [-1],
          byDay: [Weekday.FR],
        },
      }));
      expect(result).toContain("FREQ=MONTHLY");
      expect(result).toContain("BYSETPOS=-1");
      expect(result).toContain("BYDAY=FR");
    });
  });
});
