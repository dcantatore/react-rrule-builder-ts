import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import RepeatYearly from "../RepeatYearly";
import useBuilderStore from "../../../store/builderStore";
import { YearlyBy } from "../Repeat.types";

export default {
  title: "Repeat/RepeatYearly",
  component: RepeatYearly,
  argTypes: {
    enableYearlyInterval: {
      control: {
        type: "boolean",
      },
    },
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
    enableYearlyInterval: true,
    inputSize: "small",
    inputVariant: "filled",
  },
} as Meta<typeof RepeatYearly>;

const Template: StoryFn<typeof RepeatYearly> = (args) => {
  const {
    repeatDetails, setRepeatDetails, radioValue, setRadioValue,
  } = useBuilderStore();

  const { inputSize, inputVariant, enableYearlyInterval } = args;
  return (
    <RepeatYearly
      value={repeatDetails}
      onChange={setRepeatDetails}
      radioValue={radioValue as YearlyBy}
      setRadioValue={setRadioValue}
      inputVariant={inputVariant}
      inputSize={inputSize}
      enableYearlyInterval={enableYearlyInterval}
    />
  );
};

export const Primary = Template;
