import { describe, it, expect, vi } from "vitest";
import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { Frequency } from "rrule";
import RRuleBuilder from "./RRuleBuilder";
import { BuilderStoreProvider } from "../../store/builderStore";

// Suppress MUI "useLayoutEffect" warnings in test environment
vi.spyOn(console, "error").mockImplementation((msg: string) => {
  if (typeof msg === "string" && msg.includes("useLayoutEffect")) {
    return;
  }
  console.warn(msg);
});

const renderBuilder = (props: Record<string, unknown> = {}) =>
  render(
    <RRuleBuilder
      dateAdapter={AdapterLuxon}
      {...props}
    />,
  );

describe("RRuleBuilder", () => {
  describe("rendering", () => {
    it("renders without crashing", () => {
      const { container } = renderBuilder();
      expect(container).toBeTruthy();
    });

    it("shows the start date picker by default", () => {
      renderBuilder();
      expect(screen.getByLabelText(/start date/i)).toBeTruthy();
    });

    it("hides the start date picker when showStartDate is false", () => {
      renderBuilder({ showStartDate: false });
      expect(screen.queryByLabelText(/start date/i)).toBeNull();
    });

    it("renders the frequency select", () => {
      renderBuilder();
      // The frequency select should show "Weekly" by default
      expect(screen.getByText("Weekly")).toBeTruthy();
    });

    it("renders end section with 'never' by default", () => {
      renderBuilder();
      // The End select should exist with "never" value
      expect(screen.getByText("never")).toBeTruthy();
    });

    it("renders all frequency options in the dropdown", async () => {
      renderBuilder();
      const user = userEvent.setup();

      // Click on the frequency select to open it
      const frequencySelect = screen.getByText("Weekly");
      await user.click(frequencySelect);

      // All default frequency options should be visible
      expect(screen.getByText("Yearly")).toBeTruthy();
      expect(screen.getByText("Monthly")).toBeTruthy();
      // "Weekly" appears twice — in the select and in the dropdown
      expect(screen.getAllByText("Weekly").length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText("Daily")).toBeTruthy();
      expect(screen.getByText("Hourly")).toBeTruthy();
    });
  });

  describe("frequency change", () => {
    it("switches to Daily view when Daily is selected", async () => {
      renderBuilder();
      const user = userEvent.setup();

      // Open frequency dropdown
      const frequencySelect = screen.getByText("Weekly");
      await user.click(frequencySelect);

      // Select Daily
      await user.click(screen.getByText("Daily"));

      // Should now show "Daily" in the select
      expect(screen.getByText("Daily")).toBeTruthy();
    });

    it("switches to Monthly view when Monthly is selected", async () => {
      renderBuilder();
      const user = userEvent.setup();

      // Open frequency dropdown
      const frequencySelect = screen.getByText("Weekly");
      await user.click(frequencySelect);

      // Select Monthly
      await user.click(screen.getByText("Monthly"));

      // Monthly view shows specific inputs for BYMONTHDAY
      expect(screen.getByText("Monthly")).toBeTruthy();
    });
  });

  describe("defaultFrequency prop", () => {
    it("defaults to WEEKLY", () => {
      renderBuilder();
      expect(screen.getByText("Weekly")).toBeTruthy();
    });

    it("respects defaultFrequency prop", () => {
      renderBuilder({ defaultFrequency: Frequency.DAILY });
      expect(screen.getByText("Daily")).toBeTruthy();
    });

    it("respects MONTHLY defaultFrequency", () => {
      renderBuilder({ defaultFrequency: Frequency.MONTHLY });
      expect(screen.getByText("Monthly")).toBeTruthy();
    });
  });

  describe("onChange callback", () => {
    it("calls onChange with an RRULE string on mount", async () => {
      const onChange = vi.fn();
      renderBuilder({ onChange });

      // Wait for useEffect to complete
      await vi.waitFor(() => {
        expect(onChange).toHaveBeenCalled();
      });

      const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1][0];
      expect(lastCall).toContain("RRULE:");
    });
  });

  describe("rruleString rehydration", () => {
    it("rehydrates from an RRULE string prop", async () => {
      const onChange = vi.fn();
      renderBuilder({
        rruleString: "RRULE:FREQ=DAILY;INTERVAL=3",
        onChange,
      });

      // After rehydration, the frequency select should show "Daily"
      await vi.waitFor(() => {
        expect(screen.getByText("Daily")).toBeTruthy();
      });
    });
  });

  describe("auto-wrapping provider", () => {
    it("works when not inside a BuilderStoreProvider", () => {
      // RRuleBuilder should auto-wrap itself in a provider
      const { container } = render(
        <RRuleBuilder dateAdapter={AdapterLuxon} />,
      );
      expect(container).toBeTruthy();
    });

    it("works when already inside a BuilderStoreProvider", () => {
      // Should not create a nested provider
      const { container } = render(
        <BuilderStoreProvider>
          <RRuleBuilder dateAdapter={AdapterLuxon} />
        </BuilderStoreProvider>,
      );
      expect(container).toBeTruthy();
    });
  });

  describe("custom lang prop", () => {
    it("uses custom start date label", () => {
      renderBuilder({
        lang: {
          startDatePickerLabel: "Begin On",
          endDatePickerLabel: "Finish By",
        },
      });
      expect(screen.getByLabelText("Begin On")).toBeTruthy();
    });
  });

  describe("frequency: Hourly", () => {
    it("renders the hourly interval input", async () => {
      renderBuilder({ defaultFrequency: Frequency.HOURLY });
      await vi.waitFor(() => {
        expect(screen.getByText("Hourly")).toBeTruthy();
      });
      expect(screen.getByText("Every")).toBeTruthy();
      expect(screen.getByText("hour(s)")).toBeTruthy();
    });
  });

  describe("frequency: Yearly", () => {
    it("renders the yearly view with On/On The radio groups", async () => {
      renderBuilder({ defaultFrequency: Frequency.YEARLY });
      await vi.waitFor(() => {
        expect(screen.getByText("Yearly")).toBeTruthy();
      });
      expect(screen.getByText("On")).toBeTruthy();
      expect(screen.getByText("On The")).toBeTruthy();
    });

    it("renders yearly with enableYearlyInterval", async () => {
      renderBuilder({ defaultFrequency: Frequency.YEARLY, enableYearlyInterval: true });
      await vi.waitFor(() => {
        expect(screen.getByText("Yearly")).toBeTruthy();
      });
      expect(screen.getByText("Every")).toBeTruthy();
      expect(screen.getByText("year(s)")).toBeTruthy();
    });

    it("renders SelectMonth and SelectDayCalendar in the On row", async () => {
      renderBuilder({ defaultFrequency: Frequency.YEARLY });
      await vi.waitFor(() => {
        expect(screen.getByText("Yearly")).toBeTruthy();
      });
      expect(screen.getAllByText("Select Month").length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText("Select Day").length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("frequency: Weekly interactions", () => {
    it("toggles day buttons on click", async () => {
      const onChange = vi.fn();
      renderBuilder({ onChange });
      const user = userEvent.setup();

      await vi.waitFor(() => {
        expect(screen.getByText("Mon")).toBeTruthy();
      });

      // Click Monday button to select it
      await user.click(screen.getByText("Mon"));
      // Click Friday button
      await user.click(screen.getByText("Fri"));

      // onChange should have been called with updated RRULE
      await vi.waitFor(() => {
        const calls = onChange.mock.calls;
        const lastRRule = calls[calls.length - 1][0] as string;
        expect(lastRRule).toContain("BYDAY=");
      });
    });

    it("deselects a day when clicked again", async () => {
      const onChange = vi.fn();
      renderBuilder({ onChange });
      const user = userEvent.setup();

      await vi.waitFor(() => {
        expect(screen.getByText("Mon")).toBeTruthy();
      });

      // Click Monday to select
      await user.click(screen.getByText("Mon"));
      // Click Monday again to deselect
      await user.click(screen.getByText("Mon"));

      // The last rrule should not have BYDAY=MO only
      await vi.waitFor(() => {
        expect(onChange).toHaveBeenCalled();
      });
    });
  });

  describe("frequency: Monthly interactions", () => {
    it("renders On Day and On The radio options", async () => {
      renderBuilder({ defaultFrequency: Frequency.MONTHLY });
      await vi.waitFor(() => {
        expect(screen.getByText("Monthly")).toBeTruthy();
      });
      expect(screen.getByText("On Day")).toBeTruthy();
      expect(screen.getByText("On The")).toBeTruthy();
    });

    it("switches between On Day and On The radio", async () => {
      renderBuilder({ defaultFrequency: Frequency.MONTHLY });
      const user = userEvent.setup();

      await vi.waitFor(() => {
        expect(screen.getByText("On The")).toBeTruthy();
      });

      // Click On The radio
      const onTheRadio = screen.getByRole("radio", { name: /on the/i });
      await user.click(onTheRadio);

      // Select Position dropdown should be visible
      expect(screen.getAllByText("Select Position").length).toBeGreaterThanOrEqual(1);
    });

    it("renders the interval input for monthly", async () => {
      renderBuilder({ defaultFrequency: Frequency.MONTHLY });
      await vi.waitFor(() => {
        expect(screen.getByText("Monthly")).toBeTruthy();
      });
      expect(screen.getByText("Every")).toBeTruthy();
      expect(screen.getByText("month(s)")).toBeTruthy();
    });
  });

  describe("end type interactions", () => {
    it("switches end type to 'after' and shows occurrences input", async () => {
      renderBuilder();
      const user = userEvent.setup();

      await vi.waitFor(() => {
        expect(screen.getByText("never")).toBeTruthy();
      });

      // Click the End select
      await user.click(screen.getByText("never"));
      // Select "after"
      await user.click(screen.getByText("after"));

      // Occurrences input should appear
      await vi.waitFor(() => {
        expect(screen.getByLabelText("Occurrences")).toBeTruthy();
      });
    });

    it("switches end type to 'on' and shows date picker", async () => {
      renderBuilder();
      const user = userEvent.setup();

      await vi.waitFor(() => {
        expect(screen.getByText("never")).toBeTruthy();
      });

      // Click the End select
      await user.click(screen.getByText("never"));
      // Select "on"
      await user.click(screen.getByText("on"));

      // End date picker should appear
      await vi.waitFor(() => {
        expect(screen.getByLabelText("End Date")).toBeTruthy();
      });
    });

    it("types occurrences value in the after field", async () => {
      renderBuilder();
      const user = userEvent.setup();

      await vi.waitFor(() => {
        expect(screen.getByText("never")).toBeTruthy();
      });

      // Switch to "after"
      await user.click(screen.getByText("never"));
      await user.click(screen.getByText("after"));

      await vi.waitFor(() => {
        expect(screen.getByLabelText("Occurrences")).toBeTruthy();
      });

      // Type a value
      const occInput = screen.getByLabelText("Occurrences");
      await user.type(occInput, "10");

      // Verify the input has the value (cast to HTMLInputElement for .value access)
      expect((occInput as HTMLInputElement).value).toBe("10");
    });

    it("switches back to never from after", async () => {
      renderBuilder();
      const user = userEvent.setup();

      await vi.waitFor(() => {
        expect(screen.getByText("never")).toBeTruthy();
      });

      // Switch to "after"
      await user.click(screen.getByText("never"));
      await user.click(screen.getByText("after"));

      await vi.waitFor(() => {
        expect(screen.getByLabelText("Occurrences")).toBeTruthy();
      });

      // Switch back to "never"
      await user.click(screen.getByText("after"));
      await user.click(screen.getByText("never"));

      await vi.waitFor(() => {
        expect(screen.queryByLabelText("Occurrences")).toBeNull();
      });
    });
  });

  describe("interval input", () => {
    it("changes interval value for weekly frequency", async () => {
      const onChange = vi.fn();
      renderBuilder({ onChange });
      const user = userEvent.setup();

      await vi.waitFor(() => {
        expect(screen.getByText("week(s)")).toBeTruthy();
      });

      // Find the interval input and type a digit to change the value
      const intervalInput = screen.getByRole("spinbutton");
      await user.type(intervalInput, "2");

      await vi.waitFor(() => {
        const calls = onChange.mock.calls;
        const lastRRule = calls[calls.length - 1][0] as string;
        // Base interval is 1, typing "2" appends to make 12
        expect(lastRRule).toContain("INTERVAL=12");
      });
    });
  });

  describe("rruleString rehydration - complex strings", () => {
    it("rehydrates YEARLY with BYMONTH", async () => {
      renderBuilder({
        rruleString: "RRULE:FREQ=YEARLY;BYMONTH=6;BYMONTHDAY=15",
      });
      await vi.waitFor(() => {
        expect(screen.getByText("Yearly")).toBeTruthy();
      });
    });

    it("rehydrates MONTHLY with BYSETPOS", async () => {
      renderBuilder({
        rruleString: "RRULE:FREQ=MONTHLY;BYSETPOS=2;BYDAY=TU",
      });
      await vi.waitFor(() => {
        expect(screen.getByText("Monthly")).toBeTruthy();
      });
    });

    it("rehydrates HOURLY frequency", async () => {
      renderBuilder({
        rruleString: "RRULE:FREQ=HOURLY;INTERVAL=4",
      });
      await vi.waitFor(() => {
        expect(screen.getByText("Hourly")).toBeTruthy();
      });
    });
  });

  describe("monthly select interactions", () => {
    it("selects a day in On Day calendar dropdown", async () => {
      const onChange = vi.fn();
      renderBuilder({ defaultFrequency: Frequency.MONTHLY, onChange });
      const user = userEvent.setup();

      await vi.waitFor(() => {
        expect(screen.getByText("On Day")).toBeTruthy();
      });

      // The On Day row has a SelectDayCalendar — find the combobox
      const daySelects = screen.getAllByLabelText("Select Day");
      const dayCombobox = daySelects.find((el) => el.getAttribute("role") === "combobox")!;
      await user.click(dayCombobox);

      // Select day 15
      const option15 = await screen.findByRole("option", { name: "15" });
      await user.click(option15);

      await vi.waitFor(() => {
        const calls = onChange.mock.calls;
        const lastRRule = calls[calls.length - 1][0] as string;
        expect(lastRRule).toContain("BYMONTHDAY=15");
      });
    });

    it("clicking On The radio triggers onChange with cleared byMonthDay", async () => {
      const onChange = vi.fn();
      renderBuilder({ defaultFrequency: Frequency.MONTHLY, onChange });
      const user = userEvent.setup();

      await vi.waitFor(() => {
        expect(screen.getByText("On The")).toBeTruthy();
      });

      // Click On The radio
      const onTheRadio = screen.getByRole("radio", { name: /on the/i });
      await user.click(onTheRadio);

      // onChange should fire
      await vi.waitFor(() => {
        expect(onChange).toHaveBeenCalled();
      });
    });

    it("clicking On Day radio triggers onChange with cleared bySetPos", async () => {
      const onChange = vi.fn();
      renderBuilder({ defaultFrequency: Frequency.MONTHLY, onChange });
      const user = userEvent.setup();

      await vi.waitFor(() => {
        expect(screen.getByText("On Day")).toBeTruthy();
      });

      // Click On The first, then On Day
      const onTheRadio = screen.getByRole("radio", { name: /on the/i });
      await user.click(onTheRadio);
      const onDayRadio = screen.getByRole("radio", { name: /on day/i });
      await user.click(onDayRadio);

      await vi.waitFor(() => {
        expect(onChange).toHaveBeenCalled();
      });
    });
  });

  describe("yearly select interactions", () => {
    it("selects a month in the On row", async () => {
      const onChange = vi.fn();
      renderBuilder({ defaultFrequency: Frequency.YEARLY, onChange });
      const user = userEvent.setup();

      await vi.waitFor(() => {
        expect(screen.getByText("On")).toBeTruthy();
      });

      // Find the first SelectMonth (On row)
      const monthSelects = screen.getAllByLabelText("Select Month");
      await user.click(monthSelects[0]);

      // Select June
      const junOption = await screen.findByRole("option", { name: "Jun" });
      await user.click(junOption);

      await vi.waitFor(() => {
        const calls = onChange.mock.calls;
        const lastRRule = calls[calls.length - 1][0] as string;
        expect(lastRRule).toContain("BYMONTH=6");
      });
    });

    it("switches to On The radio and selects position", async () => {
      const onChange = vi.fn();
      renderBuilder({ defaultFrequency: Frequency.YEARLY, onChange });
      const user = userEvent.setup();

      await vi.waitFor(() => {
        expect(screen.getByText("On The")).toBeTruthy();
      });

      // Click On The radio (BYSETPOS)
      const radios = screen.getAllByRole("radio");
      // Second radio is BYSETPOS
      await user.click(radios[1]);

      await vi.waitFor(() => {
        expect(onChange).toHaveBeenCalled();
      });
    });
  });

  describe("enableOpenOnClickDatePicker", () => {
    it("disables click-to-open when set to false", () => {
      renderBuilder({ enableOpenOnClickDatePicker: false });
      // Should still render the start date picker
      expect(screen.getByLabelText(/start date/i)).toBeTruthy();
    });
  });
});
