import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import RepeatWeekly from "../RepeatWeekly";
import useBuilderStore, { BuilderStoreProvider } from "../../../store/builderStore";

export default {
  title: "Repeat/RepeatWeekly",
  component: RepeatWeekly,
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
      enableResponsiveLayout={args.enableResponsiveLayout}
    />
  );
};

export const Primary = Template;
