import { BankAccountInterface, BankInterface } from "../interfaces/Bank";
import { ApiService } from "./apiService";

interface BankAccountData {
  id?: number
  label: string
  account_number: string
  initial_amount: number
  bank: BankInterface
}
export class ApiBankAccountService extends ApiService<BankAccountInterface, BankAccountData> {
  constructor() {
    super('/bank-accounts');
  }
}
