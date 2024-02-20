import { useState, useEffect, useCallback } from "react";
import { TransactionInterface } from "../interfaces/Transaction";
import { apiTransactionService } from "../services/apiTransactionService";

export const useTransactions = (accountId: number | undefined) => {
  const [transactions, setTransactions] = useState<TransactionInterface[]>([]);
  const [reloadFlag, setReloadFlag] = useState(false);

  const reloadTransactions = useCallback(() => {
    setReloadFlag(prevFlag => !prevFlag);
  }, []);

  useEffect(() => {
    const loadTransactions = async () => {
      if (!accountId) return;
      const currentDate = new Date();
      const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString().split("T")[0];
      const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).toISOString().split("T")[0];
      try {
        const fetchedTransactions = await apiTransactionService.getTransactions(accountId, startDate, endDate);
        setTransactions(fetchedTransactions);
      } catch (error) {
        console.error("Loading transactions failed", error);
      }
    };

    loadTransactions();
  }, [accountId, reloadFlag]);

  return { transactions, reloadTransactions };
};
