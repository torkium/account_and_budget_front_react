// external libraries
import { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { startOfMonth, endOfMonth } from 'date-fns';

// local components
import MainLayout from "../../components/Layout/MainLayout";
import PeriodNavigator from '../../components/Period/PeriodNavigator';
import TransactionsTable from "../../components/Transactions/TransactionsTable";
import TransactionPushModal from "./Modals/TransactionPushModal";
import TransactionDeleteConfirmationModal from "./Modals/TransactionDeleteConfirmationModal";
import { TransactionInterface } from "../../interfaces/Transaction";

// custom hooks
import { useBankAccount } from "../../hooks/useBankAccount";
import { useTransactions } from "../../hooks/useTransactions";
import { useTransactionManager } from "../../hooks/useTransactionManager";

// route parameters
type BankAccountParams = {
  accountId?: string;
};

// Main component
const BankAccount = () => {
  // get date hooks
  const { accountId } = useParams<BankAccountParams>();
  const bankAccount = useBankAccount(accountId);

  // state hooks
  const [startDate, setStartDate] = useState(() => startOfMonth(new Date()));
  const [endDate, setEndDate] = useState(() => endOfMonth(new Date()));
  const [isTransactionPushModalOpen, setIsTransactionPushModalOpen] = useState(false);
  const [isTransactionDeleteConfirmationModalOpen, setIsTransactionDeleteConfirmationModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionInterface | null>(null);

  // custom hooks for transactions
  const { transactions, reloadTransactions } = useTransactions(bankAccount?.id, startDate, endDate);
  const { submitTransaction, deleteTransaction } = useTransactionManager({
    bankAccountId: bankAccount?.id ?? null,
    reloadTransactions,
  });

  // callbacks for user actions
  const openTransactionPushModal = useCallback((transaction?: TransactionInterface) => {
    setSelectedTransaction(transaction || null);
    setIsTransactionPushModalOpen(true);
  }, []);

  const closeTransactionPushModal = useCallback(() => {
    setIsTransactionPushModalOpen(false);
    setSelectedTransaction(null);
  }, []);

  const openDeleteConfirmationModal = useCallback((transaction: TransactionInterface) => {
    setSelectedTransaction(transaction || null);
    setIsTransactionDeleteConfirmationModalOpen(true);
  }, []);

  const closeDeleteConfirmationModal = useCallback(() => {
    setIsTransactionDeleteConfirmationModalOpen(false);
    setSelectedTransaction(null);
  }, []);

  const handlePeriodChange = useCallback((startDate: Date, endDate: Date) => {
    setStartDate(startDate);
    setEndDate(endDate);
  }, []);

  // Render
  return (
    <MainLayout>
      {bankAccount ? (
        <>
          <div>
            <h2>Détails du compte bancaire</h2>
            <p>ID du compte : {bankAccount.id}</p>
            <p>Intitulé du compte : {bankAccount.label}</p>
          </div>
          <button onClick={() => openTransactionPushModal()}>Ajouter</button>
          <PeriodNavigator mode="month" onChange={handlePeriodChange} />
          <TransactionsTable
            transactions={transactions}
            onEdit={openTransactionPushModal}
            onDelete={openDeleteConfirmationModal}
          />
        </>
      ) : (
        <div>Chargement des détails du compte...</div>
      )}
      <TransactionPushModal
        isOpen={isTransactionPushModalOpen}
        onClose={closeTransactionPushModal}
        onSubmit={submitTransaction}
        transaction={selectedTransaction}
      />
      <TransactionDeleteConfirmationModal
        isOpen={isTransactionDeleteConfirmationModalOpen}
        onClose={closeDeleteConfirmationModal}
        onDelete={deleteTransaction}
        transaction={selectedTransaction}
      />
    </MainLayout>
  );
};

export default BankAccount;
