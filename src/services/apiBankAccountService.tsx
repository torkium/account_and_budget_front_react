import {
  BankAccountInterface,
  BankAccountOverviewInterface,
  BankInterface,
} from "../interfaces/Bank";
import { ApiService, request } from "./generic/apiService";
import { formatDateToLocalISO } from "../utils/generic/dateUtils";

interface BankAccountData {
  id?: number;
  label: string;
  account_number: string;
  initial_amount: number;
  bank: BankInterface;
}
export class ApiBankAccountService extends ApiService<
  BankAccountInterface,
  BankAccountData
> {
  constructor() {
    super("/bank-accounts");
  }

  getOverview = async (
    accountId: number,
    startDate: Date,
    endDate: Date
  ): Promise<BankAccountOverviewInterface> => {
    try {
      const response = await request({
        url: `/bank-accounts/${accountId}/overview?start_date=${formatDateToLocalISO(
          startDate
        )}&end_date=${formatDateToLocalISO(endDate)}`,
        method: "GET",
        data: {},
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  initBalance = async (
    accountId: number,
    actualBalance: number
  ): Promise<BankAccountInterface> => {
    try {
      let data = {
        actual_balance: actualBalance
      };
      const response = await request({
        url: `/bank-accounts/${accountId}/init-balance`,
        method: "PUT",
        data: data,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
}
