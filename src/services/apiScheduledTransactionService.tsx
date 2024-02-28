import { ApiService } from "./apiService"
import { ScheduledTransactionInterface } from "../interfaces/ScheduledTransaction";

interface ScheduledTransactionData {
  id?: number
  label: string
  amount: number
  startDate: string
  endDate?: string | null
  financialCategory: number
}

export class ApiScheduledTransactionService extends ApiService<ScheduledTransactionInterface, ScheduledTransactionData> {
  constructor(accountId: number) {
    super(`/bank-accounts/${accountId}/scheduled-transactions`);
  }
}