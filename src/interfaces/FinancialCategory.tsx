export interface FinancialCategoryInterface {
    id: number
    label: string
    type: string
    parentId: number | null
    children: FinancialCategoryInterface[]
}