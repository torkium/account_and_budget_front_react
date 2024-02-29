import { FinancialCategoryInterface } from "./FinancialCategory";

export interface ScheduledTransactionInterface {
  id: number | null;
  reference: string | null;
  label: string;
  amount: number;
  startDate: string;
  endDate: string;
  frequency: string;
  financialCategory: FinancialCategoryInterface;
}
