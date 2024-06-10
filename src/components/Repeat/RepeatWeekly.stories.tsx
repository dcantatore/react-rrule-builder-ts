import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Frequency } from "rrule";
import RepeatWeekly from "./RepeatWeekly";

export default {
  title: "Repeat/RepeatWeekly",
  component: RepeatWeekly,
} as Meta<typeof RepeatWeekly>;

const Template: StoryFn<typeof RepeatWeekly> = (args) => <RepeatWeekly {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  defaultValue: {
    interval: 1,
    byDay: [],
  },
  onChange: (value) => console.log(value),
};
