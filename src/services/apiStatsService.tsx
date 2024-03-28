import { request } from "./generic/apiService";

export interface AnnualBalancesForMonth {
  amount: number;
  month: string;
}
export interface AnnualIncomesForMonth {
  amount: number;
  month: string;
}
export interface AnnualExpensesForMonth {
  amount: number;
  month: string;
}

export interface CategoryValueForMonth {
  category: string | null;
  amount: number;
}

export interface AnnualValuesByCategoryForMonth {
  datas: CategoryValueForMonth[];
  month: string;
}

export class ApiStatsService {

  getAnnualIncomesByMonth = async (
    startDate: string,
    endDate: string,
    bankAccountId?: number
  ): Promise<AnnualIncomesForMonth[]> => {
    try {
      const response = await request({
        url: `/stats/annual-incomes-by-month/${startDate}/${endDate}?bank_account=${bankAccountId}`,
        method: "GET",
        data: {},
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getAnnualBalancesByMonth = async (
    startDate: string,
    endDate: string,
    bankAccountId?: number
  ): Promise<AnnualBalancesForMonth[]> => {
    try {
      const response = await request({
        url: `/stats/annual-bank-balance-evolution/${startDate}/${endDate}?bank_account=${bankAccountId}`,
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
    endDate: string,
    bankAccountId?: number
  ): Promise<AnnualExpensesForMonth[]> => {
    try {
      const response = await request({
        url: `/stats/annual-expenses-by-month/${startDate}/${endDate}?bank_account=${bankAccountId}`,
        method: "GET",
        data: {},
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getAnnualValuesByCategoryByMonth = async (
    startDate: string,
    endDate: string,
    financialCategoryId?: number,
    bankAccountId?: number
  ): Promise<AnnualValuesByCategoryForMonth[]> => {
    try {
      const response = await request({
        url: `/stats/annual-values-by-category-by-month/${startDate}/${endDate}?root_category=${financialCategoryId}&bank_account=${bankAccountId}`,
        method: "GET",
        data: {},
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getAnnualExpensesByCategoryByMonth = async (
    startDate: string,
    endDate: string,
    financialCategoryId?: number,
    bankAccountId?: number
  ): Promise<AnnualValuesByCategoryForMonth[]> => {
    try {
      const response = await request({
        url: `/stats/annual-expenses-by-category-by-month/${startDate}/${endDate}?root_category=${financialCategoryId}&bank_account=${bankAccountId}`,
        method: "GET",
        data: {},
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getAnnualExpensesByCategory = async (
    startDate: string,
    endDate: string,
    financialCategoryId?: number,
    bankAccountId?: number
  ): Promise<CategoryValueForMonth[]> => {
    try {
      const response = await request({
        url: `/stats/annual-expenses-by-category/${startDate}/${endDate}?root_category=${financialCategoryId}&bank_account=${bankAccountId}`,
        method: "GET",
        data: {},
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
}
