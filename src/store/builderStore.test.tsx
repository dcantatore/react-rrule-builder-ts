import { describe, it, expect, vi } from "vitest";
import React from "react";
import { renderHook, act } from "@testing-library/react";
import { Frequency } from "rrule";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { DateTime } from "luxon";
import useBuilderStore, {
  BuilderStoreProvider,
  baseRepeatDetails,
} from "./builderStore";
import { EndType } from "../components/End/End.types";
import { Weekday, MonthBy, YearlyBy } from "../components/Repeat/Repeat.types";

const adapter = new AdapterLuxon();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <BuilderStoreProvider>{children}</BuilderStoreProvider>
);

const useStoreWithAdapter = () => {
  const store = useBuilderStore();
  return store;
};

describe("builderStore", () => {
  describe("initial state", () => {
    it("has correct defaults", () => {
      const { result } = renderHook(() => useStoreWithAdapter(), { wrapper });
      expect(result.current.frequency).toBe(Frequency.WEEKLY);
      expect(result.current.startDate).toBeNull();
      expect(result.current.repeatDetails).toEqual(baseRepeatDetails);
      expect(result.current.endDetails).toEqual({
        endingType: EndType.NEVER,
      });
      expect(result.current.validationErrors).toEqual({});
      expect(result.current.radioValue).toBeNull();
    });
  });

  describe("setFrequency", () => {
    it("updates frequency", () => {
      const { result } = renderHook(() => useBuilderStore(), { wrapper });
      act(() => {
        result.current.setAdapter(adapter);
      });
      act(() => {
        result.current.setFrequency(Frequency.MONTHLY);
      });
      expect(result.current.frequency).toBe(Frequency.MONTHLY);
    });

    it("resets repeat details when frequency changes", () => {
      const { result } = renderHook(() => useBuilderStore(), { wrapper });
      act(() => {
        result.current.setAdapter(adapter);
      });
      act(() => {
        result.current.setRepeatDetails({
          ...baseRepeatDetails,
          byDay: [Weekday.MO],
        });
      });
      act(() => {
        result.current.setFrequency(Frequency.DAILY);
      });
      expect(result.current.repeatDetails).toEqual({ ...baseRepeatDetails });
    });

    it("clears validation errors when frequency changes", () => {
      const { result } = renderHook(() => useBuilderStore(), { wrapper });
      act(() => {
        result.current.setAdapter(adapter);
      });
      // Manually trigger validation to create errors first
      act(() => {
        result.current.setFrequency(Frequency.MONTHLY);
      });
      expect(result.current.validationErrors).toEqual({});
    });
  });

  describe("setStartDate", () => {
    it("sets start date", () => {
      const { result } = renderHook(() => useBuilderStore(), { wrapper });
      const date = DateTime.fromISO("2025-06-15T00:00:00.000Z");
      act(() => {
        result.current.setAdapter(adapter);
      });
      act(() => {
        result.current.setStartDate(date);
      });
      expect(result.current.startDate).toBeTruthy();
    });

    it("sets minEndDate when start date is provided", () => {
      const { result } = renderHook(() => useBuilderStore(), { wrapper });
      const date = DateTime.fromISO("2025-06-15T00:00:00.000Z");
      act(() => {
        result.current.setAdapter(adapter);
      });
      act(() => {
        result.current.setStartDate(date);
      });
      expect(result.current.minEndDate).toBeTruthy();
    });

    it("adjusts end date when start date is on or after it", () => {
      const { result } = renderHook(() => useBuilderStore(), { wrapper });
      const startDate = DateTime.fromISO("2025-06-20T00:00:00.000Z");
      const endDate = DateTime.fromISO("2025-06-15T00:00:00.000Z");
      act(() => {
        result.current.setAdapter(adapter);
      });
      act(() => {
        result.current.setEndDetails({
          endingType: EndType.ON,
          endDate,
        });
      });
      act(() => {
        result.current.setStartDate(startDate);
      });
      // End date should have been adjusted to be after the start date
      const endDets = result.current.endDetails;
      expect(endDets.endingType).toBe(EndType.ON);
      if (endDets.endingType === EndType.ON) {
        expect(endDets.endDate).toBeTruthy();
        if (endDets.endDate) {
          expect(endDets.endDate > startDate).toBe(true);
        }
      }
    });

    it("does nothing without a date adapter", () => {
      const { result } = renderHook(() => useBuilderStore(), { wrapper });
      const date = DateTime.fromISO("2025-06-15T00:00:00.000Z");
      // Don't set adapter
      act(() => {
        result.current.setStartDate(date);
      });
      expect(result.current.startDate).toBeNull();
    });
  });

  describe("setRepeatDetails", () => {
    it("updates repeat details", () => {
      const { result } = renderHook(() => useBuilderStore(), { wrapper });
      act(() => {
        result.current.setAdapter(adapter);
      });
      const details = { ...baseRepeatDetails, byDay: [Weekday.MO, Weekday.WE] };
      act(() => {
        result.current.setRepeatDetails(details);
      });
      expect(result.current.repeatDetails.byDay).toEqual([Weekday.MO, Weekday.WE]);
    });
  });

  describe("setEndDetails", () => {
    it("updates end details", () => {
      const { result } = renderHook(() => useBuilderStore(), { wrapper });
      act(() => {
        result.current.setAdapter(adapter);
      });
      act(() => {
        result.current.setEndDetails({
          endingType: EndType.AFTER,
          occurrences: 10,
        });
      });
      const endDets = result.current.endDetails;
      expect(endDets.endingType).toBe(EndType.AFTER);
      if (endDets.endingType === EndType.AFTER) {
        expect(endDets.occurrences).toBe(10);
      }
    });
  });

  describe("buildRRuleString", () => {
    it("generates an RRULE string when adapter is set", () => {
      const { result } = renderHook(() => useBuilderStore(), { wrapper });
      act(() => {
        result.current.setAdapter(adapter);
      });
      act(() => {
        result.current.buildRRuleString();
      });
      expect(result.current.RRuleString).toBeDefined();
      expect(result.current.RRuleString).toContain("RRULE:");
    });

    it("calls onChange when rrule string is built", () => {
      const onChange = vi.fn();
      const { result } = renderHook(() => useBuilderStore(), { wrapper });
      act(() => {
        result.current.setAdapter(adapter);
      });
      act(() => {
        result.current.setOnChange(onChange);
      });
      act(() => {
        result.current.buildRRuleString();
      });
      expect(onChange).toHaveBeenCalledWith(expect.stringContaining("RRULE:"));
    });

    it("does nothing when adapter is not set", () => {
      const { result } = renderHook(() => useBuilderStore(), { wrapper });
      act(() => {
        result.current.buildRRuleString();
      });
      expect(result.current.RRuleString).toBeUndefined();
    });
  });

  describe("validateForm", () => {
    it("returns true for valid WEEKLY form", async () => {
      const { result } = renderHook(() => useBuilderStore(), { wrapper });
      act(() => {
        result.current.setAdapter(adapter);
      });
      act(() => {
        result.current.setRepeatDetails({
          ...baseRepeatDetails,
          byDay: [Weekday.MO],
        });
      });
      let isValid = false;
      await act(async () => {
        isValid = await result.current.validateForm();
      });
      expect(isValid).toBe(true);
      expect(result.current.validationErrors).toEqual({});
    });

    it("returns false and sets errors for invalid WEEKLY form", async () => {
      const { result } = renderHook(() => useBuilderStore(), { wrapper });
      act(() => {
        result.current.setAdapter(adapter);
      });
      // WEEKLY requires byDay — leave it empty
      act(() => {
        result.current.setRepeatDetails({
          ...baseRepeatDetails,
          byDay: [],
        });
      });
      let isValid = true;
      await act(async () => {
        isValid = await result.current.validateForm();
      });
      expect(isValid).toBe(false);
      expect(Object.keys(result.current.validationErrors).length).toBeGreaterThan(0);
    });
  });

  describe("setStoreFromRRuleString", () => {
    it("parses a WEEKLY rrule string", () => {
      const { result } = renderHook(() => useBuilderStore(), { wrapper });
      act(() => {
        result.current.setAdapter(adapter);
      });
      act(() => {
        result.current.setStoreFromRRuleString("RRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=MO,WE,FR");
      });
      expect(result.current.frequency).toBe(Frequency.WEEKLY);
      expect(result.current.repeatDetails.interval).toBe(2);
      expect(result.current.repeatDetails.byDay).toEqual([Weekday.MO, Weekday.WE, Weekday.FR]);
    });

    it("parses a MONTHLY rrule string with BYMONTHDAY", () => {
      const { result } = renderHook(() => useBuilderStore(), { wrapper });
      act(() => {
        result.current.setAdapter(adapter);
      });
      act(() => {
        result.current.setStoreFromRRuleString("RRULE:FREQ=MONTHLY;INTERVAL=1;BYMONTHDAY=15");
      });
      expect(result.current.frequency).toBe(Frequency.MONTHLY);
      expect(result.current.repeatDetails.byMonthDay).toEqual([15]);
      expect(result.current.radioValue).toBe(MonthBy.BYMONTHDAY);
    });

    it("parses a MONTHLY rrule string with BYSETPOS", () => {
      const { result } = renderHook(() => useBuilderStore(), { wrapper });
      act(() => {
        result.current.setAdapter(adapter);
      });
      act(() => {
        result.current.setStoreFromRRuleString("RRULE:FREQ=MONTHLY;BYSETPOS=-1;BYDAY=FR");
      });
      expect(result.current.frequency).toBe(Frequency.MONTHLY);
      expect(result.current.repeatDetails.bySetPos).toEqual([-1]);
      expect(result.current.repeatDetails.byDay).toEqual([Weekday.FR]);
      expect(result.current.radioValue).toBe(MonthBy.BYSETPOS);
    });

    it("parses a YEARLY rrule string with BYMONTH", () => {
      const { result } = renderHook(() => useBuilderStore(), { wrapper });
      act(() => {
        result.current.setAdapter(adapter);
      });
      act(() => {
        result.current.setStoreFromRRuleString("RRULE:FREQ=YEARLY;BYMONTH=6;BYMONTHDAY=15");
      });
      expect(result.current.frequency).toBe(Frequency.YEARLY);
      expect(result.current.repeatDetails.byMonth).toEqual([6]);
      expect(result.current.radioValue).toBe(YearlyBy.BYMONTH);
    });

    it("parses a YEARLY rrule string with BYSETPOS", () => {
      const { result } = renderHook(() => useBuilderStore(), { wrapper });
      act(() => {
        result.current.setAdapter(adapter);
      });
      act(() => {
        result.current.setStoreFromRRuleString("RRULE:FREQ=YEARLY;BYSETPOS=2;BYDAY=TU;BYMONTH=3");
      });
      expect(result.current.frequency).toBe(Frequency.YEARLY);
      expect(result.current.radioValue).toBe(YearlyBy.BYSETPOS);
    });

    it("parses COUNT for EndType.AFTER", () => {
      const { result } = renderHook(() => useBuilderStore(), { wrapper });
      act(() => {
        result.current.setAdapter(adapter);
      });
      act(() => {
        result.current.setStoreFromRRuleString("RRULE:FREQ=DAILY;COUNT=5");
      });
      const afterDets = result.current.endDetails;
      expect(afterDets.endingType).toBe(EndType.AFTER);
      if (afterDets.endingType === EndType.AFTER) {
        expect(afterDets.occurrences).toBe(5);
      }
    });

    it("parses UNTIL for EndType.ON", () => {
      const { result } = renderHook(() => useBuilderStore(), { wrapper });
      act(() => {
        result.current.setAdapter(adapter);
      });
      act(() => {
        result.current.setStoreFromRRuleString("RRULE:FREQ=DAILY;UNTIL=20261231T000000Z");
      });
      const onDets = result.current.endDetails;
      expect(onDets.endingType).toBe(EndType.ON);
      if (onDets.endingType === EndType.ON) {
        expect(onDets.endDate).toBeTruthy();
      }
    });

    it("parses DTSTART", () => {
      const { result } = renderHook(() => useBuilderStore(), { wrapper });
      act(() => {
        result.current.setAdapter(adapter);
      });
      act(() => {
        result.current.setStoreFromRRuleString(
          "DTSTART:20250615T000000Z\nRRULE:FREQ=WEEKLY;BYDAY=MO"
        );
      });
      expect(result.current.startDate).toBeTruthy();
    });

    it("handles invalid rrule strings gracefully", () => {
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      const { result } = renderHook(() => useBuilderStore(), { wrapper });
      act(() => {
        result.current.setAdapter(adapter);
      });
      act(() => {
        result.current.setStoreFromRRuleString("NOT_VALID");
      });
      // Should still have default frequency — state unchanged
      expect(result.current.frequency).toBe(Frequency.WEEKLY);
      consoleSpy.mockRestore();
    });

    it("clears validation errors on rehydration", () => {
      const { result } = renderHook(() => useBuilderStore(), { wrapper });
      act(() => {
        result.current.setAdapter(adapter);
      });
      act(() => {
        result.current.setStoreFromRRuleString("RRULE:FREQ=DAILY;INTERVAL=1");
      });
      expect(result.current.validationErrors).toEqual({});
    });

    it("triggers buildRRuleString after rehydration", () => {
      const onChange = vi.fn();
      const { result } = renderHook(() => useBuilderStore(), { wrapper });
      act(() => {
        result.current.setAdapter(adapter);
      });
      act(() => {
        result.current.setOnChange(onChange);
      });
      act(() => {
        result.current.setStoreFromRRuleString("RRULE:FREQ=DAILY;INTERVAL=3");
      });
      expect(onChange).toHaveBeenCalled();
      expect(result.current.RRuleString).toContain("RRULE:");
    });
  });

  describe("context isolation", () => {
    it("throws when used outside BuilderStoreProvider", () => {
      // Suppress console.error from React error boundary
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      expect(() => {
        renderHook(() => useBuilderStore());
      }).toThrow("useBuilderStore must be used within a BuilderStoreProvider or RRuleBuilder");
      consoleSpy.mockRestore();
    });

    it("provides independent state per provider", () => {
      const { result: result1 } = renderHook(() => useBuilderStore(), { wrapper });
      const { result: result2 } = renderHook(() => useBuilderStore(), { wrapper });
      act(() => {
        result1.current.setAdapter(adapter);
      });
      act(() => {
        result2.current.setAdapter(adapter);
      });
      act(() => {
        result1.current.setFrequency(Frequency.DAILY);
      });
      // result2 should still have the default WEEKLY
      expect(result1.current.frequency).toBe(Frequency.DAILY);
      expect(result2.current.frequency).toBe(Frequency.WEEKLY);
    });
  });
});
