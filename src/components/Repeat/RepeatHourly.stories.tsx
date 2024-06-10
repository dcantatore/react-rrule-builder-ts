import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Frequency } from "rrule";
import RepeatHourly from "./RepeatHourly";

export default {
  title: "Repeat/RepeatHourly",
  component: RepeatHourly,
} as Meta<typeof RepeatHourly>;

const Template: StoryFn<typeof RepeatHourly> = (args) => <RepeatHourly {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  value: { interval: 1 },
  onChange: (value) => console.log(value),
};
