import { TransactionInterface } from "../interfaces/Transaction";
import { apiTransactionService } from "../services/apiTransactionService";
import { useAlert } from "../context/AlertContext";

interface UseTransactionManagerProps {
  bankAccountId: number | null;
  reloadTransactions: () => void;
  reloadBudgetsOverview: () => void;
}

export const useTransactionManager = ({ bankAccountId, reloadTransactions, reloadBudgetsOverview }: UseTransactionManagerProps) => {
  const { showAlert } = useAlert();

  const submitTransaction = async (transaction: TransactionInterface | null, formData: any) => {
    if (!bankAccountId) {
      showAlert("An error occurred. Please try again.", "error");
      return;
    }
    try {
      const newTransactionData = {
        id: transaction?.id ?? undefined,
        ...formData,
        amount: parseFloat(formData.amount),
        financialCategory: parseInt(formData.financialCategoryId),
      };

      await apiTransactionService.pushTransaction(bankAccountId, newTransactionData);
      reloadTransactions();
      reloadBudgetsOverview();
      showAlert("Transaction successful.", "success");
    } catch (error) {
      showAlert("An error occurred. Please try again.", "error");
    }
  };

  const deleteTransaction = async (transaction: TransactionInterface) => {
    if (!bankAccountId || !transaction) {
      showAlert("An error occurred. Please try again.", "error");
      return;
    }

    try {
      await apiTransactionService.deleteTransaction(bankAccountId, transaction);
      reloadTransactions();
      reloadBudgetsOverview();
      showAlert("Transaction deleted successfully.", "success");
    } catch (error) {
      showAlert("An error occurred. Please try again.", "error");
    }
  };

  return {
    submitTransaction,
    deleteTransaction,
  };
};
