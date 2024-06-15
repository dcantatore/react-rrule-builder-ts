# PRE-RELEASE - NOT YET STABLE - READ BELOW

[![npm version](https://badge.fury.io/js/react-rrule-builder-ts.svg)](https://badge.fury.io/js/react-rrule-builder-ts)

[//]: # ([//]:  TODO - test )
[//]: # ([![Coverage Status]&#40;https://coveralls.io/repos/github/dcantatore/react-rrule-builder-ts/badge.svg?branch=main&#41;]&#40;https://coveralls.io/github/dcantatore/react-rrule-builder-ts?branch=main&#41;)

[![Storybook](https://img.shields.io/badge/Storybook-React%20RRULE%20Builder%20TS-ff69b4)](https://dcantatore.github.io/react-rrule-builder-ts/)

[![NPM](https://nodei.co/npm/react-rrule-builder-ts.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/react-rrule-builder-ts/)

# react-rrule-builder-ts

This is a React component that generates a RRULE string for use in iCalendar events.

It is a TypeScript interpretation that was inspired by the original and now deprecated [react-rrule-builder](https://www.npmjs.com/package/react-rrule-builder) package.

If you would like to see the demo and it's components functionality in action, you can view the [storybook](https://dcantatore.github.io/react-rrule-builder-ts/).

## Info

This is in pre-release and while it is published to npm, it is not yet ready for production use. It is still in development and testing. When this note is removed it will be ready.

## Features

- Generates RRULE strings
- Supports all RRULE options
- Has form validation with yup

## Other important notes
- Has mui currently as a peer dependency
- Uses mui calendar for date selection, this may change in the future and allow for other date pickers
- Uses zustand to manage and expose state to end users
  - This is useful for when you need to validate the form outside of the component and all of it's other functionality
