import { FinancialCategoryInterface } from "../interfaces/FinancialCategory"

interface FlatOption {
  value: string
  label: string
}

export class CategoryService {
  static flattenCategories(categories: FinancialCategoryInterface[], prefix = ""): FlatOption[] {
    let options: FlatOption[] = []

    categories.forEach(category => {
      options.push({ value: category.id.toString(), label: `${prefix}${category.label}` });
      if (category.children.length) {
        options = options.concat(CategoryService.flattenCategories(category.children, `${prefix}--`));
      }
    })
    return options
  }
}
