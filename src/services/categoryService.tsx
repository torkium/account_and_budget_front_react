interface Category {
  id: number
  label: string
  children: Category[]
}

interface FlatOption {
  value: string
  label: string
}

export class CategoryService {
  static flattenCategories(categories: Category[], prefix = ""): FlatOption[] {
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
