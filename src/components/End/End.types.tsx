export enum EndType {
  NEVER = "never",
  AFTER = "after",
  ON = "on",

}

export interface EndDetails<TDate> {
  endDate: TDate | null;
  endingType: EndType;
  occurrences: number | null;
}
