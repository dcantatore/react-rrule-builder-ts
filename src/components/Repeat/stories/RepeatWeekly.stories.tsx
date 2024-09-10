import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import RepeatWeekly from "../RepeatWeekly";
import useBuilderStore from "../../../store/builderStore";

export default {
  title: "Repeat/RepeatWeekly",
  component: RepeatWeekly,
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
} as Meta<typeof RepeatWeekly>;

const Template: StoryFn<typeof RepeatWeekly> = (args) => {
  const builderStore = useBuilderStore();
  return (
    <RepeatWeekly value={builderStore.repeatDetails} onChange={builderStore.setRepeatDetails}  inputVariant={args.inputVariant} inputSize={args.inputSize} />
  );
};

export const Primary = Template;
