import React from 'react';
import RRuleGenerator from './RRuleGenerator';
import {Meta, StoryFn} from "@storybook/react";

export default {
  title: 'Example/RRuleGenerator',
  component: RRuleGenerator,
} as Meta<typeof RRuleGenerator>;

const Template: StoryFn<typeof RRuleGenerator> = (args) => <RRuleGenerator {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Generate Rule',
};
