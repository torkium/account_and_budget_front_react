import { ApiService, request } from "./apiService";
import { TransactionInterface } from "../interfaces/Transaction";
import { ScheduledTransactionInterface } from "../interfaces/ScheduledTransaction";

interface TransactionData {
  id?: number;
  reference?: string;
  label: string;
  amount: number;
  date: string;
  financialCategory?: number;
  scheduledTransaction?: ScheduledTransactionInterface;
}

export interface DataItem {
  id: string;
  [key: string]: any;
}

export interface ImportRequestHeadersResponse {
  headers: string[];
}
export interface ImportRequestTransactionsResponse {
  reference: string;
  date: string;
  libelle: string;
  amount: number;
}

export interface HeadersMappingRequestInterface {
  date: string;
  amount: string;
  libelle: string;
}
export class ApiTransactionService extends ApiService<
  TransactionInterface,
  TransactionData
> {
  constructor(bankAccountId: number) {
    super(`/bank-accounts/${bankAccountId}/transactions`);
  }

  getBetweenDates = async (
    bankAccountId: number,
    startDate: string,
    endDate: string
  ): Promise<TransactionInterface[]> => {
    try {
      const response = await request({
        url: `/bank-accounts/${bankAccountId}/transactions/?start_date=${startDate}&end_date=${endDate}`,
        method: "GET",
        data: {},
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  importRequestHeaders = async (
    bankAccountId: number,
    file: File
  ): Promise<string[]> => {
    const url = `/bank-accounts/${bankAccountId}/import/request-headers`;
    const formData = new FormData();
    formData.append("csv_file", file);

    try {
      const response = await request({
        url,
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  importRequestTransactions = async (
    bankAccountId: number,
    file: File,
    headersMapping: HeadersMappingRequestInterface
  ): Promise<TransactionInterface[]> => {
    const url = `/bank-accounts/${bankAccountId}/import/request-transactions`;
    const formData = new FormData();
    formData.append("csv_file", file);
    formData.append("headers_date", headersMapping.date);
    formData.append("headers_libelle", headersMapping.libelle);
    formData.append("headers_amount", headersMapping.amount);
    try {
      const response = await request({
        url,
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  import = async (
    bankAccountId: number,
    transactions: TransactionInterface[]
  ): Promise<any> => {
    const url = `/bank-accounts/${bankAccountId}/import`;
    try {
      const response = await request({
        url,
        method: "POST",
        data: JSON.stringify({ transactions }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
}
