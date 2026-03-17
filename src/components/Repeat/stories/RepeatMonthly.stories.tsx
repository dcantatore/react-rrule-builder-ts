import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import RepeatMonthly from "../RepeatMonthly";
import useBuilderStore, { BuilderStoreProvider } from "../../../store/builderStore";
import { MonthBy } from "../Repeat.types";

export default {
  title: "Repeat/RepeatMonthly",
  component: RepeatMonthly,
  decorators: [(Story: React.ComponentType) => (<BuilderStoreProvider><Story /></BuilderStoreProvider>)],
  argTypes: {
    inputSize: {
      control: "select",
      options: ["small", "medium"],
    },
    inputVariant: {
      control: "select",
      options: ["standard", "outlined", "filled"],
    },
    enableResponsiveLayout: {
      control: "boolean",
    },
  },
  args: {
    inputSize: "small",
    inputVariant: "outlined",
    enableResponsiveLayout: true,
  },
} as Meta<typeof RepeatMonthly>;

const Template: StoryFn<typeof RepeatMonthly> = (args) => {
  const builderStore = useBuilderStore();
  const {
    radioValue, setRepeatDetails, setRadioValue, repeatDetails,
  } = builderStore;
  const { inputSize, inputVariant, enableResponsiveLayout } = args;
  return (
    <RepeatMonthly
      value={repeatDetails}
      onChange={setRepeatDetails}
      radioValue={radioValue as MonthBy}
      setRadioValue={setRadioValue}
      inputVariant={inputVariant}
      inputSize={inputSize}
      enableResponsiveLayout={enableResponsiveLayout}
    />
  );
};

export const Primary = Template;
