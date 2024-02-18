import { request } from "./apiService"

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

const get = async (): Promise<BankAccountInterface[]> => {
  try {
    const response = await request({
      url: "/bank-accounts",
      method: "GET",
      data: {},
    })
    return response.data;
  } catch (error) {
    throw error
  }
}

export const apiBankAccountService = {
  get,
}
