import { TransactionInterface } from "../interfaces/Transaction";
import { ApiTransactionService } from "../services/apiTransactionService";
import { useAlert } from "../context/generic/AlertContext";

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
      const apiTransactionService = new ApiTransactionService(bankAccountId);
      const newTransactionData = {
        id: transaction?.id ?? undefined,
        ...formData,
        amount: parseFloat(formData.amount),
        financialCategory: parseInt(formData.financialCategoryId),
        scheduledTransactionId: transaction?.scheduledTransaction?.id ?? undefined
      };

      await apiTransactionService.push(newTransactionData, transaction?.id ?? undefined);
      reloadTransactions();
      reloadBudgetsOverview();
      transaction?.id ? showAlert("Modifications enregistrées.", "success") : showAlert("Transaction créée.", "success");
    } catch (error) {
      showAlert("Une erreur est survenue.", "error");
    }
  };

  const deleteTransaction = async (transaction: TransactionInterface) => {
    if (!bankAccountId || !transaction?.id) {
      showAlert("Une erreur est survenue.", "error");
      return;
    }
    if(!transaction?.id && transaction?.scheduledTransaction?.id){
      return;
    }
    try {
      const apiTransactionService = new ApiTransactionService(bankAccountId);
      await apiTransactionService.remove(transaction.id);
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
