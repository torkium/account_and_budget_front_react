import { FinancialCategoryInterface } from "./FinancialCategory"

export interface TransactionInterface {
    id: number | null
    reference: string | null
    label: string
    amount: number
    date: string
    financialCategory: FinancialCategoryInterface
  }