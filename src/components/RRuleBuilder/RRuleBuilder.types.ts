/**
 * Common display formats for the start and end date pickers.
 *
 * Values are Luxon format tokens (the adapter `RRuleBuilder` is typed for). Pass one to the
 * `dateFormat` prop of `RRuleBuilder`, or pass any other adapter-compatible format string
 * directly: `dateFormat` is typed as a plain `string`, so this object is a convenience, not a
 * restriction.
 *
 * This is a `const` object rather than a TypeScript `enum` on purpose. Its members are ordinary
 * string literal types, so they stay interchangeable with a consumer's own enum or constant that
 * holds the same string. A string `enum` would be nominally typed and would reject structurally
 * equal values.
 */
export const DateFormat = {
  /** Month first, e.g. 09/17/2024 */
  MM_DD_YYYY: "MM/dd/yyyy",
  /** Day first, e.g. 17/09/2024 */
  DD_MM_YYYY: "dd/MM/yyyy",
  /** Year first, e.g. 2024/09/17 */
  YYYY_MM_DD: "yyyy/MM/dd",
} as const;

// Same-name const + type is the intended enum-like pattern (see `Months` in Repeat.types.ts)
// eslint-disable-next-line no-redeclare, @typescript-eslint/no-redeclare
export type DateFormat = (typeof DateFormat)[keyof typeof DateFormat];
