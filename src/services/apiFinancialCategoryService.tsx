import { request } from "./apiService"

export interface FinancialCategoryInterface {
  id: number
  label: string
  children: FinancialCategoryInterface[]
}

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
