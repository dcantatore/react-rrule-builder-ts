import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import RRuleGenerator from "./RRuleGenerator";

export default {
  title: "Example/RRuleGenerator",
  component: RRuleGenerator,
} as Meta<typeof RRuleGenerator>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: StoryFn<typeof RRuleGenerator> = (args) => <RRuleGenerator {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  datePickerLabel: "Date In Storybook",
  datePickerInitialDate: null,
};
