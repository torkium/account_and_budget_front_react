// hooks/useTransactionManager.ts
import { useState } from "react";
import { TransactionInterface } from "../interfaces/Transaction";
import { apiTransactionService } from "../services/apiTransactionService";
import { useAlert } from "../context/AlertContext";

interface UseTransactionManagerProps {
  bankAccountId: number | null;
  reloadTransactions: () => void;
}

export const useTransactionManager = ({ bankAccountId, reloadTransactions }: UseTransactionManagerProps) => {
  const { showAlert } = useAlert();
  const [isTransactionPushModalOpen, setIsTransactionPushModalOpen] = useState(false);
  const [isTransactionDeleteConfirmationModalOpen, setIsTransactionDeleteConfirmationModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionInterface | null>(null);

  const openTransactionPushModal = (transaction?: TransactionInterface) => {
    setSelectedTransaction(transaction || null);
    setIsTransactionPushModalOpen(true);
  };

  const closeTransactionPushModal = () => {
    setIsTransactionPushModalOpen(false);
    setSelectedTransaction(null);
  };

  const openDeleteConfirmationModal = (transaction: TransactionInterface) => {
    setSelectedTransaction(transaction || null);
    setIsTransactionDeleteConfirmationModalOpen(true);
  };

  const closeDeleteConfirmationModal = () => {
    setIsTransactionDeleteConfirmationModalOpen(false);
    setSelectedTransaction(null);
  };

  const submitTransaction = async (formData: any) => {
    if(!bankAccountId){
        showAlert("An error occurred. Please try again.", "error");
        return;
    }
    try {
      const newTransactionData = {
        id: selectedTransaction?.id ?? undefined,
        ...formData,
        amount: parseFloat(formData.amount),
        financialCategory: parseInt(formData.financialCategoryId),
      };

      await apiTransactionService.pushTransaction(bankAccountId, newTransactionData);
      reloadTransactions();
      closeTransactionPushModal();
      showAlert("Transaction successful.", "success");
    } catch (error) {
      showAlert("An error occurred. Please try again.", "error");
    }
  };

  const deleteTransaction = async () => {
    if(!bankAccountId){
        showAlert("An error occurred. Please try again.", "error");
        return;
    }
    if (!selectedTransaction) return;

    try {
      await apiTransactionService.deleteTransaction(bankAccountId, selectedTransaction);
      reloadTransactions();
      closeDeleteConfirmationModal();
      showAlert("Transaction deleted successfully.", "success");
    } catch (error) {
      showAlert("An error occurred. Please try again.", "error");
    }
  };

  return {
    isTransactionPushModalOpen,
    isTransactionDeleteConfirmationModalOpen,
    selectedTransaction,
    openTransactionPushModal,
    closeTransactionPushModal,
    openDeleteConfirmationModal,
    closeDeleteConfirmationModal,
    submitTransaction,
    deleteTransaction,
  };
};
