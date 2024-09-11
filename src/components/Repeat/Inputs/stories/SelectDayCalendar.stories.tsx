import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import SelectDayCalendar from "../SelectDayCalendar";
import useBuilderStore from "../../../../store/builderStore";

export default {
  title: "Inputs/SelectDayCalendar",
  component: SelectDayCalendar,
   argTypes: {
    inputSize: {
      control: "select",
      options: ["small", "medium"],
    },
    inputVariant: {
      control:  "select",
      options: ["standard", "outlined", "filled"],
    },
  },
   args: {
      inputSize: "small",
      inputVariant: "outlined",
  },
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
      inputVariant={args.inputVariant}
      inputSize={args.inputSize}
    />
  );
};

export const Primary = Template;
Primary.args = {
  disabled: false,
  maxDaysInMonth: 31,
};
