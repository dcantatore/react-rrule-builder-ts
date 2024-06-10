import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import RRuleGenerator from "./RRuleGenerator";
import { useGeneratorStore } from "../../index";

export default {
  title: "RRuleGenerator",
  component: RRuleGenerator,
} as Meta<typeof RRuleGenerator>;

const Template: StoryFn<typeof RRuleGenerator> = (args) => {
  const { validateForm, validationErrors } = useGeneratorStore();
  const errors = Object.keys(validationErrors);
  return (
    <>
      <RRuleGenerator {...args} />

      <Button onClick={() => {
        validateForm();
      }}
      >
        Validate
      </Button>
      {!errors.length ? <Typography color="info">Form is valid</Typography> : <Typography color="error">Form is invalid</Typography>}
      {!errors.length && errors.map((key) => (
        <Typography key={key} color="error">{validationErrors[key]}</Typography>
      ))}
    </>
  );
};
export const Primary = Template.bind({});
Primary.args = {
  datePickerStartLabel: "Start Date",
  datePickerEndLabel: "End Date",
  datePickerInitialDate: null,
};

const SmallTemplate: StoryFn<typeof RRuleGenerator> = (args) => (
  <Box sx={{ width: 300, backgroundColor: "lightblue" }}>
    <RRuleGenerator {...args} />
  </Box>
);
export const SmallEmbedded = SmallTemplate.bind({});
