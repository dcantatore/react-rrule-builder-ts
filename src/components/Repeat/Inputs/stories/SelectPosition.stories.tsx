import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import SelectPosition from "../SelectPosition";
import useBuilderStore from "../../../../store/builderStore";

export default {
  title: "Inputs/SelectPosition",
  component: SelectPosition,
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
} as Meta<typeof SelectPosition>;

const Template: StoryFn<typeof SelectPosition> = (args) => {
  const builderStore = useBuilderStore();
  const { disabled } = args;
  return (
    <SelectPosition value={builderStore.repeatDetails} onChange={builderStore.setRepeatDetails} disabled={disabled}  inputVariant={args.inputVariant} inputSize={args.inputSize} />
  );
};

export const Primary = Template;
Primary.args = {
  disabled: false,
};
