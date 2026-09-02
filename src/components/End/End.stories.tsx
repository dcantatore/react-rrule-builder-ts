import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { BuilderStoreProvider } from "../../store/builderStore";
import { DateFormat } from "../RRuleBuilder/RRuleBuilder.types";
import End from "./End";

export default {
  title: "End/End",
  component: End,
  decorators: [(Story: React.ComponentType) => (
    <BuilderStoreProvider>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <Story />
      </LocalizationProvider>
    </BuilderStoreProvider>
  )],
  args: {
    enableOpenOnClickDatePicker: true,
  },
  argTypes: {
    dateFormat: {
      control: "select",
      options: Object.values(DateFormat),
    },
  },
} as Meta<typeof End>;

const Template: StoryFn<typeof End> = (args) => <End {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  datePickerEndLabel: "End Date Label",
};
