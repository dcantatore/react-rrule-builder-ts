export enum EndType {
  NEVER = "never",
  AFTER = "after",
  ON = "on",

}

export type EndDetails<TDate> =
  | { endingType: EndType.NEVER }
  | { endingType: EndType.AFTER; occurrences: number | null }
  | { endingType: EndType.ON; endDate: TDate | null };
