export const TIME_FILTERS = [
  "-",
  "thisMonth",
  "last3Months",
  "last6Months",
  "custom",
];
export type TimeFiltersType = (typeof TIME_FILTERS)[number];

export interface IDatesFilter {
  endDate?: Date;
  startDate?: Date;
}
