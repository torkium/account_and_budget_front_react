import React, { useCallback, useState } from "react";
import { useBankAccountContext } from "../../context/BankAccountContext"; // Assurez-vous que le chemin d'accès est correct
import TransactionsTable from "./TransactionsTable";
import TransactionPushModal from "../../pages/BankAccount/Modals/TransactionPushModal";
import TransactionDeleteConfirmationModal from "../../pages/BankAccount/Modals/TransactionDeleteConfirmationModal";
import { TransactionInterface } from "../../interfaces/Transaction";
import { useTransactionManager } from "../../hooks/useTransactionManager";

const TransactionsList: React.FC = () => {
  const {
    transactions,
    reloadTransactions,
    reloadBudgetsOverview,
    bankAccount,
  } = useBankAccountContext();

  // State hooks
  const [isTransactionPushModalOpen, setIsTransactionPushModalOpen] = useState(false);
  const [isTransactionDeleteConfirmationModalOpen, setIsTransactionDeleteConfirmationModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionInterface | null>(null);
  
  const { submitTransaction, deleteTransaction } = useTransactionManager({
    bankAccountId: bankAccount?.id ?? null,
    reloadTransactions,
    reloadBudgetsOverview
  });

  // Callbacks for user actions
  const openTransactionPushModal = useCallback((transaction?: TransactionInterface) => {
    setSelectedTransaction(transaction || null);
    setIsTransactionPushModalOpen(true);
  }, []);

  const closeTransactionPushModal = useCallback(() => {
    setIsTransactionPushModalOpen(false);
    setSelectedTransaction(null);
  }, []);

  const openDeleteConfirmationModal = useCallback((transaction: TransactionInterface) => {
    setSelectedTransaction(transaction);
    setIsTransactionDeleteConfirmationModalOpen(true);
  }, []);

  const closeDeleteConfirmationModal = useCallback(() => {
    setIsTransactionDeleteConfirmationModalOpen(false);
    setSelectedTransaction(null);
  }, []);

  //Handle Forms
  const handleSubmit = useCallback((formData: any) => {
    if(selectedTransaction) {
      submitTransaction(selectedTransaction, formData);
    } else {
      submitTransaction(null, formData);
    }
    closeTransactionPushModal()
  }, [submitTransaction, selectedTransaction]);
  
  const handleDelete = useCallback(() => {
    if(selectedTransaction) {
      deleteTransaction(selectedTransaction);
    }
  }, [deleteTransaction, selectedTransaction]);

  return (
    <>
      <button onClick={() => openTransactionPushModal()}>Ajouter</button>
      <TransactionsTable
        transactions={transactions}
        onEdit={openTransactionPushModal}
        onDelete={openDeleteConfirmationModal}
      />
      <TransactionPushModal
        isOpen={isTransactionPushModalOpen}
        onClose={closeTransactionPushModal}
        onSubmit={handleSubmit}
        transaction={selectedTransaction}
      />
      <TransactionDeleteConfirmationModal
        isOpen={isTransactionDeleteConfirmationModalOpen}
        onClose={closeDeleteConfirmationModal}
        onDelete={handleDelete}
        transaction={selectedTransaction}
      />
    </>
  );
};

export default TransactionsList;
