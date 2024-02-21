import { useState, useEffect } from "react";
import { TransactionInterface } from "../interfaces/Transaction";
import { apiTransactionService } from "../services/apiTransactionService";

export const useTransactions = (accountId: number | undefined, startDate: Date, endDate: Date) => {
  const [transactions, setTransactions] = useState<TransactionInterface[]>([]);
  const [reloadFlag, setReloadFlag] = useState(false);

  const reloadTransactions = () => {
    setReloadFlag(prevFlag => !prevFlag);
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!accountId) return;
      try {
        const fetchedTransactions = await apiTransactionService.getTransactions(accountId, startDate.toISOString().split("T")[0], endDate.toISOString().split("T")[0]);
        setTransactions(fetchedTransactions);
      } catch (error) {
        console.error("Failed to load transactions:", error);
      }
    };

    fetchTransactions();
  }, [accountId, startDate, endDate, reloadFlag]);

  return { transactions, reloadTransactions };
};
