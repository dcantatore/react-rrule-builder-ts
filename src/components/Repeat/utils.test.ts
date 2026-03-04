import { describe, it, expect } from "vitest";
import { addOrRemoveFromArray, getLabelSize, safeParseInt } from "./utils";

describe("addOrRemoveFromArray", () => {
  it("adds a value not in the array", () => {
    expect(addOrRemoveFromArray([1, 2], 3)).toEqual([1, 2, 3]);
  });

  it("removes a value already in the array", () => {
    expect(addOrRemoveFromArray([1, 2, 3], 2)).toEqual([1, 3]);
  });

  it("handles empty array", () => {
    expect(addOrRemoveFromArray([], 5)).toEqual([5]);
  });
});

describe("getLabelSize", () => {
  it("returns 'small' for input size 'small'", () => {
    expect(getLabelSize("small")).toBe("small");
  });

  it("returns 'normal' for input size 'medium'", () => {
    expect(getLabelSize("medium")).toBe("normal");
  });

  it("returns 'normal' for undefined input size", () => {
    expect(getLabelSize(undefined)).toBe("normal");
  });
});

describe("safeParseInt", () => {
  it("parses valid integer string", () => {
    expect(safeParseInt("42")).toBe(42);
  });

  it("returns undefined for non-numeric string", () => {
    expect(safeParseInt("abc")).toBeUndefined();
  });

  it("returns undefined for empty string", () => {
    expect(safeParseInt("")).toBeUndefined();
  });

  it("parses negative numbers", () => {
    expect(safeParseInt("-1")).toBe(-1);
  });
});
