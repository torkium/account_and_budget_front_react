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
      showAlert("Une erreur est survenue.", "error");
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
      transaction?.id ? showAlert("Modifications enregistrées.", "success") : showAlert("Transaction créée.", "success");
    } catch (error) {
      showAlert("Une erreur est survenue.", "error");
    }
  };

  const deleteTransaction = async (transaction: TransactionInterface) => {
    if (!bankAccountId || !transaction) {
      showAlert("Une erreur est survenue.", "error");
      return;
    }

    try {
      await apiTransactionService.deleteTransaction(bankAccountId, transaction);
      reloadTransactions();
      reloadBudgetsOverview();
      showAlert("Suppression confirmée.", "success");
    } catch (error) {
      showAlert("Une erreur est survenue.", "error");
    }
  };

  return {
    submitTransaction,
    deleteTransaction,
  };
};
