import { FinancialCategoryInterface } from "./FinancialCategory"
import { ScheduledTransactionInterface } from "./ScheduledTransaction"

export interface TransactionInterface {
    id: number | null
    reference?: string
    label: string
    amount: number
    date: string
    financialCategory?: FinancialCategoryInterface
    scheduledTransaction?: ScheduledTransactionInterface
  }