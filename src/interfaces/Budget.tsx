import { FinancialCategoryInterface } from "./FinancialCategory";

export interface BudgetInterface {
  id: number | null;
  label: string;
  amount: number;
  startDate: string;
  endDate: string;
  financialCategory: FinancialCategoryInterface;
  frequency: string;
}

export interface BudgetOverviewInterface {
  budget: BudgetInterface;
  consumed: number;
  provisionalConsumed: number;
  summary: number;
  provisionalSummary: number;
}
