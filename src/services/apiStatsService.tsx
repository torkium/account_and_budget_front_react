import { request } from "./apiService";


export interface AnnualIncomesForMonth{
  amount: number;
  month: string;
}
export interface AnnualExpensesForMonth{
  amount: number;
  month: string;
}

export class ApiStatsService {

  getAnnualIncomesByMonth = async (
    startDate: string,
    endDate: string
  ): Promise<AnnualIncomesForMonth[]> => {
    try {
      const response = await request({
        url: `/stats/annual-incomes-by-month/${startDate}/${endDate}`,
        method: "GET",
        data: {},
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getAnnualExpensesByMonth = async (
    startDate: string,
    endDate: string
  ): Promise<AnnualExpensesForMonth[]> => {
    try {
      const response = await request({
        url: `/stats/annual-expenses-by-month/${startDate}/${endDate}`,
        method: "GET",
        data: {},
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
}
