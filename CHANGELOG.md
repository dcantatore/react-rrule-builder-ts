# Changelog

## [0.1.0]

### Breaking Changes

- **`EndDetails` is now a discriminated union.** Consumers must narrow on `endingType` before accessing `endDate` or `occurrences`:
  ```typescript
  // Before
  interface EndDetails<TDate> {
    endingType: EndType;
    endDate?: TDate | null;
    occurrences?: number | null;
  }

  // After
  type EndDetails<TDate> =
    | { endingType: EndType.NEVER }
    | { endingType: EndType.AFTER; occurrences: number | null }
    | { endingType: EndType.ON; endDate: TDate | null }
  ```

- **`AllRepeatDetails` array fields no longer accept `null`.** Use `[]` instead of `null` for `byDay`, `byMonth`, `byMonthDay`, `bySetPos`. Use `1` instead of `null` for `interval`.

- **`Months` changed from string enum to numeric const object.** `Months.JAN` is now `1` (number) instead of `"1"` (string).

- **`useBuilderStore()` requires React Context.** The store is no longer a global singleton. `useBuilderStore()` must be called inside a `<BuilderStoreProvider>` or `<RRuleBuilder>`. `RRuleBuilder` auto-wraps itself in a provider, so typical usage is unaffected.

### Added

- Per-instance Zustand store via `createStore()` factory + React Context — multiple `<RRuleBuilder>` instances work independently on the same page.
- `BuilderStoreProvider` component exported for external store access from sibling components.
- All public types and enums exported: `Weekday`, `Months`, `MonthBy`, `YearlyBy`, `WeekdayExtras`, `OnThe`, `AllWeekDayOptions`, `EndType`, `AllRepeatDetails`, `EndDetails`.
- ARIA accessibility: `aria-label` on interval input, `aria-pressed` and `aria-label` on weekly day buttons, `role="group"` on day ButtonGroup.
- Unique HTML IDs via `useId()` (React 18) on all form controls — fixes duplicate ID violations when multiple instances coexist.
- `safeParseInt` utility — all 5 `parseInt` call sites now guard against `NaN`.
- Error handling in `setStoreFromRRuleString` — malformed RRULE strings no longer crash the React tree.
- Yup validation schemas with range checks: `bySetPos` min(-1)/max(4), `byMonthDay` min(1)/max(31), `byMonth` min(1)/max(12), weekly `byDay` min(1).
- `build` script and correct `main`/`module`/`types` fields in `package.json`.
- All peer dependencies externalized in Vite build config.
- 132 tests across 6 test files (Vitest + React Testing Library).
- Codecov integration via GitHub Actions.
- `preinstall` guard to enforce yarn as package manager.

### Fixed

- `validateForm` rejected `Frequency.YEARLY` (value `0`) due to falsy check — now uses `isNil()`.
- `setStartDate` date comparison was backwards — end date adjustment now triggers correctly.
- `SelectMonth` value never showed as selected due to number/string mismatch.
- `SelectDayCalendar` passed array to non-multiple Select.
- Rehydration via `setStoreFromRRuleString` fired `onChange` 3-4 times with intermediate wrong values — now batches into single `set()` + one `onChange`.
- Storybook error details display condition was inverted (`!errors.length` → `errors.length > 0`).
- `buildRRuleString` output `INTERVAL=0` (invalid per RFC 5545) — default changed to `1`.
- Store types used `any` — now concretely typed to `DateTime`.
- Shared mutable `initialState.repeatDetails` reference — now spreads a fresh copy on reset.
- `@ts-ignore` hiding broken weekday mapping — replaced with explicit `day.toString() as Weekday`.
- Yearly interval schema used `Yup.mixed<never>()` which rejected all values — changed to `Yup.number().optional()`.
- Empty arrays passed through truthiness checks to RRule — all guards now use `.length > 0`.

### Performance

- `setFrequency`: 4 re-renders → 2 (batched `set()` calls).
- `setStartDate`: 4-5 re-renders → 2 (batched `set()` calls).
- `setStoreFromRRuleString`: 12+ re-renders → 2 (batched `set()` calls).
- `SelectDayWeek`: replaced `useEffect` + `useState` with `useMemo` — eliminates extra render cycle.

### Removed

- Dead responsive logic in `RepeatMonthly` (`const size = 400` and `size < 301` conditionals).
- Unused `WeekdayStr` import from store.

## [0.0.21] - Previous release

Initial pre-release versions.
