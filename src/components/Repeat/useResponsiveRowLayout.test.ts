import { describe, it, expect } from "vitest";
import { getRowMinWidth, ResponsiveRowSpec } from "./useResponsiveRowLayout";

const MUI_SPACING_UNIT_PX = 8;
const DEFAULT_ROW_SPACING = 4;

describe("getRowMinWidth", () => {
  it("returns fixedWidth when there are no selects", () => {
    const spec: ResponsiveRowSpec = { fixedWidth: 100 };
    expect(getRowMinWidth(spec)).toBe(100);
  });

  it("adds select widths using selectCount and selectMinWidth", () => {
    const spec: ResponsiveRowSpec = { fixedWidth: 50, selectCount: 2, selectMinWidth: 120 };
    // 50 + (2 * 120) + (2 gaps * 4 * 8) = 50 + 240 + 64 = 354
    const expectedGaps = 2 * DEFAULT_ROW_SPACING * MUI_SPACING_UNIT_PX;
    expect(getRowMinWidth(spec)).toBe(50 + 240 + expectedGaps);
  });

  it("uses selectMinWidths array over selectCount", () => {
    const spec: ResponsiveRowSpec = {
      fixedWidth: 50,
      selectCount: 5,
      selectMinWidths: [100, 200],
    };
    // selectMinWidths takes priority, so 2 selects not 5
    // 50 + 100 + 200 + (2 gaps * 4 * 8) = 50 + 300 + 64 = 414
    const expectedGaps = 2 * DEFAULT_ROW_SPACING * MUI_SPACING_UNIT_PX;
    expect(getRowMinWidth(spec)).toBe(50 + 300 + expectedGaps);
  });

  it("uses default selectMinWidth (120) when selectMinWidth is not provided", () => {
    const spec: ResponsiveRowSpec = { fixedWidth: 0, selectCount: 1 };
    // 0 + 120 + (1 gap * 4 * 8) = 0 + 120 + 32 = 152
    const expectedGaps = 1 * DEFAULT_ROW_SPACING * MUI_SPACING_UNIT_PX;
    expect(getRowMinWidth(spec)).toBe(120 + expectedGaps);
  });

  it("uses custom spacing", () => {
    const spec: ResponsiveRowSpec = { fixedWidth: 100, selectCount: 1, selectMinWidth: 100, spacing: 2 };
    // 100 + 100 + (1 gap * 2 * 8) = 100 + 100 + 16 = 216
    expect(getRowMinWidth(spec)).toBe(216);
  });

  it("handles empty selectMinWidths array same as no selects", () => {
    const spec: ResponsiveRowSpec = { fixedWidth: 80, selectMinWidths: [] };
    expect(getRowMinWidth(spec)).toBe(80);
  });
});
