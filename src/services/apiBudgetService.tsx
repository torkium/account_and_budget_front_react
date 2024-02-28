import { ApiService, request } from "./apiService"
import { BudgetInterface, BudgetOverviewInterface } from "../interfaces/Budget";
import { formatDateToLocalISO } from "../utils/dateUtils";

interface BudgetData {
  id?: number
  label: string
  amount: number
  startDate: string
  endDate?: string | null
  financialCategory: number
}

export class ApiBudgetService extends ApiService<BudgetInterface, BudgetData> {
  constructor(accountId: number) {
    super(`/bank-accounts/${accountId}/budgets`);
  }

  getOverview = async (
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
}