import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import SelectMonth from "../SelectMonth";
import useBuilderStore from "../../../../store/builderStore";

export default {
  title: "Inputs/SelectMonth",
  component: SelectMonth,
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
} as Meta<typeof SelectMonth>;

const Template: StoryFn<typeof SelectMonth> = (args) => {
  const builderStore = useBuilderStore();
  const { disabled } = args;
  return (
    <SelectMonth value={builderStore.repeatDetails} onChange={builderStore.setRepeatDetails} disabled={disabled}  inputVariant={args.inputVariant} inputSize={args.inputSize} />
  );
};

export const Primary = Template;
Primary.args = {
  disabled: false,
};
