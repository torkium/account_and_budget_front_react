import React, { useCallback, useState } from "react";
import { useBankAccountContext } from "../../../context/BankAccountContext";
import ScheduledTransactionPushModal from "../Modals/ScheduledTransactionPushModal";
import ScheduledTransactionDeleteConfirmationModal from "../Modals/ScheduledTransactionDeleteConfirmationModal";
import { ScheduledTransactionInterface } from "../../../interfaces/ScheduledTransaction";
import { useScheduledTransactionManager } from "../../../hooks/useScheduledTransactionManager";
import ScheduledTransactionsCronTable from "./ScheduledTransactionsCronTable";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ScheduledTransactionsCronList: React.FC = () => {
  const { bankAccount } = useBankAccountContext();
  const { scheduledTransactionsCron, reloadScheduledTransactions } =
    useBankAccountContext();

  // State hooks
  const [
    isScheduledTransactionPushModalOpen,
    setIsScheduledTransactionPushModalOpen,
  ] = useState(false);
  const [
    isScheduledTransactionDeleteConfirmationModalOpen,
    setIsScheduledTransactionDeleteConfirmationModalOpen,
  ] = useState(false);
  const [selectedScheduledTransaction, setSelectedScheduledTransaction] =
    useState<ScheduledTransactionInterface | null>(null);

  const { submitScheduledTransaction, deleteScheduledTransaction } =
    useScheduledTransactionManager({
      bankAccountId: bankAccount?.id ?? null,
      reloadScheduledTransactions,
    });

  // Callbacks for user actions
  const openScheduledTransactionPushModal = useCallback(
    (scheduledTransaction?: ScheduledTransactionInterface) => {
      setSelectedScheduledTransaction(scheduledTransaction || null);
      setIsScheduledTransactionPushModalOpen(true);
    },
    []
  );

  const closeScheduledTransactionPushModal = useCallback(() => {
    setIsScheduledTransactionPushModalOpen(false);
    setSelectedScheduledTransaction(null);
  }, []);

  const openDeleteConfirmationModal = useCallback(
    (scheduledTransaction: ScheduledTransactionInterface) => {
      setSelectedScheduledTransaction(scheduledTransaction);
      setIsScheduledTransactionDeleteConfirmationModalOpen(true);
    },
    []
  );

  const closeDeleteConfirmationModal = useCallback(() => {
    setIsScheduledTransactionDeleteConfirmationModalOpen(false);
    setSelectedScheduledTransaction(null);
  }, []);

  //Handle Forms
  const handleSubmit = useCallback(
    (formData: any) => {
      if (selectedScheduledTransaction) {
        submitScheduledTransaction(selectedScheduledTransaction, formData);
      } else {
        submitScheduledTransaction(null, formData);
      }
      closeScheduledTransactionPushModal();
    },
    [submitScheduledTransaction, selectedScheduledTransaction]
  );

  const handleDelete = useCallback(() => {
    if (selectedScheduledTransaction) {
      deleteScheduledTransaction(selectedScheduledTransaction);
    }
    setIsScheduledTransactionDeleteConfirmationModalOpen(false);
  }, [deleteScheduledTransaction, selectedScheduledTransaction]);

  return (
    <>
      <button onClick={() => openScheduledTransactionPushModal()}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
      <ScheduledTransactionsCronTable
        scheduledTransactions={scheduledTransactionsCron}
        onEdit={openScheduledTransactionPushModal}
        onDelete={openDeleteConfirmationModal}
      />
      <ScheduledTransactionPushModal
        isOpen={isScheduledTransactionPushModalOpen}
        onClose={closeScheduledTransactionPushModal}
        onSubmit={handleSubmit}
        scheduledTransaction={selectedScheduledTransaction}
      />
      <ScheduledTransactionDeleteConfirmationModal
        isOpen={isScheduledTransactionDeleteConfirmationModalOpen}
        onClose={closeDeleteConfirmationModal}
        onDelete={handleDelete}
        scheduledTransaction={selectedScheduledTransaction}
      />
    </>
  );
};

export default ScheduledTransactionsCronList;
