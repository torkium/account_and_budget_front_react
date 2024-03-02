import { FinancialCategoryInterface } from "../interfaces/FinancialCategory"

export interface FinancialCategoryFlatOption {
  value: string
  label: string
}

export class CategoryService {
  static flattenCategories(categories: FinancialCategoryInterface[], prefix = ""): FinancialCategoryFlatOption[] {
    let options: FinancialCategoryFlatOption[] = []

    categories.forEach(category => {
      options.push({ value: category.id.toString(), label: `${prefix}${category.label}` });
      if (category.children.length) {
        options = options.concat(CategoryService.flattenCategories(category.children, `${prefix}--`));
      }
    })
    return options
  }
}
