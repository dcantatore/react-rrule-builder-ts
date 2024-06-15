import { DateTime } from "luxon";

export enum EndType {
  NEVER = "never",
  AFTER = "after",
  ON = "on",

}

export interface EndDetails {
  endDate: DateTime | null;
  endingType: EndType;
  occurrences?: number;
}
