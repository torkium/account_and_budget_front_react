export interface BankInterface {
    id: number
    label: string
}

export interface BankAccountInterface {
    id: number
    label: string
    account_number: string
    bank: BankInterface
}