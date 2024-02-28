import { ApiService, request } from "./apiService"
import { TransactionInterface } from "../interfaces/Transaction";
import { ScheduledTransactionInterface } from "../interfaces/ScheduledTransaction";

interface TransactionData {
  id?: number
  reference: string
  label: string
  amount: number
  date: string
  financialCategory: number
  scheduledTransaction?: ScheduledTransactionInterface
}

export class ApiTransactionService extends ApiService<TransactionInterface, TransactionData> {
  constructor(accountId: number) {
    super(`/bank-accounts/${accountId}/transactions`);
  }

  getBetweenDates = async (
    accountId: number,
    startDate: string,
    endDate: string
  ): Promise<TransactionInterface[]> => {
    try {
      const response = await request({
        url: `/bank-accounts/${accountId}/transactions/?start_date=${startDate}&end_date=${endDate}`,
        method: "GET",
        data: {},
      })
      return response.data;
    } catch (error) {
      throw error
    }
  }
}