import { request } from "./apiService"
import { ScheduledTransactionInterface } from "../interfaces/ScheduledTransaction"

interface ScheduledTransactionData {
  id?: number
  label: string
  amount: number
  startDate: string
  endDate?: string | null
  financialCategory: number
}


const get = async (
  accountId: number,
): Promise<ScheduledTransactionInterface[]> => {
  try {
    const response = await request({
      url: `/bank-accounts/${accountId}/scheduled-transactions/`,
      method: "GET",
      data: {},
    })
    return response.data;
  } catch (error) {
    throw error
  }
}

const push = async (
  accountId: number,
  scheduledTransactionData: ScheduledTransactionData
): Promise<ScheduledTransactionInterface> => {
  try {
    if(scheduledTransactionData.endDate === ""){
      scheduledTransactionData.endDate = null
    }
    const response = await request({
      url: `/bank-accounts/${accountId}/scheduled-transactions/` + (scheduledTransactionData.id ?? ''),
      method: scheduledTransactionData.id ? "PUT" : "POST",
      data: scheduledTransactionData,
    })
    return response.data;
  } catch (error) {
    throw error;
  }
}

const remove = async (
  accountId: number,
  scheduledTransaction: ScheduledTransactionInterface
): Promise<ScheduledTransactionInterface> => {
  try {
    const response = await request({
      url: `/bank-accounts/${accountId}/scheduled-transactions/` + (scheduledTransaction.id),
      method: "DELETE",
    })
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const apiScheduledTransactionService = {
  get,
  push,
  remove,
}
