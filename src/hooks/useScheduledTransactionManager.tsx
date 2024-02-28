import { ScheduledTransactionInterface } from "../interfaces/ScheduledTransaction";
import { ApiScheduledTransactionService } from "../services/apiScheduledTransactionService";
import { useAlert } from "../context/AlertContext";

interface UseScheduledTransactionManagerProps {
  bankAccountId: number | null;
  reloadScheduledTransactions: () => void;
}

export const useScheduledTransactionManager = ({ bankAccountId, reloadScheduledTransactions }: UseScheduledTransactionManagerProps) => {
  const { showAlert } = useAlert();

  const submitScheduledTransaction = async (scheduledTransaction: ScheduledTransactionInterface | null, formData: any) => {
    if (!bankAccountId) {
      showAlert("Une erreur est survenue.", "error");
      return;
    }
    try {
      const apiScheduledTransactionService = new ApiScheduledTransactionService(bankAccountId);
      const newScheduledTransactionData = {
        id: scheduledTransaction?.id ?? undefined,
        ...formData,
        amount: parseFloat(formData.amount),
        financialCategory: parseInt(formData.financialCategoryId),
      };

      await apiScheduledTransactionService.push(newScheduledTransactionData, scheduledTransaction?.id ?? undefined);
      reloadScheduledTransactions();
      scheduledTransaction?.id ? showAlert("Modifications enregistrées.", "success") : showAlert("Transaction prévisionnelle créée.", "success");
    } catch (error) {
      showAlert("Une erreur est survenue.", "error");
    }
  };

  const deleteScheduledTransaction = async (scheduledTransaction: ScheduledTransactionInterface) => {
    if (!bankAccountId || !scheduledTransaction?.id) {
      showAlert("Une erreur est survenue.", "error");
      return;
    }

    try {
      const apiScheduledTransactionService = new ApiScheduledTransactionService(bankAccountId);
      await apiScheduledTransactionService.remove(scheduledTransaction.id);
      reloadScheduledTransactions();
      showAlert("Suppression confirmée.", "success");
    } catch (error) {
      showAlert("Une erreur est survenue.", "error");
    }
  };

  return {
    submitScheduledTransaction,
    deleteScheduledTransaction,
  };
};
