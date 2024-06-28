import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import SelectPosition from "../SelectPosition";
import useBuilderStore from "../../../../store/builderStore";

export default {
  title: "Inputs/SelectPosition",
  component: SelectPosition,
} as Meta<typeof SelectPosition>;

const Template: StoryFn<typeof SelectPosition> = (args) => {
  const builderStore = useBuilderStore();
  const { disabled } = args;
  return (
    <SelectPosition value={builderStore.repeatDetails} onChange={builderStore.setRepeatDetails} disabled={disabled} />
  );
};

export const Primary = Template;
Primary.args = {
  disabled: false,
};
