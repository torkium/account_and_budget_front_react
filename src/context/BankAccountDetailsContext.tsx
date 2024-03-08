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
import { ApiBudgetService } from "../services/apiBudgetService";
import { ApiTransactionService } from "../services/apiTransactionService";
import { endOfMonth, startOfMonth } from "date-fns";
import { formatDateToLocalISO } from "../utils/dateUtils";
import { useBankAccountContext } from "./BankAccountContext";
import { BankAccountOverviewInterface } from "../interfaces/Bank";
import { ApiBankAccountService } from "../services/apiBankAccountService";

interface BankAccountDetailsContextType {
  startDate: Date;
  endDate: Date;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  budgetsOverview: BudgetOverviewInterface[];
  bankAccountOverview?: BankAccountOverviewInterface;
  transactions: TransactionInterface[];
  reload: () => void;
  reloadBudgetsOverview: () => void;
  reloadBankAccountOverview: () => void;
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
  const [bankAccountOverview, setBankAccountOverview] = useState<
    BankAccountOverviewInterface
  >();
  const [transactions, setTransactions] = useState<TransactionInterface[]>([]);
  const [reloadFlag, setReloadFlag] = useState(false);
  const [reloadBudgetsOverviewFlag, setReloadBudgetsOverviewFlag] = useState(false);
  const [reloadBankAccountOverviewFlag, setReloadBankAccountOverviewFlag] = useState(false);
  const [reloadTransactionsFlag, setReloadTransactionsFlag] = useState(false);
  const apiBudgetService = new ApiBudgetService(bankAccount.id);
  const apiBankAccountService = new ApiBankAccountService();
  const apiTransactionService = new ApiTransactionService(bankAccount.id);

  const reload = useCallback(() => {
    setReloadFlag((prevFlag) => !prevFlag);
  }, []);

  const reloadBudgetsOverview = useCallback(() => {
    setReloadBudgetsOverviewFlag((prevFlag) => !prevFlag);
  }, []);

  const reloadBankAccountOverview = useCallback(() => {
    setReloadBankAccountOverviewFlag((prevFlag) => !prevFlag);
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
  }, [bankAccount, startDate, endDate, reloadFlag, reloadBudgetsOverviewFlag, transactions]);

  useEffect(() => {
    const fetchBankAccountOverview = async () => {
      try {
        const fetchedBankAccountOverview = await apiBankAccountService.getOverview(
          bankAccount.id,
          startDate,
          endDate
        );
        setBankAccountOverview(fetchedBankAccountOverview);
      } catch (error) {
        console.error("Failed to load bank account overview:", error);
      }
    };

    fetchBankAccountOverview();
  }, [bankAccount, startDate, endDate, reloadFlag, reloadBankAccountOverviewFlag, transactions]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const fetchedTransactions = await apiTransactionService.getBetweenDates(
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
        bankAccountOverview,
        transactions,
        reload,
        reloadBudgetsOverview,
        reloadBankAccountOverview,
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
