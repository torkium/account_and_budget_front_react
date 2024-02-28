import React, { createContext, useContext, ReactNode, useState, useCallback, useEffect } from "react";
import { BankAccountInterface } from "../interfaces/Bank";
import { BudgetInterface } from "../interfaces/Budget";
import { ApiBudgetService } from "../services/apiBudgetService";
import { ScheduledTransactionInterface } from "../interfaces/ScheduledTransaction";
import { ApiScheduledTransactionService } from "../services/apiScheduledTransactionService";

interface BankAccountContextType {
  bankAccount: BankAccountInterface;
  budgets: BudgetInterface[];
  scheduledTransactions: ScheduledTransactionInterface[];
  reloadBudgets: () => void;
  reloadScheduledTransactions: () => void;
}

const BankAccountContext = createContext<BankAccountContextType | undefined>(
  undefined
);

interface BankAccountProviderProps {
  children: ReactNode;
  bankAccount: BankAccountInterface;
}

export const BankAccountProvider: React.FC<BankAccountProviderProps> = ({
  children,
  bankAccount,
}) => {
  const [budgets, setBudgets] = useState<BudgetInterface[]>([]);
  const [reloadBudgetsFlag, setReloadBudgetsFlag] = useState(false);
  const [scheduledTransactions, setScheduledTransactions] = useState<ScheduledTransactionInterface[]>([]);
  const [reloadScheduledTransactionsFlag, setReloadScheduledTransactionsFlag] = useState(false);
  const apiBudgetService = new ApiBudgetService(bankAccount.id);
  const apiScheduledTransactionService = new ApiScheduledTransactionService(bankAccount.id);
  
  const reloadBudgets = useCallback(() => {
    setReloadBudgetsFlag((prevFlag) => !prevFlag);
  }, []);

  const reloadScheduledTransactions = useCallback(() => {
    setReloadScheduledTransactionsFlag((prevFlag) => !prevFlag);
  }, []);

  
  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const fetchedBudgets = await apiBudgetService.get();
        setBudgets(fetchedBudgets);
      } catch (error) {
        console.error("Failed to load budgets:", error);
      }
    };

    fetchBudgets();
  }, [bankAccount, reloadBudgetsFlag]);

  
  useEffect(() => {
    const fetchScheduledTransactions = async () => {
      try {
        const fetchedScheduledTransactions = await apiScheduledTransactionService.get();
        setScheduledTransactions(fetchedScheduledTransactions);
      } catch (error) {
        console.error("Failed to load scheduled transactions:", error);
      }
    };

    fetchScheduledTransactions();
  }, [bankAccount, reloadScheduledTransactionsFlag]);


  return (
    <BankAccountContext.Provider
      value={{
        bankAccount,
        budgets,
        scheduledTransactions,
        reloadBudgets,
        reloadScheduledTransactions,
      }}
    >
      {children}
    </BankAccountContext.Provider>
  );
};

export const useBankAccountContext = () => {
  const context = useContext(BankAccountContext);
  if (!context) {
    throw new Error(
      "useBankAccountContext must be used within a BankAccountProvider"
    );
  }
  return context;
};
