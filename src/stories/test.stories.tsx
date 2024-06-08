import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Button from "@mui/material/Button";
export interface ButtonProps {
  label: string;
  onClick: () => void;
}

const ButtonExample = ({ label, onClick }: ButtonProps) => {
  return <Button variant="outlined" onClick={onClick}>{label}</Button>;
};

export default {
  title: 'Example/ButtonExample',
  component: ButtonExample,
  argTypes: {
    onClick: { action: 'clicked' },
  },
} as Meta;

const Template: StoryFn<ButtonProps> = (args) => <ButtonExample {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Primary Button',
};

export const WithEmoji = Template.bind({});
WithEmoji.args = {
  label: '😀 😎 👍 💯',
};
