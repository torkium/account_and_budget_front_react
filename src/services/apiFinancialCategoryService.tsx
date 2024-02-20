import { request } from "./apiService"
import { FinancialCategoryInterface } from "../interfaces/FinancialCategory";

const getFinancialCategories = async (): Promise<FinancialCategoryInterface[]> => {
  try {
    const response = await request({
      url: "/financial-categories",
      method: "GET",
    })
    return response.data;
  } catch (error) {
    throw error
  }
}

export const apiFinancialCategoryService = {
  getFinancialCategories,
}
