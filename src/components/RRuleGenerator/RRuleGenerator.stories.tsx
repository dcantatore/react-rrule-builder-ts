import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import RRuleGenerator from "./RRuleGenerator";

export default {
  title: "RRuleGenerator",
  component: RRuleGenerator,
} as Meta<typeof RRuleGenerator>;

const Template: StoryFn<typeof RRuleGenerator> = (args) => <RRuleGenerator {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  datePickerStartLabel: "Start Date",
  datePickerEndLabel: "End Date",
  datePickerInitialDate: null,
};
