import { describe, it, expect, vi } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { baseRepeatDetails } from "../../../store/builderStore";
import { AllRepeatDetails, Weekday } from "../Repeat.types";
import SelectDayCalendar from "./SelectDayCalendar";
import SelectMonth from "./SelectMonth";
import SelectPosition from "./SelectPosition";
import SelectDayWeek from "./SelectDayWeek";
import IntervalTextInput from "./IntervalTextInput";

// Suppress MUI "useLayoutEffect" warnings in test environment
vi.spyOn(console, "error").mockImplementation((msg: string) => {
  if (typeof msg === "string" && msg.includes("useLayoutEffect")) {
    return;
  }
  console.warn(msg);
});

describe("SelectDayCalendar", () => {
  it("renders with label", () => {
    const onChange = vi.fn();
    render(
      <SelectDayCalendar
        value={baseRepeatDetails}
        onChange={onChange}
        maxDaysInMonth={31}
        disabled={false}
        inputSize="small"
        inputVariant="outlined"
      />,
    );
    expect(screen.getAllByText("Select Day").length).toBeGreaterThanOrEqual(1);
  });

  it("calls onChange with byMonthDay when a day is selected", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <SelectDayCalendar
        value={baseRepeatDetails}
        onChange={onChange}
        maxDaysInMonth={31}
        disabled={false}
        inputSize="small"
        inputVariant="outlined"
      />,
    );

    // Open the select
    const select = screen.getByRole("combobox");
    await user.click(select);

    // Select day 15
    const option = await screen.findByRole("option", { name: "15" });
    await user.click(option);

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ byMonthDay: [15] }),
    );
  });

  it("renders disabled state", () => {
    render(
      <SelectDayCalendar
        value={baseRepeatDetails}
        onChange={vi.fn()}
        maxDaysInMonth={31}
        disabled={true}
        inputSize="small"
        inputVariant="outlined"
      />,
    );
    const select = screen.getByRole("combobox");
    expect(select).toHaveAttribute("aria-disabled", "true");
  });
});

describe("SelectMonth", () => {
  it("renders with label", () => {
    render(
      <SelectMonth
        value={baseRepeatDetails}
        onChange={vi.fn()}
        disabled={false}
        inputSize="small"
        inputVariant="outlined"
      />,
    );
    expect(screen.getByText("Select Month")).toBeTruthy();
  });

  it("calls onChange with byMonth when a month is selected", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <SelectMonth
        value={baseRepeatDetails}
        onChange={onChange}
        disabled={false}
        inputSize="small"
        inputVariant="outlined"
      />,
    );

    const select = screen.getByRole("combobox");
    await user.click(select);

    const option = await screen.findByRole("option", { name: "Jun" });
    await user.click(option);

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ byMonth: [6] }),
    );
  });

  it("shows existing month value", () => {
    const value: AllRepeatDetails = { ...baseRepeatDetails, byMonth: [3] };
    render(
      <SelectMonth
        value={value}
        onChange={vi.fn()}
        disabled={false}
        inputSize="small"
        inputVariant="outlined"
      />,
    );
    // MUI Select should show the value
    expect(screen.getByText("Mar")).toBeTruthy();
  });
});

describe("SelectPosition", () => {
  it("renders with label", () => {
    render(
      <SelectPosition
        value={baseRepeatDetails}
        onChange={vi.fn()}
        disabled={false}
        inputSize="small"
        inputVariant="outlined"
      />,
    );
    expect(screen.getAllByText("Select Position").length).toBeGreaterThanOrEqual(1);
  });

  it("calls onChange with bySetPos when a position is selected", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <SelectPosition
        value={baseRepeatDetails}
        onChange={onChange}
        disabled={false}
        inputSize="small"
        inputVariant="outlined"
      />,
    );

    const select = screen.getByRole("combobox");
    await user.click(select);

    const option = await screen.findByRole("option", { name: "First" });
    await user.click(option);

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ bySetPos: [1] }),
    );
  });
});

describe("SelectDayWeek", () => {
  it("renders with label", () => {
    render(
      <SelectDayWeek
        value={baseRepeatDetails}
        onChange={vi.fn()}
        disabled={false}
        inputSize="small"
        inputVariant="outlined"
      />,
    );
    expect(screen.getAllByText("Select Day").length).toBeGreaterThanOrEqual(1);
  });

  it("calls onChange with byDay when Monday is selected", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <SelectDayWeek
        value={baseRepeatDetails}
        onChange={onChange}
        disabled={false}
        inputSize="small"
        inputVariant="outlined"
      />,
    );

    const select = screen.getByRole("combobox");
    await user.click(select);

    const option = await screen.findByRole("option", { name: "Monday" });
    await user.click(option);

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ byDay: [Weekday.MO] }),
    );
  });

  it("calls onChange with all days when Day is selected", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <SelectDayWeek
        value={baseRepeatDetails}
        onChange={onChange}
        disabled={false}
        inputSize="small"
        inputVariant="outlined"
      />,
    );

    const select = screen.getByRole("combobox");
    await user.click(select);

    const option = await screen.findByRole("option", { name: "Day" });
    await user.click(option);

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        byDay: [Weekday.SU, Weekday.MO, Weekday.TU, Weekday.WE, Weekday.TH, Weekday.FR, Weekday.SA],
      }),
    );
  });

  it("calls onChange with weekdays when Weekday is selected", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <SelectDayWeek
        value={baseRepeatDetails}
        onChange={onChange}
        disabled={false}
        inputSize="small"
        inputVariant="outlined"
      />,
    );

    const select = screen.getByRole("combobox");
    await user.click(select);

    const option = await screen.findByRole("option", { name: "Weekday" });
    await user.click(option);

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        byDay: [Weekday.MO, Weekday.TU, Weekday.WE, Weekday.TH, Weekday.FR],
      }),
    );
  });

  it("calls onChange with weekend when Weekend is selected", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <SelectDayWeek
        value={baseRepeatDetails}
        onChange={onChange}
        disabled={false}
        inputSize="small"
        inputVariant="outlined"
      />,
    );

    const select = screen.getByRole("combobox");
    await user.click(select);

    const option = await screen.findByRole("option", { name: "Weekend" });
    await user.click(option);

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        byDay: [Weekday.SA, Weekday.SU],
      }),
    );
  });

  it("syncs display value for all 7 days (DAY)", () => {
    const allDays: AllRepeatDetails = {
      ...baseRepeatDetails,
      byDay: [Weekday.SU, Weekday.MO, Weekday.TU, Weekday.WE, Weekday.TH, Weekday.FR, Weekday.SA],
    };
    render(
      <SelectDayWeek
        value={allDays}
        onChange={vi.fn()}
        disabled={false}
        inputSize="small"
        inputVariant="outlined"
      />,
    );
    expect(screen.getByText("Day")).toBeTruthy();
  });

  it("syncs display value for weekdays (WEEKDAY)", () => {
    const weekdays: AllRepeatDetails = {
      ...baseRepeatDetails,
      byDay: [Weekday.MO, Weekday.TU, Weekday.WE, Weekday.TH, Weekday.FR],
    };
    render(
      <SelectDayWeek
        value={weekdays}
        onChange={vi.fn()}
        disabled={false}
        inputSize="small"
        inputVariant="outlined"
      />,
    );
    expect(screen.getByText("Weekday")).toBeTruthy();
  });

  it("syncs display value for weekend (WEEKEND)", () => {
    const weekend: AllRepeatDetails = {
      ...baseRepeatDetails,
      byDay: [Weekday.SA, Weekday.SU],
    };
    render(
      <SelectDayWeek
        value={weekend}
        onChange={vi.fn()}
        disabled={false}
        inputSize="small"
        inputVariant="outlined"
      />,
    );
    expect(screen.getByText("Weekend")).toBeTruthy();
  });

  it("syncs display value for single day", () => {
    const singleDay: AllRepeatDetails = {
      ...baseRepeatDetails,
      byDay: [Weekday.TU],
    };
    render(
      <SelectDayWeek
        value={singleDay}
        onChange={vi.fn()}
        disabled={false}
        inputSize="small"
        inputVariant="outlined"
      />,
    );
    expect(screen.getByText("Tuesday")).toBeTruthy();
  });
});

describe("IntervalTextInput", () => {
  it("renders with unit and pluralizeUnit", () => {
    render(
      <IntervalTextInput
        value={baseRepeatDetails}
        onChange={vi.fn()}
        unit="week"
        pluralizeUnit
        inputSize="small"
        inputVariant="outlined"
      />,
    );
    expect(screen.getByText("Every")).toBeTruthy();
    expect(screen.getByText("week(s)")).toBeTruthy();
  });

  it("renders without pluralizeUnit", () => {
    render(
      <IntervalTextInput
        value={baseRepeatDetails}
        onChange={vi.fn()}
        unit="day"
        inputSize="small"
        inputVariant="outlined"
      />,
    );
    expect(screen.getByText("day")).toBeTruthy();
  });

  it("calls onChange when interval is typed", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <IntervalTextInput
        value={baseRepeatDetails}
        onChange={onChange}
        unit="week"
        pluralizeUnit
        inputSize="small"
        inputVariant="outlined"
      />,
    );

    const input = screen.getByRole("spinbutton");
    await user.type(input, "5");

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ interval: 15 }),
    );
  });

  it("uses medium input size", () => {
    render(
      <IntervalTextInput
        value={baseRepeatDetails}
        onChange={vi.fn()}
        unit="hour"
        pluralizeUnit
        inputSize="medium"
        inputVariant="outlined"
      />,
    );
    expect(screen.getByText("Every")).toBeTruthy();
  });
});
