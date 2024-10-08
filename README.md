# react-rrule-builder-ts

[![npm version](https://badge.fury.io/js/react-rrule-builder-ts.svg)](https://badge.fury.io/js/react-rrule-builder-ts)

[//]: # ([//]:  TODO - test )
[//]: # ([![Coverage Status]&#40;https://coveralls.io/repos/github/dcantatore/react-rrule-builder-ts/badge.svg?branch=main&#41;]&#40;https://coveralls.io/github/dcantatore/react-rrule-builder-ts?branch=main&#41;)

[![Storybook](https://img.shields.io/badge/Storybook-React%20RRULE%20Builder%20TS-ff69b4)](https://dcantatore.github.io/react-rrule-builder-ts/)

[![NPM](https://nodei.co/npm/react-rrule-builder-ts.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/react-rrule-builder-ts/)

## Overview

`react-rrule-builder-ts` is a React component that generates RRULE strings for use in iCalendar events, built with TypeScript. This package is inspired by the original [react-rrule-generator](https://www.npmjs.com/package/react-rrule-generator), which is now deprecated.

You can view the demo and explore component functionality in the [storybook](https://dcantatore.github.io/react-rrule-builder-ts/).

## Status

**Semi-Pre-Release**: This package is currently in pre-release. Although it's available on npm, it is not yet stable for production use. The package is under active development and testing. Once it reaches stability, this note will be removed.

## Features

- Generates RRULE strings compliant with iCalendar standards.
- Supports all RRULE options.
- Includes form validation using Yup.
- Integrates with MUI (Material-UI) components.
- Manages state using Zustand, making state observable and accessible for external validation.

## Installation

To install the package, run:

```bash
npm install react-rrule-builder-ts
```

## Usage

```jsx
import RRuleBuilder from 'react-rrule-builder-ts';
import {AdapterLuxon} from "@mui/x-date-pickers/AdapterLuxon"; // ** YOUR DATE ADAPTER **
import {DateTime} from "luxon"; // ** BASED ON YOUR DATE ADAPTER **

const MyComponent = () => {
  const handleRRuleChange = (rruleString) => {
    console.log(rruleString);
  };

  return (
    <RRuleBuilder
      dateAdapter={AdapterLuxon} // ** YOUR DATE ADAPTER **
      datePickerInitialDate={DateTime.now()} // ** BASED ON YOUR DATE ADAPTER ** 
      onChange={handleRRuleChange}
      enableYearlyInterval={true}
    />
  );
};
```

## API

### RRuleBuilder Props
🛠️ = Coming soon / in progress

- **`dateAdapter`** (`new (...args: any[]) => MuiPickersAdapter<TDate>;`) 
  This is an instance of the date adapter used by the date picker component. Such as AdapterDateFns, AdapterLuxon, AdapterDayjs, etc.

- **`datePickerInitialDate`** (`TDate`)  
  Initial date for the date picker component, the type of this needs to match the date adapter used.

- **`onChange`** (`(rruleString: string) => void`)  
  Callback function triggered when the RRULE string changes.

- **`rruleString`** (`string`)  
  Initial RRULE string to initialize the component state.

- **`enableOpenOnClickDatePicker`** (`boolean`)  
  When enabled, the date picker will open when the input field is clicked. This is true by default.

- **`enableYearlyInterval`** (`boolean`)  
  Enables the yearly interval option in the frequency selector.

- **`showStartDate`** (`boolean`)  
  Shows or hides the start date picker.

- **`defaultFrequency`** (`Frequency`)  
  Sets the default frequency of the recurrence rule (e.g., daily, weekly).

- **`inputSize`** (`TextFieldProps["size"]`)  
  Specifies the size of the input fields (e.g., small, medium).

- **`inputVariant`** (`TextFieldProps["variant"]`)  
  Specifies the variant of the input fields (e.g., outlined, filled).

- **`lang`** (`Lang`)  
  Localization options for date picker labels.  
  **`Lang`** object structure:
  - **`startDatePickerLabel`** (`string`)  
    Label for the start date picker.
  - **`endDatePickerLabel`** (`string`)  
    Label for the end date picker.
 
- **`timezone`** (`string`)  
  Timezone to use for the date picker and RRULE string. Default is 'UTC'. This is also largely dependent on the date adapter used, read MUIs documentation for more information.
    
- **`enableSmallScreenDetection`** (`boolean`) 🛠️
Enables detection of the parent container to adjust the layout accordingly for better responsiveness. If set to true, the component will monitor the screen size and adjust its design elements to fit smaller parents

- **`smallScreenBreakpoint`** (`number`) 🛠️
Defines the breakpoint (in pixels) for small containers. When the parent container width is below this value, the component will switch to a layout optimized for smaller containers. Default is typically set to 350 pixels.

- **`dense`** (`boolean`) 🛠️
Enables a denser layout with reduced padding and margins, suitable for compact displays or when conserving screen space is desired.

## Store and Actions

The component uses a Zustand store for state management, with the following state and actions:

### BuilderState
🛠️ = Coming soon / in progress
- **`repeatDetails`**: Manages details for repeat rules.
- **`frequency`**: Current frequency of the RRULE.
- **`startDate`**: The selected start date.
- **`validationErrors`**:  🛠️ Holds validation errors.
- **`endDetails`**: Manages end conditions for the RRULE.
- **`RRuleString`**: The generated RRULE string.
- **`radioValue`**: Option for monthly and yearly rule settings.
- **`minEndDate`**: Minimum end date based on the start date. This is always the start date plus one day, an RRULE cannot have an end date before or on the start date, it would not run. 

### BuilderActions
🛠️ = Coming soon / in progress

- **`setFrequency(frequency: Frequency)`**: Sets the frequency and resets relevant state.
- **`setRepeatDetails(details: AllRepeatDetails)`**: Updates repeat rule details and rebuilds the RRULE string.
- **`validateForm()`**: 🛠️ Validates the form using Yup and returns a boolean indicating success.
- **`setEndDetails(details: EndDetails)`**: Updates the end details of the rule.
- **`setStartDate(startDate: TDate | null)`**: Sets the start date and adjusts end date if necessary, needs to be the Date type of the date adapter used.
- **`buildRRuleString()`**: Constructs the RRULE string from the current state.
- **`setOnChange(onChange: (rruleString: string) => void)`**: Sets the onChange callback function.
- **`setStoreFromRRuleString(rruleString: string)`**: Populates the store state from an existing RRULE string.
- **`setRadioValue(radioValue: MonthBy | YearlyBy | null)`**: Sets the radio value for monthly/yearly repeat details.

## Other Notes

- MUI is currently a peer dependency and is used for UI components.
- The package uses MUI's DatePicker for date selection, you can use your own Adapter for the date picker.
- Zustand is used to manage state, making it observable and enabling external validation, which is beneficial for complex form interactions.
