import { request } from "./apiService"
import { BudgetOverviewInterface } from "../interfaces/Budget";
import { formatDateToLocalISO } from "../utils/dateUtils";

const getOverview = async (
  accountId: number,
  startDate: Date,
  endDate: Date
): Promise<BudgetOverviewInterface[]> => {
  try {
    const response = await request({
      url: `/bank-accounts/${accountId}/budget/overview?start_date=${formatDateToLocalISO(startDate)}&end_date=${formatDateToLocalISO(endDate)}`,
      method: "GET",
      data: {},
    })
    return response.data;
  } catch (error) {
    throw error
  }
}

export const apiBudgetService = {
  getOverview,
}
