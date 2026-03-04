import { describe, it, expect } from "vitest";
import { Frequency } from "rrule";
import getValidationSchema from "./validationSchema";
import { Weekday } from "../components/Repeat/Repeat.types";

describe("getValidationSchema", () => {
  describe("base schema (DAILY / HOURLY)", () => {
    it("passes for valid DAILY input", async () => {
      const schema = getValidationSchema(Frequency.DAILY);
      const data = { frequency: Frequency.DAILY, interval: 1 };
      await expect(schema.validate(data)).resolves.toBeDefined();
    });

    it("passes for valid HOURLY input", async () => {
      const schema = getValidationSchema(Frequency.HOURLY);
      const data = { frequency: Frequency.HOURLY, interval: 2 };
      await expect(schema.validate(data)).resolves.toBeDefined();
    });

    it("rejects when frequency is missing", async () => {
      const schema = getValidationSchema(Frequency.DAILY);
      const data = { interval: 1 };
      await expect(schema.validate(data)).rejects.toThrow();
    });

    it("rejects when interval is missing", async () => {
      const schema = getValidationSchema(Frequency.DAILY);
      const data = { frequency: Frequency.DAILY };
      await expect(schema.validate(data)).rejects.toThrow();
    });
  });

  describe("weekly schema", () => {
    it("passes with byDay provided", async () => {
      const schema = getValidationSchema(Frequency.WEEKLY);
      const data = {
        frequency: Frequency.WEEKLY,
        interval: 1,
        byDay: [Weekday.MO, Weekday.FR],
      };
      await expect(schema.validate(data)).resolves.toBeDefined();
    });

    it("rejects when byDay is missing for WEEKLY", async () => {
      const schema = getValidationSchema(Frequency.WEEKLY);
      const data = { frequency: Frequency.WEEKLY, interval: 1 };
      await expect(schema.validate(data)).rejects.toThrow();
    });

    it("requires interval for WEEKLY", async () => {
      const schema = getValidationSchema(Frequency.WEEKLY);
      const data = { frequency: Frequency.WEEKLY, byDay: [Weekday.MO] };
      await expect(schema.validate(data)).rejects.toThrow();
    });
  });

  describe("monthly schema", () => {
    it("passes with byMonthDay", async () => {
      const schema = getValidationSchema(Frequency.MONTHLY);
      const data = {
        frequency: Frequency.MONTHLY,
        interval: 1,
        byMonthDay: [15],
      };
      await expect(schema.validate(data)).resolves.toBeDefined();
    });

    it("passes with bySetPos and byDay for on-the pattern", async () => {
      const schema = getValidationSchema(Frequency.MONTHLY);
      const data = {
        frequency: Frequency.MONTHLY,
        interval: 1,
        bySetPos: [2],
        byDay: [Weekday.TU],
      };
      await expect(schema.validate(data)).resolves.toBeDefined();
    });

    it("requires interval for MONTHLY", async () => {
      const schema = getValidationSchema(Frequency.MONTHLY);
      const data = { frequency: Frequency.MONTHLY };
      await expect(schema.validate(data)).rejects.toThrow();
    });
  });

  describe("yearly schema", () => {
    it("passes with byMonth", async () => {
      const schema = getValidationSchema(Frequency.YEARLY);
      const data = {
        frequency: Frequency.YEARLY,
        byMonth: [6],
      };
      await expect(schema.validate(data)).resolves.toBeDefined();
    });

    it("passes with bySetPos and byDay", async () => {
      const schema = getValidationSchema(Frequency.YEARLY);
      const data = {
        frequency: Frequency.YEARLY,
        bySetPos: [-1],
        byDay: [Weekday.FR],
        byMonth: [12],
      };
      await expect(schema.validate(data)).resolves.toBeDefined();
    });

    it("does not require interval for YEARLY", async () => {
      const schema = getValidationSchema(Frequency.YEARLY);
      const data = { frequency: Frequency.YEARLY };
      await expect(schema.validate(data)).resolves.toBeDefined();
    });
  });

  describe("schema selection", () => {
    it("returns base schema for MINUTELY", async () => {
      const schema = getValidationSchema(Frequency.MINUTELY);
      const data = { frequency: Frequency.MINUTELY, interval: 30 };
      await expect(schema.validate(data)).resolves.toBeDefined();
    });

    it("returns base schema for SECONDLY", async () => {
      const schema = getValidationSchema(Frequency.SECONDLY);
      const data = { frequency: Frequency.SECONDLY, interval: 10 };
      await expect(schema.validate(data)).resolves.toBeDefined();
    });
  });
});
