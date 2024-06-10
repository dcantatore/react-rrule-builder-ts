import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import End from "./End";

export default {
  title: "End/End",
  component: End,
} as Meta<typeof End>;

const Template: StoryFn<typeof End> = (args) => <LocalizationProvider dateAdapter={AdapterLuxon}><End {...args} /></LocalizationProvider>;

export const Primary = Template.bind({});
Primary.args = {
  datePickerEndLabel: "End Date Label",
};
