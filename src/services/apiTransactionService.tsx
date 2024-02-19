import { request } from "./apiService"

export interface FinancialCategoryInterface {
  id: number
  label: string
  parent: FinancialCategoryInterface | null
}

export interface TransactionInterface {
  id: number | null
  reference: string | null
  label: string
  amount: number
  date: string
  financialCategory: FinancialCategoryInterface
}

interface CreateTransactionData {
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

const createTransaction = async (
  accountId: number,
  transactionData: CreateTransactionData
): Promise<TransactionInterface> => {
  try {
    const response = await request({
      url: `/bank-accounts/${accountId}/transactions/`,
      method: "POST",
      data: transactionData,
    })
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const apiTransactionService = {
  getTransactions,
  createTransaction,
}
