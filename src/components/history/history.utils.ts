import { endOfMonth, startOfMonth, subMonths } from "date-fns";
import { IDatesFilter, TimeFiltersType } from "./history.interface";

function getLastXMonths(date: Date, total: number) {
  return {
    startDate: startOfMonth(subMonths(date, total - 1)),
    endDate: endOfMonth(date),
  };
}

export function getDatesFromTimeFilter(filter: TimeFiltersType): IDatesFilter {
  const today = new Date();
  let dateRange: IDatesFilter = {};

  switch (filter) {
    case "month":
      dateRange = {
        startDate: startOfMonth(today),
        endDate: endOfMonth(today),
      };
      break;
    case "last3Months":
      dateRange = getLastXMonths(today, 3);
      break;
    case "last6Months":
      dateRange = getLastXMonths(today, 6);
      break;
  }

  return dateRange;
}
