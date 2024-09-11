import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import IntervalTextInput from "../IntervalTextInput";
import useBuilderStore from "../../../../store/builderStore";

export default {
  title: "Inputs/IntervalTextInput",
  component: IntervalTextInput,
  argTypes: {
    unit: {
      control: "text",
    },
    pluralizeUnit: {
      control: "boolean",
    },
  },

} as Meta<typeof IntervalTextInput>;

const Template: StoryFn<typeof IntervalTextInput> = (args) => {
  const builderStore = useBuilderStore();
  return (
    <IntervalTextInput {...args} value={builderStore.repeatDetails} onChange={builderStore.setRepeatDetails} />
  );
};

export const Primary = Template;
Primary.args = {
  unit: "Hour",
  pluralizeUnit: true,
};
