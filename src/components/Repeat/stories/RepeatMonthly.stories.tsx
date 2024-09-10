import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import RepeatMonthly from "../RepeatMonthly";
import useBuilderStore from "../../../store/builderStore";
import {MonthBy} from "../Repeat.types";

export default {
  title: "Repeat/RepeatMonthly",
  component: RepeatMonthly,
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
} as Meta<typeof RepeatMonthly>;

const Template: StoryFn<typeof RepeatMonthly> = (args) => {
  const builderStore = useBuilderStore();
  return (
    <RepeatMonthly
      value={builderStore.repeatDetails}
      onChange={builderStore.setRepeatDetails}
      radioValue={builderStore.radioValue as MonthBy}
      setRadioValue={builderStore.setRadioValue}
      inputVariant={args.inputVariant}
      inputSize={args.inputSize}
    />
  );
};

export const Primary = Template;
