export interface BankInterface {
    id: number
    label: string
}

export interface BankAccountInterface {
    id: number
    label: string
    account_number: string
    initial_amount: number
    bank: BankInterface
}

export interface BankAccountOverviewInterface {
    credit: number,
    debit: number,
    provisionalCredit: number,
    provisionalDebit: number,
    summary: number,
    provisionalSummary: number,
    startBalance: number,
    endBalance: number,
    provisionalEndBalance: number
}