import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import RepeatWeekly from "../RepeatWeekly";
import useBuilderStore from "../../../store/builderStore";

export default {
  title: "Repeat/RepeatWeekly",
  component: RepeatWeekly,
} as Meta<typeof RepeatWeekly>;

const Template: StoryFn<typeof RepeatWeekly> = () => {
  const builderStore = useBuilderStore();
  return (
    <RepeatWeekly value={builderStore.repeatDetails} onChange={builderStore.setRepeatDetails} />
  );
};

export const Primary = Template;
