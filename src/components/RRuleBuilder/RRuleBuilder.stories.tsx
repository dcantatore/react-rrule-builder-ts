/* eslint-disable react/prop-types */
import React, { ComponentProps } from "react";
import { Meta, StoryFn } from "@storybook/react";
import {
  Box, Typography, Divider, Paper,
} from "@mui/material";
import Button from "@mui/material/Button";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import RRuleBuilder from "./RRuleBuilder";
import { useBuilderStore, BuilderStoreProvider } from "../../index";

export default {
  title: "RRuleBuilder",
  component: RRuleBuilder,
  decorators: [(Story: React.ComponentType) => (<BuilderStoreProvider><Story /></BuilderStoreProvider>)],
  argTypes: {
    datePickerStartLabel: {
      control: "text",
    },
    datePickerEndLabel: {
      control: "text",
    },
    datePickerInitialDate: {
      control: "date",
    },
    enableYearlyInterval: {
      control: "boolean",
    },
    enableResponsiveLayout: {
      control: "boolean",
    },
    showStartDate: {
      control: "boolean",
    },
    inputSize: {
      control: "select",
      options: ["small", "medium"],
    },
    inputVariant: {
      control: "select",
      options: ["standard", "outlined", "filled"],
    },
  },
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
    <Box sx={{ maxWidth: 700 }}>
      <RRuleBuilder {...args} />

      <Divider sx={{ my: 3 }} />

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Store Tools (not part of the component)
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="contained"
            size="small"
            onClick={() => { validateForm(); }}
          >
            Validate
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={buildRRuleString}
          >
            Build String
          </Button>
        </Box>
        {errors.length > 0 && (
          <Box sx={{ mt: 2 }}>
            {errors.map((key) => (
              <Typography key={key} variant="body2" color="error">{validationErrors[key]}</Typography>
            ))}
          </Box>
        )}
        {!errors.length && RRuleString && (
          <Box sx={{
            mt: 2, p: 1.5, borderRadius: 1, bgcolor: "grey.100",
          }}
          >
            <Typography variant="caption" color="text.secondary">Output</Typography>
            <Typography variant="body2" sx={{ whiteSpace: "pre-wrap", fontFamily: "monospace", mt: 0.5 }}>
              {RRuleString}
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};
export const Primary = Template.bind({});
Primary.args = {
  lang: {
    startDatePickerLabel: "Start Date",
    endDatePickerLabel: "End Date",
  },
  enableYearlyInterval: true,
  enableResponsiveLayout: true,
  showStartDate: true,
  dateAdapter: AdapterLuxon,
};

type SmallEmbeddedProps = ComponentProps<typeof RRuleBuilder> & { containerWidth: number };

const SmallTemplate: StoryFn<SmallEmbeddedProps> = ({
  containerWidth = 300,
  ...args
}) => (
  <Box sx={{
    width: containerWidth, border: "1px dashed", borderColor: "grey.400", borderRadius: 1, p: 2,
  }}
  >
    <RRuleBuilder {...args} />
  </Box>
);

export const SmallEmbedded = SmallTemplate.bind({});
SmallEmbedded.argTypes = {
  containerWidth: {
    control: {
      type: "range", min: 200, max: 750, step: 10,
    },
    description: "Width of the outer container (px)",
    defaultValue: 300,
  },
};
SmallEmbedded.args = {
  containerWidth: 300,
  lang: {
    startDatePickerLabel: "Start Date",
    endDatePickerLabel: "End Date",
  },
  enableYearlyInterval: true,
  enableResponsiveLayout: true,
  showStartDate: true,
  dateAdapter: AdapterLuxon,
};

const WithRRuleStringTemplate: StoryFn<typeof RRuleBuilder> = (args) => (
  <Box sx={{ maxWidth: 700 }}>
    <RRuleBuilder {...args} />

    <Divider sx={{ my: 3 }} />

    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Input String (not part of the component)
      </Typography>
      <Typography variant="body2" sx={{ whiteSpace: "pre-wrap", fontFamily: "monospace" }}>
        {/* eslint-disable-next-line react/destructuring-assignment */}
        {args.rruleString}
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
        Note: To include a start date, add a \n after DTSTART before the RRULE.
      </Typography>
    </Paper>
  </Box>
);

export const WithRRuleString = WithRRuleStringTemplate.bind({});
WithRRuleString.args = {
  lang: {
    startDatePickerLabel: "Custom Start Label",
    endDatePickerLabel: "Custom End Label",
  },
  dateAdapter: AdapterLuxon,
  // rruleString: "DTSTART:20240917T114341Z\nRRULE:INTERVAL=2;FREQ=WEEKLY;BYDAY=FR;COUNT=2",
  // *** rehydrate month with radio selected testing:
  // rruleString: "DTSTART:20240917T114341Z \n RRULE:BYMONTHDAY=11;INTERVAL=2;UNTIL=20290605T020600Z;FREQ=MONTHLY",
  rruleString: "DTSTART:20251217T114341Z \n RRULE:BYSETPOS=2,-1;BYDAY=SA;INTERVAL=1.5;UNTIL=20290605T020600Z;FREQ=MONTHLY",
  // *** rehydrate year with radio selected testing:
  // rruleString: "DTSTART:20240917T114341Z \n RRULE:BYMONTH=6;BYMONTHDAY=2;INTERVAL=1;UNTIL=20290605T020600Z;FREQ=YEARLY",
  // rruleString: "DTSTART:20240917T114341Z \n RRULE:BYMONTH=3;BYSETPOS=2;BYDAY=TU;INTERVAL=1;UNTIL=20290605T020600Z;FREQ=YEARLY",
};
