import { formatDateToLocalISO } from "../utils/generic/dateUtils";

export const useFormattedDate = (date: Date) => {
  return formatDateToLocalISO(date);
};
