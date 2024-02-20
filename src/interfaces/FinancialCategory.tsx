export interface FinancialCategoryInterface {
    id: number
    label: string
    children: FinancialCategoryInterface[]
}