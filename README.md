# react-rrule-builder-ts

[![npm version](https://badge.fury.io/js/react-rrule-builder-ts.svg)](https://www.npmjs.com/package/react-rrule-builder-ts)

[![codecov](https://img.shields.io/codecov/c/github/dcantatore/react-rrule-builder-ts?style=flat-square&logo=codecov&logoColor=white&label=coverage)](https://codecov.io/gh/dcantatore/react-rrule-builder-ts)

[![Storybook](https://img.shields.io/badge/Storybook-React%20RRULE%20Builder%20TS-ff69b4)](https://dcantatore.github.io/react-rrule-builder-ts/)

[![NPM](https://nodei.co/npm/react-rrule-builder-ts.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/react-rrule-builder-ts)

## Overview

`react-rrule-builder-ts` is a React component that generates RRULE strings for use in iCalendar events, built with TypeScript. This package is inspired by the original [react-rrule-generator](https://www.npmjs.com/package/react-rrule-generator), which is now deprecated.

You can view the demo and explore component functionality in the [storybook](https://dcantatore.github.io/react-rrule-builder-ts/).

## Status

**Beta**: This package is functional and actively used, but has not yet reached a 1.0 release. The API may change between minor (0.X.X) versions and will be noted in changelog. Bug reports and feedback are welcome.

## Features

- Generates RRULE strings compliant with iCalendar (RFC 5545) standards.
- Supports hourly, daily, weekly, monthly, and yearly frequencies with full repeat options.
- Rehydrate component state from an existing RRULE string.
- Per-instance Zustand store via React Context — multiple `<RRuleBuilder>` instances work independently on the same page.
- Includes form validation using Yup with range-checked schemas per frequency.
- Integrates with MUI (Material-UI) components with customizable size and variant.
- Exports all public types, enums, and the `BuilderStoreProvider` for external store access.
- Accessible: ARIA labels on interactive elements, unique IDs via `useId()`.

## Installation

```bash
yarn add react-rrule-builder-ts
```

or

```bash
npm install react-rrule-builder-ts
```

## Usage

```tsx
import RRuleBuilder from 'react-rrule-builder-ts';
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { DateTime } from "luxon";

const MyComponent = () => {
  const handleRRuleChange = (rruleString: string) => {
    console.log(rruleString);
  };

  return (
    <RRuleBuilder
      dateAdapter={AdapterLuxon}
      datePickerInitialDate={DateTime.now()}
      onChange={handleRRuleChange}
      enableYearlyInterval={true}
      enableResponsiveLayout={true}
    />
  );
};
```

### External Store Access

If you need to access the builder's state from sibling components (e.g. to read `validationErrors` or call `validateForm`), wrap both components in a `BuilderStoreProvider`:

```tsx
import { RRuleBuilder, BuilderStoreProvider, useBuilderStore } from 'react-rrule-builder-ts';
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";

const ValidationStatus = () => {
  const { validationErrors, validateForm } = useBuilderStore();
  return (
    <div>
      <button onClick={() => validateForm()}>Validate</button>
      {Object.entries(validationErrors).map(([field, msg]) => (
        <p key={field} style={{ color: 'red' }}>{msg}</p>
      ))}
    </div>
  );
};

const MyPage = () => (
  <BuilderStoreProvider>
    <RRuleBuilder dateAdapter={AdapterLuxon} />
    <ValidationStatus />
  </BuilderStoreProvider>
);
```

## API

### RRuleBuilder Props

- **`dateAdapter`** (`new (...args: any[]) => MuiPickersAdapter<TDate>`)
  Date adapter instance used by MUI date pickers (e.g. `AdapterLuxon`, `AdapterDateFns`, `AdapterDayjs`).

- **`datePickerInitialDate`** (`TDate`)
  Initial date for the start date picker. Type must match the date adapter.

- **`onChange`** (`(rruleString: string) => void`)
  Callback fired when the RRULE string changes.

- **`rruleString`** (`string`)
  Existing RRULE string to rehydrate component state from.

- **`enableOpenOnClickDatePicker`** (`boolean`, default: `true`)
  When enabled, date pickers open when the input field is clicked.

- **`enableYearlyInterval`** (`boolean`, default: `false`)
  Shows the interval input for yearly frequency.

- **`enableResponsiveLayout`** (`boolean`, default: `true`)
  Enables automatic row-to-column layout switching for monthly/yearly controls based on container width.

- **`showStartDate`** (`boolean`, default: `true`)
  Shows or hides the start date picker.

- **`defaultFrequency`** (`Frequency`, default: `Frequency.WEEKLY`)
  Sets the default frequency of the recurrence rule.

- **`inputSize`** (`TextFieldProps["size"]`, default: `"small"`)
  Size of all input fields. Respects MUI theme defaults.

- **`inputVariant`** (`TextFieldProps["variant"]`, default: `"outlined"`)
  Variant of all input fields. Respects MUI theme defaults.

- **`lang`** (`{ startDatePickerLabel: string; endDatePickerLabel: string }`)
  Localization labels for the date pickers.

- **`timeZone`** (`PickersTimezone`, default: `"UTC"`)
  Timezone for date pickers and RRULE generation. See MUI's date picker timezone documentation for details.

## Store and Actions

The component uses a per-instance Zustand store via React Context. Access the store with `useBuilderStore()` inside a `BuilderStoreProvider` or `RRuleBuilder`.

### BuilderState

- **`repeatDetails`** (`AllRepeatDetails`) — Current repeat rule details (interval, byDay, byMonth, byMonthDay, bySetPos).
- **`frequency`** (`Frequency`) — Current RRULE frequency.
- **`startDate`** (`TDate | null`) — Selected start date.
- **`validationErrors`** (`Record<string, string>`) — Validation errors from `validateForm()`.
- **`endDetails`** (`EndDetails<TDate>`) — End condition (never, after N occurrences, or on a specific date).
- **`RRuleString`** (`string | undefined`) — The generated RRULE string.
- **`radioValue`** (`MonthBy | YearlyBy | null`) — Selected radio option for monthly/yearly views.
- **`minEndDate`** (`TDate | undefined`) — Minimum end date (start date + 1 day).

### BuilderActions

- **`setFrequency(frequency: Frequency)`** — Sets frequency and resets repeat details.
- **`setRepeatDetails(details: AllRepeatDetails)`** — Updates repeat details and rebuilds the RRULE string.
- **`validateForm(): Promise<boolean>`** — Validates the form using Yup schemas. Returns `true` if valid, populates `validationErrors` if not.
- **`setEndDetails(details: EndDetails<TDate>)`** — Updates end condition. Uses a discriminated union:
  - `{ endingType: EndType.NEVER }`
  - `{ endingType: EndType.AFTER, occurrences: number | null }`
  - `{ endingType: EndType.ON, endDate: TDate | null }`
- **`setStartDate(startDate: TDate | null)`** — Sets start date and auto-adjusts end date if needed.
- **`buildRRuleString()`** — Rebuilds the RRULE string from current state.
- **`setOnChange(onChange: (rruleString: string) => void)`** — Sets the onChange callback.
- **`setStoreFromRRuleString(rruleString: string)`** — Rehydrates store state from an RRULE string.
- **`setRadioValue(radioValue: MonthBy | YearlyBy | null)`** — Sets the radio option for monthly/yearly.

## Exported Types

```typescript
import {
  RRuleBuilder,
  useBuilderStore,
  BuilderStoreProvider,
  // Enums
  Weekday,        // MO, TU, WE, TH, FR, SA, SU
  Months,         // JAN=1 through DEC=12
  MonthBy,        // BYMONTHDAY, BYSETPOS
  YearlyBy,       // BYMONTH, BYSETPOS
  WeekdayExtras,  // DAY, WEEKDAY, WEEKEND
  OnThe,          // 1, 2, 3, 4, -1
  AllWeekDayOptions,
  EndType,        // NEVER, AFTER, ON
  // Types
  type AllRepeatDetails,
  type EndDetails,
} from 'react-rrule-builder-ts';
```

## Peer Dependencies

This library requires the following peer dependencies:

- `react` >= 18
- `react-dom` >= 18
- `@mui/material`
- `@mui/x-date-pickers`
- `@emotion/react`
- `@emotion/styled`
- `rrule`
- `zustand`
- `yup`
- `luxon`
- `lodash`

## Other Notes

- MUI is a peer dependency and is used for all UI components.
- The package uses MUI's DatePicker — you can use any MUI-compatible date adapter.
- Zustand manages state per-instance via React Context, making it observable and enabling external validation.
