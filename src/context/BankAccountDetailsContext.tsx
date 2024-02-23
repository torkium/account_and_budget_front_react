import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { BudgetOverviewInterface } from "../interfaces/Budget";
import { TransactionInterface } from "../interfaces/Transaction";
import { apiBudgetService } from "../services/apiBudgetService";
import { apiTransactionService } from "../services/apiTransactionService";
import { endOfMonth, startOfMonth } from "date-fns";
import { formatDateToLocalISO } from "../utils/dateUtils";
import { useBankAccountContext } from "./BankAccountContext";

interface BankAccountDetailsContextType {
  startDate: Date;
  endDate: Date;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  budgetsOverview: BudgetOverviewInterface[];
  transactions: TransactionInterface[];
  reload: () => void;
  reloadBudgetsOverview: () => void;
  reloadTransactions: () => void;
}

const BankAccountDetailsContext = createContext<BankAccountDetailsContextType | undefined>(
  undefined
);

interface BankAccountDetailsProviderProps {
  children: ReactNode;
}

export const BankAccountDetailsProvider: React.FC<BankAccountDetailsProviderProps> = ({
  children,
}) => {
  const { bankAccount } = useBankAccountContext();
  const [startDate, setStartDate] = useState(startOfMonth(new Date()));
  const [endDate, setEndDate] = useState(endOfMonth(new Date()));
  const [budgetsOverview, setBudgetsOverview] = useState<
    BudgetOverviewInterface[]
  >([]);
  const [transactions, setTransactions] = useState<TransactionInterface[]>([]);
  const [reloadFlag, setReloadFlag] = useState(false);
  const [reloadBudgetsOverviewFlag, setReloadBudgetsOverviewFlag] = useState(false);
  const [reloadTransactionsFlag, setReloadTransactionsFlag] = useState(false);

  const reload = useCallback(() => {
    setReloadFlag((prevFlag) => !prevFlag);
  }, []);

  const reloadBudgetsOverview = useCallback(() => {
    setReloadBudgetsOverviewFlag((prevFlag) => !prevFlag);
  }, []);

  const reloadTransactions = useCallback(() => {
    setReloadTransactionsFlag((prevFlag) => !prevFlag);
  }, []);

  useEffect(() => {
    const fetchBudgetsOverview = async () => {
      try {
        const fetchedBudgetsOverview = await apiBudgetService.getOverview(
          bankAccount.id,
          startDate,
          endDate
        );
        setBudgetsOverview(fetchedBudgetsOverview);
      } catch (error) {
        console.error("Failed to load budgets overview:", error);
      }
    };

    fetchBudgetsOverview();
  }, [bankAccount, startDate, endDate, reloadFlag, reloadBudgetsOverviewFlag]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const fetchedTransactions = await apiTransactionService.getTransactions(
          bankAccount.id,
          formatDateToLocalISO(startDate),
          formatDateToLocalISO(endDate)
        );
        setTransactions(fetchedTransactions);
      } catch (error) {
        console.error("Failed to load transactions:", error);
      }
    };

    fetchTransactions();
  }, [bankAccount, startDate, endDate, reloadFlag, reloadTransactionsFlag]);

  return (
    <BankAccountDetailsContext.Provider
      value={{
        startDate,
        endDate,
        setStartDate,
        setEndDate,
        budgetsOverview,
        transactions,
        reload,
        reloadBudgetsOverview,
        reloadTransactions,
      }}
    >
      {children}
    </BankAccountDetailsContext.Provider>
  );
};

export const useBankAccountDetailsContext = () => {
  const context = useContext(BankAccountDetailsContext);
  if (!context) {
    throw new Error(
      "useBankAccountDetailsContext must be used within a BankAccountProvider"
    );
  }
  return context;
};
