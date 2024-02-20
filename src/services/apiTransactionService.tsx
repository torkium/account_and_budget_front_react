import { request } from "./apiService"
import { TransactionInterface } from "../interfaces/Transaction"

interface TransactionData {
  id?: number
  reference: string
  label: string
  amount: number
  date: string
  financialCategory: number
}


const getTransactions = async (
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

const pushTransaction = async (
  accountId: number,
  transactionData: TransactionData
): Promise<TransactionInterface> => {
  try {
    const response = await request({
      url: `/bank-accounts/${accountId}/transactions/` + (transactionData.id ?? ''),
      method: transactionData.id ? "PUT" : "POST",
      data: transactionData,
    })
    return response.data;
  } catch (error) {
    throw error;
  }
}

const deleteTransaction = async (
  accountId: number,
  transaction: TransactionInterface
): Promise<TransactionInterface> => {
  try {
    const response = await request({
      url: `/bank-accounts/${accountId}/transactions/` + (transaction.id),
      method: "DELETE",
    })
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const apiTransactionService = {
  getTransactions,
  pushTransaction,
  deleteTransaction,
}
