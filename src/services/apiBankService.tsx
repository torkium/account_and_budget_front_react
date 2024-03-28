import { request } from "./generic/apiService"
import { BankInterface } from "../interfaces/Bank";

const getBanks = async (): Promise<BankInterface[]> => {
  try {
    const response = await request({
      url: "/banks/",
      method: "GET",
    })
    return response.data;
  } catch (error) {
    throw error
  }
}

export const apiBankService = {
  getBanks,
}
