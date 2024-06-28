import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import RepeatMonthly from "../RepeatMonthly";
import useBuilderStore from "../../../store/builderStore";

export default {
  title: "Repeat/RepeatMonthly",
  component: RepeatMonthly,
} as Meta<typeof RepeatMonthly>;

const Template: StoryFn<typeof RepeatMonthly> = () => {
  const builderStore = useBuilderStore();
  return (
    <RepeatMonthly value={builderStore.repeatDetails} onChange={builderStore.setRepeatDetails} />
  );
};

export const Primary = Template;
