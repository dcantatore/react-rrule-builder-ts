import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import RepeatYearly from "../RepeatYearly";
import useBuilderStore from "../../../store/builderStore";
import {YearlyBy} from "../Repeat.types";

export default {
  title: "Repeat/RepeatYearly",
  component: RepeatYearly,
  argTypes: {
    enableYearlyInterval: {
      control: {
        type: "boolean",
      },
    },
  }
} as Meta<typeof RepeatYearly>;

const Template: StoryFn<typeof RepeatYearly> = () => {
  const {repeatDetails, setRepeatDetails, radioValue, setRadioValue } = useBuilderStore();
  return (
    <RepeatYearly value={repeatDetails} onChange={setRepeatDetails} radioValue={radioValue as YearlyBy} setRadioValue={setRadioValue} />
  );
};

export const Primary = Template;
