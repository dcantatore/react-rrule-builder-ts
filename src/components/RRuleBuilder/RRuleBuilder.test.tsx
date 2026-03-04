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
});
