import { ApiService, request } from "./generic/apiService"
import { ScheduledTransactionInterface } from "../interfaces/ScheduledTransaction";
import { TransactionInterface } from "../interfaces/Transaction";

interface ScheduledTransactionData {
  id?: number
  label: string
  amount: number
  startDate: string
  endDate?: string | null
  financialCategory: number
}

interface ScheduledTransactionCancelData {
  date: string
}

export class ApiScheduledTransactionService extends ApiService<ScheduledTransactionInterface, ScheduledTransactionData> {
  constructor(accountId: number) {
    super(`/bank-accounts/${accountId}/scheduled-transactions`);
  }

  cancel = async (
    accountId: number,
    transaction: TransactionInterface
  ): Promise<ScheduledTransactionInterface | undefined> => {
    try {
      let data:ScheduledTransactionCancelData = {
        date: transaction.date
      }
      if(transaction.scheduledTransaction?.id){
        const response = await request({
          url: `/bank-accounts/${accountId}/scheduled-transactions/${transaction.scheduledTransaction.id}/cancel`,
          method: "DELETE",
          data: data,
        })
        return response.data;
      }
    } catch (error) {
      throw error
    }
  }
}