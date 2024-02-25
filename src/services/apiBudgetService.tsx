import { request } from "./apiService"
import { BudgetInterface, BudgetOverviewInterface } from "../interfaces/Budget";
import { formatDateToLocalISO } from "../utils/dateUtils";

interface BudgetData {
  id?: number
  label: string
  amount: number
  startDate: string
  endDate: string
  financialCategory: number
}

const getOverview = async (
  accountId: number,
  startDate: Date,
  endDate: Date
): Promise<BudgetOverviewInterface[]> => {
  try {
    const response = await request({
      url: `/bank-accounts/${accountId}/budgets/overview?start_date=${formatDateToLocalISO(startDate)}&end_date=${formatDateToLocalISO(endDate)}`,
      method: "GET",
      data: {},
    })
    return response.data;
  } catch (error) {
    throw error
  }
}

const get = async (
  accountId: number,
): Promise<BudgetInterface[]> => {
  try {
    const response = await request({
      url: `/bank-accounts/${accountId}/budgets/`,
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
  budgetData: BudgetData
): Promise<BudgetInterface> => {
  try {
    const response = await request({
      url: `/bank-accounts/${accountId}/budgets/` + (budgetData.id ?? ''),
      method: budgetData.id ? "PUT" : "POST",
      data: budgetData,
    })
    return response.data;
  } catch (error) {
    throw error;
  }
}


const remove = async (
  accountId: number,
  budget: BudgetInterface
): Promise<BudgetInterface> => {
  try {
    const response = await request({
      url: `/bank-accounts/${accountId}/budgets/` + (budget.id),
      method: "DELETE",
    })
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const apiBudgetService = {
  getOverview,
  get,
  push,
  remove
}
