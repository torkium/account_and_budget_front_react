import React, { createContext, useContext, ReactNode, useState, useCallback, useEffect } from "react";
import { BankAccountInterface } from "../interfaces/Bank";
import { BudgetInterface } from "../interfaces/Budget";
import { apiBudgetService } from "../services/apiBudgetService";

interface BankAccountContextType {
  bankAccount: BankAccountInterface;
  budgets: BudgetInterface[];
  reloadBudgets: () => void;
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
  
  const reloadBudgets = useCallback(() => {
    setReloadBudgetsFlag((prevFlag) => !prevFlag);
  }, []);

  
  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const fetchedBudgets = await apiBudgetService.get(
          bankAccount.id,
        );
        setBudgets(fetchedBudgets);
      } catch (error) {
        console.error("Failed to load budgets:", error);
      }
    };

    fetchBudgets();
  }, [bankAccount, reloadBudgetsFlag]);


  return (
    <BankAccountContext.Provider
      value={{
        bankAccount,
        budgets,
        reloadBudgets,
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
