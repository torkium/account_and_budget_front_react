import { request } from "./apiService"
import { BankAccountInterface } from "../interfaces/Bank";

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

export const apiBankAccountService = {
  get,
  show,
}
