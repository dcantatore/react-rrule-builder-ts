import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Frequency } from "rrule";
import RepeatMonthly from "./RepeatMonthly";

export default {
  title: "Repeat/RepeatMonthly",
  component: RepeatMonthly,
} as Meta<typeof RepeatMonthly>;

const Template: StoryFn<typeof RepeatMonthly> = (args) => <RepeatMonthly {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  value: {
    interval: 1,
    byDay: [],
    byMonthDay: [],
    bySetPos: [],
  },
  onChange: (value) => console.log(value),
};
