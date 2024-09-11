import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import SelectDayWeek from "../SelectDayWeek";
import useBuilderStore from "../../../../store/builderStore";

export default {
  title: "Inputs/SelectDayWeek",
  component: SelectDayWeek,
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
} as Meta<typeof SelectDayWeek>;

const Template: StoryFn<typeof SelectDayWeek> = (args) => {
  const builderStore = useBuilderStore();
  const { disabled } = args;
  return (
    <SelectDayWeek value={builderStore.repeatDetails} onChange={builderStore.setRepeatDetails} disabled={disabled}  inputVariant={args.inputVariant} inputSize={args.inputSize} />
  );
};

export const Primary = Template;
Primary.args = {
  disabled: false,
};
