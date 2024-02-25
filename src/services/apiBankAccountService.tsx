import { request } from "./apiService"
import { BankAccountInterface, BankInterface } from "../interfaces/Bank";

interface BankAccountData {
  id?: number
  label: string
  account_number: string
  bank: BankInterface
}

const get = async (): Promise<BankAccountInterface[]> => {
  try {
    const response = await request({
      url: "/bank-accounts/",
      method: "GET",
      data: {},
    })
    return response.data;
  } catch (error) {
    throw error
  }
}

const show = async (id: number): Promise<BankAccountInterface> => {
  try {
    const response = await request({
      url: "/bank-accounts/" + id,
      method: "GET",
      data: {},
    })
    return response.data;
  } catch (error) {
    throw error
  }
}

const push = async (
  bankAccountData: BankAccountData
): Promise<BankAccountInterface> => {
  try {
    const response = await request({
      url: `/bank-accounts/` + (bankAccountData.id ?? ''),
      method: bankAccountData.id ? "PUT" : "POST",
      data: bankAccountData,
    })
    return response.data;
  } catch (error) {
    throw error;
  }
}

const remove = async (
  bankAccount: BankAccountInterface
): Promise<BankAccountInterface> => {
  try {
    const response = await request({
      url: `/bank-accounts/` + (bankAccount.id),
      method: "DELETE",
    })
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const apiBankAccountService = {
  get,
  show,
  push,
  remove,
}
