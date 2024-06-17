import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import SelectDayCalendar from "./SelectDayCalendar";
import useBuilderStore from "../../../store/builderStore";

export default {
  title: "Selects/SelectDayCalendar",
  component: SelectDayCalendar,
} as Meta<typeof SelectDayCalendar>;

const Template: StoryFn<typeof SelectDayCalendar> = (args) => {
  const builderStore = useBuilderStore();
  const { disabled, maxDaysInMonth } = args;
  return (
    <SelectDayCalendar
      value={builderStore.repeatDetails}
      onChange={builderStore.setRepeatDetails}
      disabled={disabled}
      maxDaysInMonth={maxDaysInMonth}
    />
  );
};

export const Primary = Template;
Primary.args = {
  disabled: false,
  maxDaysInMonth: 31,
};
