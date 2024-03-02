import { ApiService } from "./apiService"
import { FinancialCategoryInterface } from "../interfaces/FinancialCategory";

export class ApiFinancialCategoryService extends ApiService<FinancialCategoryInterface, FinancialCategoryInterface> {
  constructor() {
    super(`/financial-categories`);
  }
}