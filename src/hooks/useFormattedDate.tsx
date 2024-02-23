import { formatDateToLocalISO } from "../utils/dateUtils";

export const useFormattedDate = (date: Date) => {
  return formatDateToLocalISO(date);
};
