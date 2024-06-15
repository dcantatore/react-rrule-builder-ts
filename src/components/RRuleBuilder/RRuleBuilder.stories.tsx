import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { DateTime } from "luxon";
import RRuleBuilder from "./RRuleBuilder";
import { useBuilderStore } from "../../index";

export default {
  title: "RRuleBuilder",
  component: RRuleBuilder,
} as Meta<typeof RRuleBuilder>;

const Template: StoryFn<typeof RRuleBuilder> = (args) => {
  const {
    validateForm,
    validationErrors,
    buildRRuleString,
    RRuleString,
  } = useBuilderStore();
  const errors = Object.keys(validationErrors);
  return (
    <>
      <RRuleBuilder {...args} />
      <hr />
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
      <hr />
      <Button onClick={buildRRuleString}>
        Build String
      </Button>
      <Typography>
        {RRuleString}
      </Typography>
    </>
  );
};
export const Primary = Template.bind({});
Primary.args = {
  datePickerStartLabel: "Start Date",
  datePickerEndLabel: "End Date",
  datePickerInitialDate: DateTime.now(),
};

const SmallTemplate: StoryFn<typeof RRuleBuilder> = (args) => (
  <Box sx={{ width: 300, backgroundColor: "lightblue" }}>
    <RRuleBuilder {...args} />
  </Box>
);
export const SmallEmbedded = SmallTemplate.bind({});
