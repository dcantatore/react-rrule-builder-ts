import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Frequency } from "rrule";
import RepeatYearly from "./RepeatYearly";

export default {
  title: "Repeat/RepeatYearly",
  component: RepeatYearly,
} as Meta<typeof RepeatYearly>;

const Template: StoryFn<typeof RepeatYearly> = (args) => <RepeatYearly {...args} />;

export const Primary = Template.bind({});
Primary.args = {
// @ts-ignore
  value: {
    byDay: [],
    byMonthDay: [],
    bySetPos: [],
  },
  onChange: (value) => console.log(value),
};
