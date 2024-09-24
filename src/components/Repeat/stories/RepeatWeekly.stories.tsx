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
      control: "select",
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
  const {
    setRepeatDetails, repeatDetails,
  } = builderStore;
  const { inputSize, inputVariant } = args;
  return (
    <RepeatWeekly
      value={repeatDetails}
      onChange={setRepeatDetails}
      inputVariant={inputVariant}
      inputSize={inputSize}
    />
  );
};

export const Primary = Template;
