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
import { DateTime } from 'luxon';

const MyComponent = () => {
  const handleRRuleChange = (rruleString) => {
    console.log(rruleString);
  };

  return (
    <RRuleBuilder
      datePickerInitialDate={DateTime.now()}
      onChange={handleRRuleChange}
      enableYearlyInterval={true}
    />
  );
};
```

## API

### RRuleBuilder Props
🛠️ = Coming soon / in progress
- **`datePickerInitialDate`** (`DateTime`)  
  Initial date for the date picker component.

- **`onChange`** (`(rruleString: string) => void`)  
  Callback function triggered when the RRULE string changes.

- **`rruleString`** (`string`)  
  Initial RRULE string to initialize the component state.

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

### BuilderActions
🛠️ = Coming soon / in progress

- **`setFrequency(frequency: Frequency)`**: Sets the frequency and resets relevant state.
- **`setRepeatDetails(details: AllRepeatDetails)`**: Updates repeat rule details and rebuilds the RRULE string.
- **`validateForm()`**: 🛠️ Validates the form using Yup and returns a boolean indicating success.
- **`setEndDetails(details: EndDetails)`**: Updates the end details of the rule.
- **`setStartDate(startDate: DateTime | null)`**: Sets the start date and adjusts end date if necessary.
- **`buildRRuleString()`**: Constructs the RRULE string from the current state.
- **`setOnChange(onChange: (rruleString: string) => void)`**: Sets the onChange callback function.
- **`setStoreFromRRuleString(rruleString: string)`**: Populates the store state from an existing RRULE string.
- **`setRadioValue(radioValue: MonthBy | YearlyBy | null)`**: Sets the radio value for monthly/yearly repeat details.

## Other Notes

- MUI is currently a peer dependency and is used for UI components.
- The package uses MUI's DatePicker for date selection, which might be customizable to other date pickers in the future.
- Zustand is used to manage state, making it observable and enabling external validation, which is beneficial for complex form interactions.
