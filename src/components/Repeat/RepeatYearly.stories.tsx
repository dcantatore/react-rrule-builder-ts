import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import RepeatYearly from "./RepeatYearly";
import useBuilderStore from "../../store/builderStore";

export default {
  title: "Repeat/RepeatYearly",
  component: RepeatYearly,
} as Meta<typeof RepeatYearly>;

const Template: StoryFn<typeof RepeatYearly> = () => {
  const builderStore = useBuilderStore();
  return (
  // @ts-ignore - fix never in RepeatYearly
    <RepeatYearly value={builderStore.repeatDetails} onChange={builderStore.setRepeatDetails} />
  );
};

export const Primary = Template;
