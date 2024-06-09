import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Frequency } from "rrule";
import RepeatDaily from "./RepeatDaily";

export default {
  title: "Repeat/RepeatDaily",
  component: RepeatDaily,
} as Meta<typeof RepeatDaily>;

const Template: StoryFn<typeof RepeatDaily> = (args) => <RepeatDaily {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  defaultValue: { interval: 1, frequency: Frequency.DAILY },
  onChange: (value) => console.log(value),
};
