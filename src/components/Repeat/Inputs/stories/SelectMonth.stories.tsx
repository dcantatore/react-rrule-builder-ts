import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import SelectMonth from "../SelectMonth";
import useBuilderStore from "../../../../store/builderStore";

export default {
  title: "Inputs/SelectMonth",
  component: SelectMonth,
} as Meta<typeof SelectMonth>;

const Template: StoryFn<typeof SelectMonth> = (args) => {
  const builderStore = useBuilderStore();
  const { disabled } = args;
  return (
    <SelectMonth value={builderStore.repeatDetails} onChange={builderStore.setRepeatDetails} disabled={disabled} />
  );
};

export const Primary = Template;
Primary.args = {
  disabled: false,
};
