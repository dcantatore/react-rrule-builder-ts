import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import RepeatHourly from "../RepeatHourly";
import useBuilderStore from "../../../store/builderStore";

export default {
  title: "Repeat/RepeatHourly",
  component: RepeatHourly,
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
} as Meta<typeof RepeatHourly>;

const Template: StoryFn<typeof RepeatHourly> = (args) => {
  const builderStore = useBuilderStore();
  const { repeatDetails, setRepeatDetails } = builderStore;
  const { inputSize, inputVariant } = args;
  return (
    <RepeatHourly
      value={repeatDetails}
      onChange={setRepeatDetails}
      inputVariant={inputVariant}
      inputSize={inputSize}
    />
  );
};

export const Primary = Template;
